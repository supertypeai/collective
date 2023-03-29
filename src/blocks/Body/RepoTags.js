import RepoTag from '@/components/RepoTag';

const RepoTags = ({ collaborations }) => {
    return (
        <div className="col-span-12 row-span-3 md:col-span-4 text-white my-8 mx-1 self-start">
            <h3 className="text-lg uppercase font-semibold leading-normal mb-2 my-4">Open Source Contributions</h3>
            {Object.keys(collaborations).map(e =>
                <div key={e} className="inline-flex">
                    <RepoTag repo={e} />
                </div>
            )}
        </div>
    )
}

export default RepoTags