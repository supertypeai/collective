import { useState, useContext, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { supabase } from "@/lib/supabaseClient";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { Field, Form, Input } from "@/blocks/Form";
import stackSectionChoices from "@/data/stackSectionChoices.json";
import projectStatus from "@/data/projectStatus.json";
import projectTypes from "@/data/projectTypes.json";
import { EditContext } from "@/contexts/EditContext";
import {
  StableSelect,
  StableCreatableSelect,
  fetchProfiles,
} from "./CreateForm";

const EditCreateForm = ({ setProjectState, projectid }) => {
  const context = useContext(EditContext);
  const [form, setForm] = context.f;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorImage, setErrorImage] = useState();
  const [tagOptions, setTagOptions] = useState([]);
  const [typeOptions, setTypeOptions] = useState([]);
  const [membersChoices, setMembersChoices] = useState([]);
  const [memberOptions, setMemberOptions] = useState([]);
  const [uploadImage, setUploadImage] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      ...form.projects.find((p) => p.id === projectid),
      makers: form.projects
        .find((p) => p.id === projectid)
        .makers.map((maker) => maker.userid),
    },
    mode: "onSubmit",
  });

  const tagsChoices = stackSectionChoices
    .flatMap((stack) => stack.examples)
    .reduce((result, stack) => {
      const duplicate = result.find((obj) => obj.value === stack.value);
      if (!duplicate) {
        result.push(stack);
      }
      return result;
    }, [])
    .sort((a, b) => a.value.localeCompare(b.value));

  const { data: handleData } = useQuery(["handles"], () => fetchProfiles(), {
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  useEffect(() => {
    if (handleData) {
      setMembersChoices(
        handleData
          .map((handle) => {
            return { value: handle.id, label: handle.fullname };
          })
          .sort((a, b) => a.label.localeCompare(b.label))
      );
    }
  }, [setMembersChoices, handleData]);

  const queryClient = useQueryClient();
  const { mutate: updateForm } = useMutation(
    async (formData) => {
      const { makers, imgUpload, ...d } = formData;

      // check if the imgUrl is updated and the previous image was an uploaded image
      if (
        d.imgUrl !== form.projects.find((p) => p.id === projectid).imgUrl &&
        form.projects
          .find((p) => p.id === projectid)
          .imgUrl.startsWith(
            "https://osfehplavmahboowlueu.supabase.co/storage/v1/object/public/images/project_images/"
          )
      ) {
        // if yes, remove the previous image from the storage
        const imgPath = form.projects
          .find((p) => p.id === projectid)
          .imgUrl.replace(
            "https://osfehplavmahboowlueu.supabase.co/storage/v1/object/public/images/",
            ""
          );
        const { error } = await supabase.storage
          .from("images")
          .remove([imgPath]);

        if (error) {
          alert("Sorry, something went wrong. Please try again.");
          setIsSubmitting(false);
          console.log(`Error deleting image:`, error);
        }
      }

      // if a new image is uploaded, add it to storage
      if (uploadImage && imgUpload) {
        const file = imgUpload[0];
        const fileName = file.name;
        const filePath = `project_images/${d.handle}_${fileName}`;
        const { error: imageError } = await supabase.storage
          .from("images")
          .upload(filePath, file, {
            cacheControl: "3600",
            upsert: false,
          });

        if (imageError) {
          setErrorImage(imageError);
          setIsSubmitting(false);
        }
      }

      // check if the makers are modified
      if (
        JSON.stringify(makers) !==
        JSON.stringify(
          form.projects
            .find((p) => p.id === projectid)
            .makers.map((maker) => maker.userid)
        )
      ) {
        const newMakers = makers.filter(
          (maker) =>
            !form.projects
              .find((p) => p.id === projectid)
              .makers.map((maker) => maker.userid)
              .includes(maker)
        );
        const deletedMakers = form.projects
          .find((p) => p.id === projectid)
          .makers.map((maker) => maker.userid)
          .filter((maker) => !makers.includes(maker));

        if (newMakers.length > 0) {
          const { error: memberError } = await supabase
            .from("projectmembers")
            .insert(
              newMakers.map((makerid) => {
                return {
                  userid: makerid,
                  projectid: d.id,
                };
              })
            );

          if (memberError) {
            alert("Sorry, something went wrong. Please try again.");
            setIsSubmitting(false);
            console.log(`Error uploading projectmembers:`, memberError);
          }
        }

        if (deletedMakers.length > 0) {
          deletedMakers.map(async (makerid) => {
            const { error: deleteMemberError } = await supabase
              .from("projectmembers")
              .delete()
              .match({ userid: makerid, projectid: d.id });

            if (deleteMemberError) {
              alert("Sorry, something went wrong. Please try again.");
              setIsSubmitting(false);
              console.log(`Error uploading projectmembers:`, deleteMemberError);
            }
          });
        }
      }

      // update project data
      const { error } = await supabase.from("project").update(d).eq("id", d.id);
      if (
        error?.message ===
        `duplicate key value violates unique constraint "project_handle_key"`
      ) {
        alert(
          "Your preferred collective handle already exists, please use another one."
        );
        setIsSubmitting(false);
      } else if (error) {
        alert("Sorry, something went wrong. Please try again.");
        setIsSubmitting(false);
        console.log(`Error uploading project:`, error);
      } else {
        const otherProjects = form.projects.filter(
          (project) => project.id !== d.id
        );
        const updatedProjects = [
          ...otherProjects,
          {
            ...d,
            makers: makers.map((maker) => {
              return { userid: maker };
            }),
          },
        ];
        setForm({
          ...form,
          projects: updatedProjects,
        });
        setIsSubmitting(false);
        setProjectState(false);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("profileData");
      },
    }
  );

  const saveData = (data) => {
    setIsSubmitting(true);
    if (uploadImage) {
      if (data.imgUpload[0] && data.imgUpload[0].size > 1048576) {
        // Maximum size of 1 MB (in bytes)
        setErrorImage({ message: "Image's size is larger than 1 MB." });
        setIsSubmitting(false);
      } else {
        data.imgUrl = `https://osfehplavmahboowlueu.supabase.co/storage/v1/object/public/images/project_images/${data.handle}_${data.imgUpload[0].name}`;
        const { imgUpload, ...d } = data;
        if (JSON.stringify(d) !== JSON.stringify(form)) {
          updateForm(data);
        } else {
          setIsSubmitting(false);
          setProjectState(false);
        }
      }
    } else {
      if (JSON.stringify(data) !== JSON.stringify(form)) {
        updateForm(data);
      } else {
        setIsSubmitting(false);
        setProjectState(false);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit(saveData)}>
      <fieldset>
        <button
          onClick={() => {
            reset(form);
            setProjectState(false);
          }}
          type="button"
          className="text-left"
        >
          {"< Back"}
        </button>
        <h3 className="text-2xl font-bold">Project&apos;s Detail</h3>
        <p className="text-sm">
          The following details will be used to create your Project Page.
        </p>
      </fieldset>

      <Field
        label="Preferred Collective Handle"
        error={errors?.handle}
        hint="This will be in the link to your project page (https://collective.supertype.ai/r/{your_handle})"
      >
        <Input
          {...register("handle", {
            required:
              "Please provide a handle to be used in the link to your Project Page",
          })}
          id="handle"
          placeholder="collective"
        />
      </Field>

      <Field label="Project name" error={errors?.name}>
        <Input
          {...register("name", {
            required: "Project name is a required field",
          })}
          id="name"
          placeholder="Supertype Collective"
        />
      </Field>

      <div className="flex flex-wrap">
        <div className="w-full md:w-1/2 md:pr-3 md:mb-0">
          <Field label="Project URL" error={errors?.url}>
            <Input
              {...register("url", {
                required: "Project URL is a required field",
                pattern: {
                  value: /^(ftp|http|https):\/\/[^ "]+$/,
                  message: "Invalid URL",
                },
              })}
              id="url"
              placeholder="https://collective.supertype.ai"
            />
          </Field>
        </div>
        <div className="w-full md:w-1/2 md:pl-3">
          <Field label="GitHub URL" error={errors?.github}>
            <Input
              {...register("github", {
                pattern: {
                  value:
                    /^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/,
                  message: "Invalid GitHub URL",
                },
              })}
              id="github"
              placeholder="https://github.com/supertypeai/collective"
            />
          </Field>
        </div>
      </div>

      {uploadImage ? (
        <Field
          label="Upload Image"
          error={errorImage || errors?.imgUpload}
          hint="Overview image of your project that will be shown in your project page (.jpg/.jpeg/.png/.webp), max 1 MB"
        >
          <input
            {...register("imgUpload", {
              required: {
                value: uploadImage,
                message: "Upload image is a required field",
              },
            })}
            type="file"
            accept=".jpg,.jpeg,.webp,.png"
            className="file-input file-input-secondary border-white text-black w-full max-w-xs"
          />
        </Field>
      ) : (
        <Field
          label="Image URL"
          error={errors?.imgUrl}
          hint="Overview image of your project that will be shown in your project page (.jpg/.jpeg/.png/.webp)"
        >
          <Input
            {...register("imgUrl", {
              required: {
                value: !uploadImage,
                message: "Image URL is a required field",
              },
            })}
            id="imgUrl"
            placeholder="https://raw.githubusercontent.com/supertypeai/collective/main/assets/lightdark.webp"
          />
        </Field>
      )}
      <label className="flex">
        <span className="label-text mr-2 ml-auto">
          Don&apos;t have an image URL of your project?
        </span>
        <input
          type="checkbox"
          className="toggle"
          onChange={() => setUploadImage((prev) => !prev)}
          checked={uploadImage}
        />
      </label>

      <Field label="🖊️ Description" error={errors?.description}>
        <textarea
          {...register("description", {
            required: "Description is a required field",
          })}
          id="description"
          name="description"
          rows="4"
          required
          minLength="40"
          maxLength="500"
          placeholder="Supertype Collective is a community of analytics developers, data scientists and engineering leaders building products across the full stack. It a highly curated place, with close collaboration between members looking to join forces on building high-impact analytics products."
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        />
      </Field>

      <Field
        label="🧑‍💼 Makers"
        error={errors?.makers}
        hint="The makers of your project"
      >
        <Controller
          control={control}
          name="makers"
          defaultValue={[]}
          render={({ field: { onChange, value, ref } }) => (
            <StableSelect
              inputRef={ref}
              isMulti
              options={membersChoices}
              classNamePrefix="select"
              className="text-black max-w-3xl"
              value={value.map((v) => {
                const index = membersChoices.findIndex(
                  (option) => option.value === v
                );
                if (index != -1) {
                  return membersChoices[index];
                }
              })}
              onChange={(val) => {
                onChange(val.map((c) => c.value)) && setMemberOptions(val);
              }}
              theme={(theme) => ({
                ...theme,
                borderRadius: 0,
                colors: {
                  ...theme.colors,
                  primary25: "#fcaa8c",
                  primary: "#f46d75",
                },
              })}
              styles={{
                // change background color of tags
                multiValue: (styles, { data }) => {
                  return {
                    ...styles,
                    // same primary-focus color from tailwind config
                    backgroundColor: "#c4002f",
                  };
                },
                // change color of text in tags
                multiValueLabel: (styles, { data }) => ({
                  ...styles,
                  color: "white",
                }),
              }}
            />
          )}
        />
      </Field>

      <Field
        label="📚 Related Qualifications"
        error={errors?.tags}
        hint="A maximum of 10 most revelant qualifications"
      >
        <Controller
          control={control}
          name="tags"
          defaultValue={[]}
          render={({ field: { onChange, value, ref } }) => (
            <StableCreatableSelect
              inputRef={ref}
              isMulti
              options={tagsChoices}
              classNamePrefix="select"
              className="text-black max-w-3xl"
              value={value.map((v) => {
                const index = tagsChoices.findIndex(
                  (option) => option.value === v
                );
                if (index != -1) {
                  return tagsChoices[index];
                } else {
                  return { value: v, label: v };
                }
              })}
              onChange={(val) => {
                val.length <= 10 &&
                  onChange(val.map((c) => c.value)) &&
                  setTagOptions(val);
              }}
              theme={(theme) => ({
                ...theme,
                borderRadius: 0,
                colors: {
                  ...theme.colors,
                  primary25: "#fcaa8c",
                  primary: "#f46d75",
                },
              })}
              styles={{
                // change background color of tags
                multiValue: (styles, { data }) => {
                  return {
                    ...styles,
                    // same primary-focus color from tailwind config
                    backgroundColor: "#c4002f",
                  };
                },
                // change color of text in tags
                multiValueLabel: (styles, { data }) => ({
                  ...styles,
                  color: "white",
                }),
              }}
            />
          )}
        />
      </Field>

      <Field
        label="🔖 Types"
        error={errors?.types}
        hint="Indicates what your project's categories"
      >
        <Controller
          control={control}
          name="types"
          defaultValue={[]}
          render={({ field: { onChange, value, ref } }) => (
            <StableSelect
              inputRef={ref}
              isMulti
              options={projectTypes}
              classNamePrefix="select"
              className="text-black max-w-3xl"
              value={value.map((v) => {
                const index = projectTypes.findIndex(
                  (option) => option.value === v
                );
                if (index != -1) {
                  return projectTypes[index];
                } else {
                  return { value: v, label: v };
                }
              })}
              onChange={(val) => {
                val.length <= 10 &&
                  onChange(val.map((c) => c.value)) &&
                  setTypeOptions(val);
              }}
              theme={(theme) => ({
                ...theme,
                borderRadius: 0,
                colors: {
                  ...theme.colors,
                  primary25: "#fcaa8c",
                  primary: "#f46d75",
                },
              })}
              styles={{
                // change background color of tags
                multiValue: (styles, { data }) => {
                  return {
                    ...styles,
                    // same primary-focus color from tailwind config
                    backgroundColor: "#c4002f",
                  };
                },
                // change color of text in tags
                multiValueLabel: (styles, { data }) => ({
                  ...styles,
                  color: "white",
                }),
              }}
            />
          )}
        />
      </Field>

      <Field
        label="🏴󠁧󠁢󠁮󠁩󠁲󠁿 Status"
        error={errors?.status}
        hint="Indicates your project's current state"
      >
        <Controller
          control={control}
          name="status"
          defaultValue={projectStatus[0].value}
          render={({ field: { onChange, value, ref } }) => (
            <StableSelect
              inputRef={ref}
              options={projectStatus}
              classNamePrefix="select"
              className="text-black max-w-3xl"
              value={projectStatus.find((opt) => opt.value === value)}
              onChange={(val) => onChange(val.value)}
              theme={(theme) => ({
                ...theme,
                borderRadius: 0,
                colors: {
                  ...theme.colors,
                  primary25: "#fcaa8c",
                  primary: "#f46d75",
                },
              })}
              styles={{
                // change text color of selected option
                singleValue: (provided, state) => ({
                  ...provided,
                  color: "#ad0705",
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                  textTransform: "uppercase",
                }),
              }}
              isSearchable={true}
            />
          )}
        />
      </Field>

      <div className="mt-24 mb-12">
        {isSubmitting ? (
          <button type="submit" className="btn btn-primary text-white" disabled>
            Submitting...
          </button>
        ) : (
          <button type="submit" className="btn btn-primary text-white">
            Save Changes
          </button>
        )}
      </div>
    </Form>
  );
};

export default EditCreateForm;
