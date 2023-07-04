import { useContext } from 'react';
import Link from 'next/link'
import Image from 'next/image';
import { supabase } from "@/lib/supabaseClient";
import Home from '@/icons/Home'
import Download from '@/icons/Download';
import { AppContext } from "@/contexts/AppContext";
import ThemeToggle from '@/components/ThemeToggle';
import { signInWithLinkedIn } from '@/components/ExecutiveForm';

const onCreatePDF = async () => {
    const html2pdf = (await import('html2pdf.js')).default;
    const element = document.getElementById('mainframe');
    const opt = {
        filename: 'collective_profile.pdf',
        jsPDF: { format: 'a2', orientation: 'portrait' }
    };
    // Promise-based usage:
    await html2pdf().set(opt).from(element).save();
}

export async function signInWithGitHub() {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
            // redirect to their last page
            redirectTo: window.location.href
        }
    });
    if (error) {
        console.log(error);
    }
}

export const LinkToHome = () => {
    return (
        <Link href="/" className='hover:opacity-100 hover:text-amber-900 dark:hover:text-amber-200'>
            <Home className="h-8 w-8" /> &nbsp; <span className="font-bold">Collective</span>
        </Link>
    )
}

export const signOutFromSupabase = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.log(error);
    }
    // refresh page
    window.location.reload();
}

const DownloadPDFBtn = ({ isLoggedIn }) => {


    // if user is logged in, show button with onCreatePDF
    if (isLoggedIn) {
        return (
            <button onClick={onCreatePDF}
                className="group hover:border hover:text-amber-200 text-sm px-3 py-1 rounded-md font-semibold">
                <span className='hidden group-hover:inline group-hover:animate-spin'>
                    <Download />
                </span>
                Download
            </button>
        )
    }

    else {
        // show modal to prompt user to login
        return (
            <>
                <label htmlFor="enquire-modal"
                    className="group hover:border hover:text-amber-200 text-sm px-3 py-1 rounded-md font-semibold hover:cursor-pointer">
                    <span className='hidden group-hover:inline'>
                        <Download />
                    </span>
                    Download
                </label>
            </>
        )
    }

}

export const Navbar = ({ pdfBtn }) => {

    // isLoggedIn contains the token we can use in our fetch calls
    const { isLoggedIn } = useContext(AppContext);

    return (
        <div className="navbar ">
            <div className="flex-1">
                <Link href="/" className="btn btn-ghost normal-case text-xl dark:text-info">Collective</Link>
            </div>
            <div className="flex-none">
                {/* pdfBtn */}
                <div className="hidden md:block ">
                    <div className="ml-10 flex items-baseline space-x-4">
                        {pdfBtn && <DownloadPDFBtn isLoggedIn={isLoggedIn} />}
                    </div>
                </div>
                {/* end pdfBtn */}
                <div className="tooltip tooltip-bottom" data-tip="Join our Discord">
                    <Link href="https://discord.gg/TAnZMmNS4X" className="btn btn-circle btn-ghost" target="_blank"
                        rel="noopener noreferrer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-discord" viewBox="0 0 16 16">
                            <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z" />
                        </svg>
                    </Link>
                </div>
                {isLoggedIn.user && 
                    <div className="tooltip tooltip-bottom" data-tip="Add a Project">
                        <Link href="/edit#project">
                            <label className="btn btn-circle btn-ghost">
                                <Image src="/tools.png" alt="maker tools" width={20} height={20} />
                            </label>
                        </Link>
                    </div>
                }
                <ThemeToggle />
                {isLoggedIn ?
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full ring ring-primary dark:ring-info ring-offset-base-100 ring-offset-2">
                                <Image src={
                                    isLoggedIn.avatarUrl
                                } alt="avatar" width={40} height={40} />
                            </div>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-amber-900 dark:bg-info bg-opacity-90 dark:bg-opacity-80 rounded-box w-52">
                            {
                                isLoggedIn.user?.s_preferred_handle &&
                                <li>
                                    <Link href={`/p/${isLoggedIn.user.s_preferred_handle}`}>
                                        Developer Profile
                                    </Link>
                                </li>
                            }
                            <li>
                                <Link href="/edit" className="justify-between">
                                    Profile Editor
                                    <span className="badge">New</span>
                                </Link>
                            </li>
                            <li>
                                <span onClick={signOutFromSupabase} className="justify-between">
                                    Logout
                                </span>
                            </li>
                        </ul>
                    </div>
                    : <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                            </svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-amber-900 dark:bg-info bg-opacity-90 dark:bg-opacity-80 rounded-box w-52">
                            <li className="menu-title">
                                <span>Create an Account</span>
                            </li>
                            <li>
                                <span onClick={() => signInWithGitHub()}>
                                    <Image src="/techicons/github_inv.png" alt="LinkedIn Logo" width={24} height={24} />Login with GitHub
                                </span>
                            </li>
                            <li>
                                <span onClick={() => signInWithLinkedIn()}>
                                    <Image src="/techicons/linkedin_inv.png" alt="LinkedIn Logo" width={20} height={20} />Login with LinkedIn
                                </span>
                            </li>
                        </ul>
                    </div>
                }
            </div>
        </div>
    )
}