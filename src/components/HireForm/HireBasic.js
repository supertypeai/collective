import { useContext, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabaseClient";
import { QueryClient } from "@tanstack/react-query";

import { HireContext } from "@/contexts/HireContext";
import { Field, Form, Input } from "@/blocks/Form";
import { PillsFromStack } from "../PillsFromStack";
import stackSectionChoices from "@/data/stackSectionChoices.json";
import AddedToStack from "../AddedToStack";
import { StableSelect } from "../CreateForm";

const commitmentOptions = [
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "hourly", label: "Hourly" },
  { value: "undecided", label: "I'll decide later" },
];

const remotenessOptions = [
  { value: "remote", label: "Remote, anywhere in the world" },
  { value: "mostly-remote", label: "Mostly remote" },
  { value: "office", label: "Work from office" },
  { value: "undecided", label: "I'll decide later" },
];

const budgetOptions = [
  { value: "hourly", label: "Hourly" },
  { value: "monthly", label: "Monthly" },
  { value: "project-based", label: "Project Based" },
  { value: "undecided", label: "I'll decide later" },
];

const HireBasic = () => {
  const context = useContext(HireContext);
  const router = useRouter();
  const { proFR } = router.query;
  const [form] = context.f;
  const [stackExamples, setStackExamples] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchData = async (userHandle) => {
    const queryClient = new QueryClient();
    const data = await queryClient.fetchQuery(
      ["hiringData", userHandle],
      async () => {
        const { data, error } = await supabase
          .from("profile")
          .select(`stack`)
          .eq("s_preferred_handle", userHandle)
          .single();

        if (!data) {
          throw new Error("No such user in the database");
        }

        if (error) {
          console.log(error);
          throw new Error(error, "Error fetching this user");
        }

        return data;
      },
      {
        staleTime: 1000 * 60 * 60 * 24, // 24 hours
        retry: false, // Disable retries on error
      }
    );

    return data;
  };

  useEffect(() => {
    const fetchStacks = async () => {
      const { stack } = await fetchData(proFR);
      const stacks = Object.keys(stack).map((id) => {
        const key = Object.keys(stack[id])[0];
        const selected = stack[id][key];
        const e = stackSectionChoices.find((s) => s.value === key);
        return {
          name: e.value,
          label: e.label,
          child: e.examples.map((e) => e.label),
          selected: e.examples
            .filter((item) => selected.includes(item.value))
            .map((e) => e.label),
        };
      });
      const initialStacks = {
        1: stacks[0],
        2: stacks[1],
        3: stacks[2],
      };
      setStackExamples(initialStacks);
    };
    // Execute the data fetching on the client-side only
    if (proFR) {
      fetchStacks(proFR);
    }
  }, [proFR]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      ...form,
    },
    mode: "onSubmit",
  });

  const saveData = async (data) => {
    setIsSubmitting(true);
    let stack = {};

    const getValuesByLabel = (category, labels) => {
      const obj = stackSectionChoices.find((obj) => obj.value === category);
      return obj
        ? obj.examples
          .filter((ex) => labels.includes(ex.label))
          .map((ex) => ex.value)
        : [];
    };

    Object.keys(stackExamples).forEach((key) => {
      stack[key] = {
        [stackExamples[key].name]: getValuesByLabel(
          stackExamples[key].name,
          stackExamples[key].selected
        ),
      };
    });

    // check that user has at least 3 stacks
    if (Object.keys(stack).length < 1) {
      alert("Please provide at least one desired skill");
      setIsSubmitting(false);
    } else if (
      Object.values(stack).some((el) => Object.values(el).flat().length < 1)
    ) {
      // check that user has at least three tags for each 3 stacks
      alert("Please select at least 1 tag for the desired skill");
      setIsSubmitting(false);
    } else {
      if (data["budget_payment"] === "undecided") {
        data["budget"] = null;
      }

      const finalData = {
        ...data,
        required_skills: stack,
        from_profile: proFR ? proFR : null,
      };

      const { error } = await supabase.from("hireenq").insert([
        {
          ...finalData,
          created_at: new Date(),
        },
      ]);

      if (error) {
        alert("Sorry, something went wrong. Please try again.");
        setIsSubmitting(false);
        console.log(error);
      } else {
        fetch("/api/hiringNotification", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            formData: finalData,
          }),
        }).then((res) => {
          return res.json();
        });

        alert("Thank you for submitting! We will be in touch.");
        setTimeout(() => {
          router.push("/");
        }, 1000);
      }
    }
  };

  const StackSelectFactory = ({ id, name }) => {
    return (
      <div>
        <div className="col-sm-12 my-3">
          <label
            htmlFor={`stack-${id}`}
            className="form-label block uppercase tracking-wide text-gray-300 text-sm font-bold mb-2"
          >
            <h3>{name}</h3>
          </label>
          <StableSelect
            id={`stack-${id}`}
            className="text-black max-w-3xl"
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
            options={
              // needs to be filtered by what's already in state
              stackSectionChoices.filter(
                (choice) =>
                  !Object.values(stackExamples)
                    .map((x) => x.name)
                    .includes(choice.value)
              )
            }
            value={
              stackExamples[id]
                ? {
                  value: stackExamples[id].name,
                  label: stackExamples[id].label,
                }
                : null
            }
            onChange={(e) => {
              if (!e){
                const {[id]:_, ...clearedExamples} = stackExamples;
                setStackExamples(clearedExamples)
              } else {
                setStackExamples({
                  ...stackExamples,
                  [id]: {
                    name: e.value,
                    label: e.label,
                    child: e.examples.map((e) => e.label),
                    selected: [],
                  },
                })
              }
            }}
            isClearable={true}
          />
        </div>
        {stackExamples && stackExamples[id] && (
          <PillsFromStack
            id={id}
            stackExamples={stackExamples}
            setStackExamples={setStackExamples}
          />
        )}
      </div>
    );
  };

  return (
    <Form onSubmit={handleSubmit(saveData)}>
      <fieldset>
        <legend>
          <h3 className="text-2xl font-bold">
            🧑‍💼 Connect me with Collective consultants
          </h3>
          <p className="text-sm">
            Help us find the right candidate(s) for your project.
          </p>
        </legend>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <Field
              label="Your Name"
              error={errors?.name}
              hint="How should we address you?"
            >
              <Input
                {...register("name", {
                  required: "Please provide a name to address you by",
                })}
                id="name"
                placeholder="Pamela Morgan Beesly"
              />
            </Field>
          </div>
          <div className="w-full md:w-1/2 px-3">
            <Field
              label="Company Email"
              error={errors?.email}
              hint="We'll use this to contact you."
            >
              <Input
                {...register("email", {
                  required: "Please sign in with your GitHub account",
                })}
                id="email"
                placeholder="pam.beesly@dundermifflin.com"
              />
            </Field>
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <Field
              label="Commitment Level"
              error={errors?.commitment}
              hint="The level of time commitment you require from the consultant(s)."
            >
              <Controller
                control={control}
                name="commitment"
                defaultValue={commitmentOptions[1].value}
                render={({ field: { onChange, value, ref } }) => (
                  <StableSelect
                    inputRef={ref}
                    className="text-black max-w-3xl"
                    options={commitmentOptions}
                    value={commitmentOptions.find((opt) => opt.value === value)}
                    onChange={(val) => onChange(val.value)}
                  />
                )}
              />
            </Field>
          </div>
          <div className="w-full md:w-1/2 px-3">
            <Field
              label="Work Preference"
              error={errors?.remoteness}
              hint="Open to working with your consultants remotely?"
            >
              <Controller
                control={control}
                name="remoteness"
                defaultValue={remotenessOptions[1].value}
                render={({ field: { onChange, value, ref } }) => (
                  <StableSelect
                    inputRef={ref}
                    className="text-black max-w-3xl"
                    options={remotenessOptions}
                    value={remotenessOptions.find((opt) => opt.value === value)}
                    onChange={(val) => onChange(val.value)}
                  />
                )}
              />
            </Field>
          </div>
          <div className="w-full md:w-1/2 px-3">
            <Field label="Budget (USD)" error={errors?.budget}>
              <div className="grid grid-cols-2 gap-2">
                <Controller
                  control={control}
                  name="budget_payment"
                  defaultValue={budgetOptions[0].value}
                  render={({ field: { onChange, value, ref } }) => (
                    <StableSelect
                      inputRef={ref}
                      className="text-black max-w-3xl"
                      options={budgetOptions}
                      value={budgetOptions.find((opt) => opt.value === value)}
                      onChange={(val) => onChange(val.value)}
                    />
                  )}
                />
                <Input
                  {...register("budget", {
                    required:
                      watch("budget_payment") === "undecided"
                        ? false
                        : "Please provide your budget",
                  })}
                  id="budget"
                  placeholder="100"
                  type="number"
                  min="1"
                  className="form-control appearance-none block w-full bg-gray-100 text-black border border-gray-200 rounded px-4 leading-tight focus:outline-none focus:bg-white disabled:text-gray-400 disabled:hover:cursor-not-allowed"
                  disabled={
                    watch("budget_payment") === "undecided" ? true : false
                  }
                />
              </div>
            </Field>
          </div>
          <div className="w-full md:w-1/2 px-3">
            <Field label="Description" error={errors?.description}>
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
                placeholder="A good place to brief us about the project, the key job responsibities, your budget (if you have one), and any other details you think we should know."
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
            </Field>
          </div>
        </div>
        <div className="max-w-6xl grid grid-cols-5">
          <div className="w-full col-span-12 lg:col-span-3">
            <span className="italic text-muted">Leave any Stack empty if undecided or unsure.</span>
            <StackSelectFactory id="1" name="Desired Skills (Top Stack)" />
            <StackSelectFactory id="2" name="Desired Skills (Middle Stack)" />
            <StackSelectFactory id="3" name="Desired Skills (Bottom Stack)" />
          </div>
          {stackExamples &&
            Object.values(stackExamples).some(
              (el) => el.selected?.length > 0
            ) && (
              <AddedToStack
                stackExamples={stackExamples}
                setStackExamples={setStackExamples}
              />
            )}
        </div>
      </fieldset>
      {isSubmitting ? (
        <button
          type="submit"
          className="btn btn-primary text-white mb-6"
          disabled
        >
          Submitting...
        </button>
      ) : (
        <button type="submit" className="btn btn-primary text-white mb-6">
          Submit
        </button>
      )}
    </Form>
  );
};

export default HireBasic;
