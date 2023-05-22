import { useContext } from "react";
import Image from "next/image";

import { AppContext } from "@/contexts/AppContext";

const ProjectOverview = ({ setProjectState }) => {
  const { isLoggedIn } = useContext(AppContext);

  return (
    <>
      <h3 className="text-2xl font-bold">Your Projects</h3>
      <div className="grid grid-cols-12 gap-4 mt-2">
        {isLoggedIn.user.projects.map((project, index) => {
          return (
            <div
              key={index}
              className="card col-span-12 md:col-span-6 shadow-xl image-full bg-gray-100 bg-opacity-10"
            >
              <figure>
                <Image
                  src={project.imgUrl}
                  alt={project.name}
                  width={300}
                  height={240}
                  className="opacity-30"
                />
              </figure>
              <div className="card-body p-4">
                <h2 className="card-title">{project.name}</h2>
                <p className="text-xs">{project.description}</p>
                <div className="card-actions justify-end">
                  <div
                    className="btn btn-secondary btn-xs dark:btn-info hover:opacity-75"
                    onClick={() => setProjectState({ projectid: project.id })}
                  >
                    Edit
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <button
        type="button"
        className="btn btn-secondary text-white my-8 w-2/3 sm:w-1/3"
        onClick={() => setProjectState("add")}
      >
        + Add New Project
      </button>
    </>
  );
};

export default ProjectOverview;
