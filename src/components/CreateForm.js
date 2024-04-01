import { useId, useState, useContext, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { supabase } from "@/lib/supabaseClient";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import { useQuery } from "@tanstack/react-query";

import { Field, Form, Input } from "@/blocks/Form";
import stackSectionChoices from "@/data/stackSectionChoices.json";
import projectStatus from "@/data/projectStatus.json";
import projectTypes from "@/data/projectTypes.json";
import { AppContext } from "@/contexts/AppContext";

export function StableCreatableSelect({ ...props }) {
  return <CreatableSelect {...props} instanceId={useId()} />;
}

export function StableSelect({ ...props }) {
  return <Select {...props} instanceId={useId()} />;
}

export const fetchProfiles = async () => {
  const { data, error } = await supabase
    .from("profile")
    .select(`id, fullname`)
    .eq("accepted", true);

  if (error) {
    throw new Error(error, "Error fetching collective profile");
  }

  if (!data) {
    throw new Error("Unavailable collective handle in the database");
  }
  return data;
};

const CreateForm = ({ setProjectState }) => {
  const { isLoggedIn } = useContext(AppContext);

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

    reset({
      makers: [isLoggedIn.user.id],
    });
  }, [setMembersChoices, handleData]);

  const postToSupabase = async (data) => {
    const { makers, imgUpload, ...d } = data;

    const { data: project, error } = await supabase
      .from("project")
      .insert([
        {
          ...d,
          created_at: new Date(),
        },
      ])
      .select("id");

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
      const { error: memberError } = await supabase
        .from("projectmembers")
        .insert(
          makers.map((makerid) => {
            return {
              userid: makerid,
              projectid: project[0].id,
            };
          })
        );

      if (memberError) {
        alert("Sorry, something went wrong. Please try again.");
        setIsSubmitting(false);
        console.log(`Error uploading projectmembers:`, memberError);
      }

      if (uploadImage) {
        const file = imgUpload[0];
        const fileName = file.name;
        const filePath = `project_images/${d.handle}_${fileName}`;

        try {
          const { error: imageError } = await supabase.storage
            .from("images")
            .upload(filePath, file, {
              cacheControl: "3600",
              upsert: false,
            });
          if (imageError) {
            setErrorImage(imageError);
            setIsSubmitting(false);
          } else {
            setIsSubmitting(false);
            // send notification to slack
            fetch("/api/slackNotification", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                message: `A user just created a Project called ${d.name}! Email: ${isLoggedIn.user.email}`,
              }),
            }).then((res) => {
              return res.json();
            });

            // if successful, alert() for 2 seconds and redirect to home page
            alert("Thank you for your submission! Pending a quick review, your project will be live on Collective soon.");
            reset();
            setProjectState(false);
          }
        } catch (error) {
          console.error("Error uploading image:", error.message);
        }
      } else {
        // send notification to slack
        fetch("/api/slackNotification", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: `A user just created a Project called ${d.name}! Email: ${isLoggedIn.user.email}`,
          }),
        }).then((res) => {
          return res.json();
        });
        alert("Thank you for your submission! Pending a quick review, your project will be live on Collective soon.");
        setIsSubmitting(false);
        reset();
        setProjectState(false);
      }
    }
  };

  const saveData = (data) => {
    setIsSubmitting(true);
    if (uploadImage) {
      const { imgUpload } = data;
      if (imgUpload[0] && imgUpload[0].size > 1048576) {
        // Maximum size of 1 MB (in bytes)
        setErrorImage({ message: "Image's size is larger than 1 MB." });
        setIsSubmitting(false);
      } else {
        data.imgUrl = `https://osfehplavmahboowlueu.supabase.co/storage/v1/object/public/images/project_images/${data.handle}_${imgUpload[0].name}`;
        postToSupabase(data);
      }
    } else {
      postToSupabase(data);
    }
  };

  return (
    <Form onSubmit={handleSubmit(saveData)}>
      <fieldset>
        <button
          onClick={() => setProjectState(false)}
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
        label="Preferred Project Handle"
        error={errors?.handle}
        hint="This will form the link to your project page (https://collective.supertype.ai/r/{project_handle})"
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
          <Field label="GitHub URL" error={errors?.github}
            hint="Leave blank if not available"
          >
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
        label="📚 Technology Qualifications"
        error={errors?.tags}
        hint="A maximum of 10 most revelant technologies used in your project"
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
        hint="Pick a category that best describes your project"
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
            Complete Registration
          </button>
        )}
      </div>
    </Form>
  );
};

export default CreateForm;
