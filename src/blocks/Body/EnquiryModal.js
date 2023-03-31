import { useContext, useEffect } from "react";
import Image from "next/image";
import { signInWithLinkedIn } from "@/components/ExecutiveForm";
import { signInWithGitHub } from "../Mainframe/Navbar";

import { AppContext } from "@/contexts/AppContext";
import Unlock from "@/icons/Unlock";


const ModalFrame = ({ children }) => {
    return (
        <div data-html2canvas-ignore="true">
            <input type="checkbox" id="enquire-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box dark:bg-black dark:text-white bg-white text-black rounded-md md:py-8 md:h-[30%] sm:absolute sm:bottom-200 bottom-48">
                    <label htmlFor="enquire-modal" className="btn btn-sm btn-circle absolute right-2 top-2 hover:bg-info hover:text-white border-info text-info bg-white dark:bg-black drop-shadow">✕</label>
                    {children}
                </div>
            </div>
        </div>
    )
}
const onCreateScreenshot = async () => {
    const html2canvas = (await import('html2canvas')).default;

    // clear the screenshot div
    const elem = document.getElementById('screenshot');
    if (elem) {

        html2canvas(document.getElementById('mainframe'), {
            scale: .8,
            allowTaint: true,
            useCORS: true
        }).then(canvas => {
            // while (elem && elem.firstChild) elem.removeChild(elem.firstChild);
            // add style to canvas
            canvas.style.width = '50%';
            canvas.style.height = '50%';
            canvas.style.border = '1px solid #b1976b';

            elem.appendChild(canvas);
        })

    }

}

const EnquiryModal = ({ children }) => {
    const { isLoggedIn } = useContext(AppContext);
    // isLoggedIn contains the token we can use in our fetch calls
    console.log("isloggedin", isLoggedIn)

    useEffect(() => {
        onCreateScreenshot();

        // clear the screenshot div
        return () => {
            const elem = document.getElementById('screenshot');
            // clear the div
            if (elem) {
                elem.innerHTML = '';
            }
        }
    }, [])

    if (!isLoggedIn) return (
        <ModalFrame>
            <h3 className="font-bold text-lg">You&apos;re not logged in.</h3>
            <p className="py-4 text-sm">
                Please login with LinkedIn or GitHub to unlock all features of Collective.
            </p>
            {/* 3-column + 2-column side by side */}
            <div className="flex flex-row items-start">

                <div className="flex flex-col sm:w-96 w-52">
                    <div id="screenshot" className="absolute z-0"></div>
                </div>
                <div className="flex flex-col z-10 w:36 sm:w-52 ml-4 sm:ml-0">
                    {/* /align two buttons in a column vertically */}
                    <div className="inline-grid mx-auto gap-y-2 w-40 text-sm">

                        <div className="divider">One-click Sign Up</div>
                        <button onClick={() => signInWithGitHub()}
                            className="group border dark:border-info hover:border hover:text-rose-200 py-2 rounded-md text-xs hover:bg-info btn-sm bg-black text-white">
                            <Image src="/techicons/github_inv.png" alt="GitHub Logo" width={20} height={20} className="inline mr-2 -mt-1" />
                            GitHub
                        </button>

                        <button onClick={() => signInWithLinkedIn()}
                            className="group border dark:border-info hover:border hover:text-rose-200 py-2 rounded-md text-xs hover:bg-info btn-sm bg-black text-white">
                            <Image src="/techicons/linkedin_inv.png" alt="LinkedIn Logo" width={20} height={20} className="inline mr-2 -mt-1" />
                            LinkedIn
                        </button>

                        <div className="divider">Benefits</div>
                        <span className="text-xs">Create a free account in one-click to unlock all features:</span>
                        <ul className="list-disc list-inside text-xs">
                            <li>PDF download</li>
                            <li>Enquiry</li>
                            <li>Easy builder for your own Profile</li>
                            <li><Unlock />All other features</li>
                        </ul>

                    </div>


                </div>

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