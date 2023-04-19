import Link from "next/link";
import Image from 'next/image';
import Pills from "@/blocks/Pills";

const ProfileCardWide = ({ person }) => {

    return (
        <div className="pt-5">

            <div className="sm:flex sm:items-center justify-between sm:space-x-5 min-w-180">
                <div className="flex items-center">
                    <Image src={person.imgUrl} alt={person.name} width={100} height={100} className="w-10 h-10 bg-center bg-cover rounded-full dark:bg-gray-500 grayscale-1 sepia-[.5] hover:filter-none drop-shadow-lg" />
                    <div className="mt-0 mr-0 mb-0 ml-4 w-80">
                        <Link href={person.profileLink}
                            className={`link-info hover:opacity-70 ${person.name.length > 16 ? 'text-sm' : 'text-md'}`}
                        >
                            {person.name}
                        </Link>
                        <p className="text-sm lg:text-xs">{person.short}</p>
                    </div>
                </div>
                <div className="mt-4 flex items-center sm:space-x-6 sm:pl-0 sm:mt-0 w-1/2 justify-end">
                    <div className="flex items-center justify-center py-3 space-x-3 pl-4 text-xs">
                        <Pills tags={person.tags} maxWidth="800px" onClick={() => null} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileCardWide