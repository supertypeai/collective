import Link from 'next/link';
import Image from 'next/image';

const RepoTag = ({ repo }) => {
    return (
        <Link
            href={`https://github.com/${repo}`}
            target="_blank"
            rel="noreferrer noopener"
            className={`inline-block text-rose-100 hover:bg-rose-900 cursor-pointer border rounded-md text-sm 
                    whitespace-nowrap font-medium mr-1 mb-1 pr-1`}
        >
            <Image src={`https://avatars.githubusercontent.com/${repo}`} width={10} height={10}
                alt={repo} className='inline w-6 h-6 p-[4px] rounded-md' />
            <span className='inline ml-1 text-xs'>@{repo}</span>
        </Link>
    )
}

export default RepoTag