import Link from "next/link";
import Image from 'next/image';

const AddDevProfileCTA = () => {
    return (
        <div class="flex items-center mt-8">
            <div class="relative mx-auto w-96 overflow-hidden rounded-[16px] bg-gray-300 p-[1px] transition-all duration-300 ease-in-out bg-opacity-10">
                <div class="relative rounded-[15px] bg-white p-6 bg-opacity-10">
                    <div class="space-y-4 text-white">
                        <Image src="collaborators.svg" width={250} height={100} alt="supertype collective collaborators" />
                        <p class="text-lg font-semibold">Add your Developer Profile</p>
                        <p class="font-md text-gray-400 text-justify">Connect with collaborators and like-minded developers through impactful open source projects, and empower the local developer community in Indonesia in the process.</p>
                        <Link href="/enroll">
                            <button className="btn btn-md btn-info drop-shadow-lg mt-4">Join Collective</button>
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddDevProfileCTA