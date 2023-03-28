import Link from 'next/link';

const RepoCard = ({ repo, owner }) => {

    return (
        <div>
            <Link
                href={repo['html_url']}
                className="relative block overflow-hidden rounded-lg border border-info p-4 sm:px-6 mb-2"
                target="_blank"
                rel="noreferrer noopener"
            >
                <span
                    className="absolute inset-y-0 left-0 w-1 bg-info"
                ></span>

                <div className="sm:flex sm:justify-between sm:gap-4">
                    <div className='leading-none'>
                        <h3 className="font-bold">
                            {owner}/{repo['name']}
                        </h3>
                    </div>

                    <div className="hidden sm:block sm:shrink-0">
                        <button className='btn-xs rounded hover:bg-rose-700'>☆ {repo['stargazers_count']} Star</button>
                    </div>
                </div>

                <div>
                    <p className="max-w-[120ch] text-xs sm:text-sm text-gray-300">
                        {repo['description']}
                    </p>
                </div>

                <dl className="mt-3 flex gap-4 sm:gap-6">

                    <div className='text-white text-xs flex fill-white'>
                        <span className="text-xs mr-1">●</span>
                        {repo['top_language']}
                    </div>

                    <div className='text-white text-xs flex fill-white place-items-center'>
                        <svg aria-label="forks" role="img" height="16" viewBox="0 0 16 16" version="1.1" width="16">
                            <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"></path>
                        </svg> &nbsp;
                        {repo['forks_count']}
                    </div>

                    <div className='text-white text-xs flex fill-white place-items-center'>
                        <svg aria-label="stars" role="img" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="octicon octicon-star">
                            <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z"></path>
                        </svg>&nbsp;
                        {repo['stargazers_count']}
                    </div>
                </dl>
            </Link>
        </div>
    )
}

export default RepoCard