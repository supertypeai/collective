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

    // const pdf = await html2pdf().from(document.body).toPdf().get('pdf');
    // pdf.save();
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
        <Link href="/" className='hover:opacity-60 hover:text-amber-900 hover:opacity-100 dark:hover:text-amber-200'>
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
                className="group hover:border hover:text-amber-200 text-sm px-3 py-1 rounded-md text-sm font-semibold">
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
                {/* <label onClick={onCreateScreenshot} className="group hover:border hover:text-amber-200 text-sm px-3 py-1 rounded-md text-sm font-semibold hover:cursor-pointer"> */}
                <label htmlFor="enquire-modal"
                    className="group hover:border hover:text-amber-200 text-sm px-3 py-1 rounded-md text-sm font-semibold hover:cursor-pointer">
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

    const { isLoggedIn } = useContext(AppContext);
    // isLoggedIn contains the token we can use in our fetch calls
    console.log("isloggedin", isLoggedIn)

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
                            <li>
                                <Link href={`/p/${isLoggedIn.user.s_preferred_handle}`}>
                                    Developer Profile
                                </Link>
                            </li>
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

                        {/* <button onClick={() => signInWithLinkedIn()}
                                className="btn btn-ghost btn-circle">
                                <Image src="/techicons/linkedin_inv.png" alt="LinkedIn Logo" width={25} height={25} />
                            </button> */}
                    </div>
                }
            </div>
        </div>
    )
}