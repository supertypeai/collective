import Link from "next/link";
import { getTagInfo } from '@/pages/tags/[tag]';

const PopularTagBadge = ({ slug, count, link = true }) => {
    return (
        <div className="bg-gray-100 text-white bg-opacity-10 mx-1 py-1 px-[4px] rounded hover:bg-info hover:bg-opacity-30">

            {
                link ?
                    <Link href={`/tags/${slug}`} className="text-[0.7rem] flex">
                        {getTagInfo(slug, 'label')}
                        {
                            count &&
                            <div className="badge border-none bg-red-800 dark:bg-info dark:text-black badge-sm px-1 self-center ml-1">
                                {count}
                            </div>
                        }
                    </Link>
                    : <span className="text-[0.7rem] flex whitespace-nowrap">
                        {getTagInfo(slug, 'label')}
                    </span>

            }

        </div>
    )
}

export default PopularTagBadge