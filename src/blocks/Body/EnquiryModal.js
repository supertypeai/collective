import { useContext } from "react";
import Image from "next/image";
import { signInWithLinkedIn } from "@/components/ExecutiveForm";
import { signInWithGitHub } from "../Mainframe/Navbar";

import { AppContext } from "@/contexts/AppContext";

const ModalFrame = ({ children }) => {
    return (
        <>
            <input type="checkbox" id="enquire-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box dark:bg-black dark:text-white bg-white text-black rounded-md">
                    {children}
                    <div className="modal-action">
                        <label htmlFor="enquire-modal" className="btn">Got it</label>
                    </div>
                </div>
            </div>
        </>
    )
}

const EnquiryModal = ({ children }) => {
    const { isLoggedIn } = useContext(AppContext);
    // isLoggedIn contains the token we can use in our fetch calls
    console.log("isloggedin", isLoggedIn)

    if (!isLoggedIn) return (
        <ModalFrame>
            <h3 className="font-bold text-lg">You&apos;re not logged in.</h3>
            <p className="py-4 text-sm">
                Please login with LinkedIn or GitHub to unlock all features of Collective.
            </p>
            {/* /align two buttons in a column vertically */}
            <div className="flex flex-col w-2/5 mx-auto gap-y-2">
                <button onClick={() => signInWithGitHub()}
                    className="group border border-info hover:border hover:text-rose-200 px-3 py-2 rounded-md text-sm hover:bg-info">
                    <Image src="/techicons/github_inv.png" alt="GitHub Logo" width={20} height={20} className="inline mr-2 -mt-1" />
                    Login with GitHub
                </button>

                <button onClick={() => signInWithLinkedIn()}
                    className="group border border-info hover:border hover:text-rose-200 px-3 py-2 rounded-md text-sm hover:bg-info">
                    <Image src="/techicons/linkedin_inv.png" alt="LinkedIn Logo" width={20} height={20} className="inline mr-2 -mt-1" />
                    Login with LinkedIn
                </button>
            </div>
        </ModalFrame>
    )

    return (
        <ModalFrame>
            {children}
        </ModalFrame>
    )
}

export default EnquiryModal