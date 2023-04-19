import { useContext } from "react";
import Link from "next/link";
import Image from 'next/image';
import { AppContext } from "@/contexts/AppContext";

const AddDevProfileCTA = () => {
    const { isLoggedIn } = useContext(AppContext);

    if (isLoggedIn.user && !isLoggedIn.user.id) {
        return (
            <div className="flex items-center mt-8">
                <div className="relative mx-auto w-96 overflow-hidden rounded-[16px] bg-gray-300 p-[1px] transition-all duration-300 ease-in-out bg-opacity-10">
                    <div className="relative rounded-[15px] bg-white p-6 bg-opacity-10">
                        <div className="space-y-4 text-white">
                            <Image src="/collaborators.svg" width={250} height={100} alt="supertype collective collaborators" />
                            <p className="text-lg font-semibold">Add your Developer Profile</p>
                            <p className="font-md text-gray-400 text-justify">
                                Connect with collaborators and like-minded developers through impactful open source projects, and empower the local developer community in Indonesia in the process.
                                Enrollment is free and open to all developers worldwide.
                            </p>
                            <Link href={isLoggedIn?.linkedinUser ? "/executive" : "/enroll"}>
                                <button className="btn btn-md btn-info drop-shadow-lg mt-4">Join Collective</button>
                            </Link>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddDevProfileCTA