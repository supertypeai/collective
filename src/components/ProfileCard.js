import Link from "next/link";
import Image from 'next/image';
import Pills from "@/blocks/Pills";

const ProfileCard = ({ person }) => {
    return (
        <div className="flex flex-col justify-center w-full px-2 mx-2 my-6 text-center rounded-md md:w-96 lg:w-44 bg-gray-100 text-white bg-opacity-10">
            <Image src={person.imgUrl} alt={person.name} width={100} height={100} className="self-center flex-shrink-0 w-16 h-16 -mt-8 bg-center bg-cover rounded-full dark:bg-gray-500 grayscale-1 sepia-[.5] hover:filter-none drop-shadow-lg" />
            <div className="flex-1 my-2">
                <p className=" font-semibold leading-snug">
                    <Link href={person.profileLink} target="_blank" className="link-info hover:opacity-70">
                        {person.name}
                    </Link>
                </p>
                <p className="text-sm lg:text-xs">{person.short}</p>
            </div>
            <div className="flex items-center justify-center py-3 space-x-3 border-t-2 text-xs">
                <Pills tags={person.tags} maxWidth="800px" onClick={() => null} />
            </div>
        </div>
    )
}

export default ProfileCard