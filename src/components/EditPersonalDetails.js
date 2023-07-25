import { useContext, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { supabase } from "@/lib/supabaseClient";
import { useQueryClient, useMutation } from "@tanstack/react-query";

import { Field, Form, Input } from "@/blocks/Form";
import profileTagsChoices from "@/data/profileTagsChoices.json";
import availabilityForWork from "@/data/availabilityForWork.json";
import countryCity from "@/data/countryCity.json";
import languageChoices from "@/data/languageChoices.json";
import { EditContext } from "@/contexts/EditContext";
import { StableCreatableSelect, StableSelect } from "./CreateForm";
import Edit from "@/icons/Edit";
import TextEditor from "./TextEditor/TextEditor";

const EditPersonalDetails = () => {
  const context = useContext(EditContext);
  const [form, setForm] = context.f;
  const [isEditting, setIsEditting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorImage, setErrorImage] = useState();
  const [uploadImage, setUploadImage] = useState(false);
  const [githubImage, setGithubImage] = useState(false);
  const editorRef = useRef();

  let initialLength = form.tags.length;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      ...form,
    },
    mode: "onSubmit",
  });

  const queryClient = useQueryClient();
  const { mutate: updateForm } = useMutation(
    async (formData) => {
      const { wp, projects, imgUpload, ...d } = formData;

      // check if the imgUrl is updated and the previous image was an uploaded image
      if (
        d.imgUrl !== form.imgUrl &&
        form.imgUrl.startsWith(
          "https://osfehplavmahboowlueu.supabase.co/storage/v1/object/public/images/profile_images/"
        )
      ) {
        // if yes, remove the previous image from the storage
        const imgPath = form.imgUrl.replace(
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
        const filePath = `profile_images/${d.s_preferred_handle}_${fileName}`;
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

      const { error } = await supabase
        .from("profile")
        .update(d)
        .eq("id", formData.id);
      if (
        error?.message ===
        `duplicate key value violates unique constraint "profile_s_preferred_handle_key"`
      ) {
        alert(
          "Your new preferred collective handle already exists, please use another one."
        );
      } else if (
        error?.message ===
        `duplicate key value violates unique constraint "Profile_email_key"`
      ) {
        alert("Your new email already exists, please use another email.");
      } else if (error) {
        alert("Sorry, something went wrong. Please try again.");
        console.log(error);
      } else {
        console.log(formData);
        setForm(formData);
        setIsEditting(false);
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
    const newData = {
      ...form,
      ...data,
      location:
        data["availability"] === "Unavailable" ? null : data["location"],
      imgUrl: githubImage
        ? form.superinference.profile.avatar_url
        : data["imgUrl"],
      long: JSON.stringify(editorRef.current.getEditorState().toJSON()),
    };

    if (uploadImage) {
      if (newData.imgUpload[0] && newData.imgUpload[0].size > 1048576) {
        // Maximum size of 1 MB (in bytes)
        setErrorImage({ message: "Image's size is larger than 1 MB." });
        setIsSubmitting(false);
      } else {
        newData.imgUrl = `https://osfehplavmahboowlueu.supabase.co/storage/v1/object/public/images/profile_images/${newData.s_preferred_handle}_${newData.imgUpload[0].name}`;
        const { imgUpload, ...d } = newData;
        if (JSON.stringify(d) !== JSON.stringify(form)) {
          updateForm(newData);
        } else {
          setIsEditting(false);
        }
      }
    } else {
      const { imgUpload, ...d } = newData;
      if (JSON.stringify(d) !== JSON.stringify(form)) {
        updateForm(d);
      } else {
        setIsEditting(false);
      }
    }
    setIsSubmitting(false);
  };

  return (
    <Form onSubmit={handleSubmit(saveData)}>
      <fieldset>
        <legend>
          <span className="text-2xl font-bold">
            Personal Details
            <button
              type="button"
              onClick={() => setIsEditting(true)}
              hidden={isEditting}
            >
              <Edit />
            </button>
          </span>
        </legend>
        <Field
          label="Preferred Collective Handle"
          error={errors?.s_preferred_handle}
          hint="This will be in the link to your Developer Profile"
        >
          <Input
            {...register("s_preferred_handle", {
              required:
                "Please provide a handle to be used in the link to your Developer Profile",
            })}
            id="s_preferred_handle"
            placeholder="pambeesly"
            disabled={!isEditting}
          />
        </Field>
        <Field label="Full name" error={errors?.fullname}>
          <Input
            {...register("fullname", {
              required: "Full name is a required field",
            })}
            id="fullname"
            placeholder="Pamela Morgan Beesly"
            disabled={!isEditting}
          />
        </Field>
        <Field label="Email" error={errors?.email}>
          <Input
            {...register("email", { required: "Email is required" })}
            type="email"
            id="email"
            placeholder="pamela@dundermifflin.com"
            disabled={!isEditting}
          />
        </Field>

        {uploadImage ? (
          <Field
            label="Upload Profile Image"
            error={errorImage || errors?.imgUpload}
            hint="Your profile image (.jpg/.jpeg/.png/.webp), max 1 MB"
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
              disabled={!isEditting | githubImage}
              className="file-input file-input-secondary border-white text-black w-full max-w-xs"
            />
          </Field>
        ) : (
          <Field
            label="Profile Image URL"
            error={errors?.imgUrl}
            hint="Your profile image (.jpg/.jpeg/.png/.webp)"
          >
            <Input
              {...register("imgUrl", {
                required: {
                  value: !uploadImage,
                  message: "Image URL is a required field",
                },
              })}
              id="imgUrl"
              placeholder="https://avatars.githubusercontent.com/u/69672839?v=4"
              disabled={!isEditting | githubImage}
            />
          </Field>
        )}

        <label className="flex">
          <div>
            <input
              type="checkbox"
              id="github"
              name="github"
              className="mr-3"
              onChange={(e) => {
                setGithubImage((prev) => !prev);
                if (e.target.checked) {
                  setUploadImage(false);
                }
              }}
              checked={githubImage}
              disabled={!isEditting}
            />
            <label htmlFor="github" className="label-text">
              Use my GitHub profile image
            </label>
          </div>
          <span className="label-text mr-2 ml-auto">
            Don&apos;t have a profile image URL?
          </span>
          <input
            type="checkbox"
            className="toggle"
            onChange={() => setUploadImage((prev) => !prev)}
            checked={uploadImage}
            disabled={!isEditting | githubImage}
          />
        </label>

        <Field label="🖊️ Introduction" error={errors?.long}>
          <TextEditor isEditting={isEditting} ref={editorRef} initialContent={form.long} />
        </Field>

        <Field
          label="✨ Headline"
          error={errors?.short}
          hint="A short headline that appears below your name."
        >
          <Input
            {...register("short", {
              required: "Please provide a short Headline",
            })}
            id="short"
            placeholder="Full Stack Data Scientist @SupertypeAI"
            disabled={!isEditting}
          />
        </Field>
        <Field
          label="🗣️ Languages"
          error={errors?.languages}
          hint="Choose all language(s) you're proficient in."
        >
          <Controller
            control={control}
            name="languages"
            defaultValue={[]}
            render={({ field: { onChange, value, ref } }) => (
              <StableSelect
                inputRef={ref}
                isMulti
                options={languageChoices}
                classNamePrefix="select"
                className="text-black max-w-3xl"
                value={value.map((v) => {
                  const index = languageChoices.findIndex(
                    (option) => option.value === v
                  );
                  if (index != -1) {
                    return languageChoices[index];
                  }
                })}
                onChange={(val) => {
                  onChange(val.map((c) => c.value));
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
                  multiValue: (styles) => {
                    return {
                      ...styles,
                      // same primary-focus color from tailwind config
                      backgroundColor: "#c4002f",
                    };
                  },
                  // change color of text in tags
                  multiValueLabel: (styles) => ({
                    ...styles,
                    color: "white",
                  }),
                }}
                isDisabled={!isEditting}
              />
            )}
            rules={{ required: "Please select your proficient language(s)" }}
          />
        </Field>

        <Field
          label="📚 Key Qualifications"
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
                options={profileTagsChoices}
                classNamePrefix="select"
                className="text-black max-w-3xl"
                value={value.map((v) => {
                  const index = profileTagsChoices.findIndex(
                    (option) => option.value === v
                  );
                  if (index != -1) {
                    return profileTagsChoices[index];
                  } else {
                    return { value: v, label: v };
                  }
                })}
                onChange={(val) => {
                  if (initialLength > 10) {
                    val.length < initialLength &&
                      onChange(val.map((c) => c.value));
                    initialLength = val.length;
                  } else {
                    val.length <= 10 && onChange(val.map((c) => c.value));
                  }
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
                isSearchable={initialLength > 10 ? false : true}
                isCreatable={initialLength > 10 ? false : true}
                isDisabled={!isEditting}
              />
            )}
          />
        </Field>
        <Field
          label="🔍 Job Availability"
          error={errors?.availability}
          hint="Indicates your availability for work."
        >
          <Controller
            control={control}
            name="availability"
            defaultValue={""}
            render={({ field: { onChange, value, ref } }) => (
              <StableSelect
                inputRef={ref}
                options={availabilityForWork}
                classNamePrefix="select"
                className="text-black max-w-3xl"
                value={availabilityForWork.find((opt) => opt.value === value)}
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
                isDisabled={!isEditting}
              />
            )}
            rules={{ required: "Please select your job availability" }}
          />
        </Field>
        <Field label="📍Preferred Job Location" error={errors?.location}>
          <Controller
            control={control}
            name="location"
            defaultValue={""}
            render={({ field: { onChange, value, ref } }) => (
              <StableSelect
                inputRef={ref}
                options={[
                  { geoName: "Remote / Anywhere in the world" },
                  ...countryCity,
                ].map((c) => {
                  return {
                    value: c.geoName,
                    label: c.geoName,
                  };
                })}
                classNamePrefix="select"
                className="text-black max-w-3xl"
                value={
                  watch("availability") === "Unavailable"
                    ? null
                    : [
                        { geoName: "Remote / Anywhere in the world" },
                        ...countryCity,
                      ]
                        .map((c) => {
                          return {
                            value: c.geoName,
                            label: c.geoName,
                          };
                        })
                        .find((opt) => opt.value === value)
                }
                onChange={(val) => onChange(val ? val.value : null)}
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
                isDisabled={
                  !isEditting || watch("availability") === "Unavailable"
                }
              />
            )}
            rules={{
              required:
                watch("availability") === "Unavailable"
                  ? false
                  : "Please select your preferred job location",
            }}
          />
        </Field>
        <div className="my-4">
          {isEditting ? (
            <>
              <button
                type="button"
                className="btn btn-secondary text-white mr-3 mt-64"
                onClick={() => {
                  setIsEditting(false);
                  setGithubImage(false);
                  setUploadImage(false);
                  reset(form);
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-warning text-black mt-64"
              >
                Save Changes
              </button>
            </>
          ) : isSubmitting ? (
            <button
              type="submit"
              className="btn btn-warning text-black mt-64"
              disabled
            >
              Saving Changes...
            </button>
          ) : (
            <></>
          )}
        </div>
      </fieldset>
    </Form>
  );
};

export default EditPersonalDetails;
