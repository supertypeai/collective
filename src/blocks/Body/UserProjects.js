const UserProjects = ({ projects }) => {

    return (
        <div className="col-span-10 lg:col-span-4 text-white my-8 mx-1 self-start">
            <h3 className="text-lg uppercase font-semibold leading-normal mb-2 my-4">Projects</h3>
            <div className="border-white border rounded-lg shadow-lg p-4">
                {/* {
                    JSON.stringify(projects)
                } */}

            </div>
        </div>
    )
}

export default UserProjects