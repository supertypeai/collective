import Link from "next/link";
import { getTagInfo } from '@/pages/tags/[tag]';

const PopularTagBadge = ({ slug, count = '10+' }) => {
    return (
        <div className="bg-gray-100 text-white bg-opacity-10 mx-1 py-1 px-[4px] rounded">
            <Link href={`/tags/${slug}`} className="text-[0.7rem] flex">
                {getTagInfo(slug, 'label')}
                <div className="badge border-none bg-red-800 dark:bg-info dark:text-black badge-sm px-1 self-center ml-1">
                    {count}
                </div>
            </Link>
        </div>
    )
}

export default PopularTagBadge