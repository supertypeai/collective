import { signInWithLinkedIn } from "@/components/ExecutiveForm";
import { signInWithGitHub } from "../Mainframe/Navbar";

import { useContext } from "react";
import { AppContext } from "@/contexts/AppContext";

const ModalFrame = ({ children }) => {
    return (
        <>
            <input type="checkbox" id="enquire-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box dark:bg-black dark:text-white bg-white text-black">
                    {children}
                    <div className="modal-action">
                        <label htmlFor="enquire-modal" className="btn">Got it</label>
                    </div>
                </div>
            </div>
        </>
    )
}

const EnquiryModal = ({ data }) => {
    const { isLoggedIn } = useContext(AppContext);
    // isLoggedIn contains the token we can use in our fetch calls
    console.log("isloggedin", isLoggedIn)

    if (!isLoggedIn) return (
        <ModalFrame>
            <h3 className="font-bold text-lg">You&apos;re not logged in.</h3>
            <p className="py-4">Please login to send an enquiry.</p>
        </ModalFrame>
    )

    return (
        <ModalFrame>
            <h3 className="font-bold text-lg">We&apos;re working on this functionality.</h3>
            <p className="py-4">The enquiry feature will be added soon.</p>
        </ModalFrame>
    )
}

export default EnquiryModal