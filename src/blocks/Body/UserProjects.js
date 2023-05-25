import Link from 'next/link';
import Image from 'next/image';

const UserProjects = ({ projects }) => {

    return (
        <div className="col-span-10 lg:col-span-4 text-white my-8 mx-1 self-start">
            <h3 className="text-lg uppercase font-semibold leading-normal mb-2 my-4 text-left">Building 🏗️ </h3>
            <div className="border-white border rounded-lg shadow-lg p-4">
                {
                    projects.map((project) => (
                        <Link
                            href={`/r/${project.handle}`}
                            key={project.handle}
                            className="flex items-center justify-between py-2"
                        >
                            <div className="flex items-center">
                                <Image src={project.imgUrl} width={20} height={20}
                                    alt={project.handle} className='inline w-20 h-10 p-[4px] rounded-md' />
                            </div>
                            <span className="text-xs text-gray-400 text-right">
                                <div className='ml-1 block text-white'>
                                    <span className='mr-2 font-bold'>@{project.handle}</span>
                                    {/* iterate over tags to create tags badges */}
                                    {project.tags.map((tag) => (
                                        <span key={tag} className='inline-block text-rose-100 hover:bg-rose-900 cursor-pointer border rounded text-xs whitespace-nowrap font-medium mr-1 mb-1 px-1'>
                                            {tag}
                                        </span>
                                    ))}

                                </div>
                                {project.description.slice(0, 100) + '...'}
                            </span>
                        </Link>
                    ))
                }

            </div>
        </div>
    )
}

export default UserProjects