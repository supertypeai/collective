import RepoCard from '@/components/RepoCard';

const GitHubProjects = ({ repos, count, owner }) => {

    return (
        <div className="col-span-12 md:col-span-4 text-white my-8 mx-1 self-start">
            <h3 className="text-lg uppercase font-semibold leading-normal mb-2 my-4">GitHub Projects</h3>
            {
                repos.map((repo, index) => {
                    // show only up to data['show_repo'] repos
                    if (index < count) {
                        return <div key={index}><RepoCard repo={repo} owner={owner} /></div>
                    }
                })
            }
        </div>
    )

}

export default GitHubProjects