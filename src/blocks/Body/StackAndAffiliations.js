import UserProjects from "./UserProjects"

const StackAndAffiliations = ({ stack, affiliations, projects }) => {
    return (
        <div className="mx-auto sm:max-w-80 lg:col-span-8 justify-center justify-self-center lg:justify-self-start mt-8">
            <div className="md:flex mt-14 text-center md:ml-8">
                <div className="w-screen md:mr-12 md:w-1/3">
                    {stack}
                </div>
                <div className="w-screen md:ml-8 md:w-2/3">
                    {affiliations}
                    <UserProjects projects={projects} />
                </div>
            </div>
        </div>
    )
}

export default StackAndAffiliations