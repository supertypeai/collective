import { useContext } from 'react';
import Link from 'next/link'
import Image from 'next/image';
import { supabase } from "@/lib/supabaseClient";
import Home from '@/icons/Home'
import Download from '@/icons/Download';
import { AppContext } from "@/contexts/AppContext";
import ThemeToggle from '@/components/ThemeToggle';

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
        <Link href="/" className='hover:opacity-60 hover:background-white-100 drop-shadow'>
            <Home className="h-8 w-8" /> &nbsp; <span className="font-bold">Collective</span>
        </Link>
    )
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
        <nav className="bg-gradient-to-r to-rose-500 from-amber-500 dark:bg-none dark:bg-black dark:text-white text-black backdrop-blur-lg shadow-lg opacity-80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-14">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <LinkToHome />
                        </div>
                    </div>
                    <div className="flex items-center">
                        {/* pdfBtn */}
                        <div className="hidden md:block ">
                            <div className="ml-10 flex items-baseline space-x-4">
                                {pdfBtn && <DownloadPDFBtn isLoggedIn={isLoggedIn} />}
                                {
                                    isLoggedIn ?
                                        <button
                                            className="group hover:border-2 hover:text-amber-200 hover:border-amber-200 text-sm px-3 py-1 rounded-md text-sm font-semibold">
                                            Profile
                                        </button>
                                        :
                                        <button onClick={() => signInWithGitHub()}
                                            className="group hover:border hover:text-rose-200 px-3 py-1 rounded-md text-sm hover:bg-secondary font-semibold">
                                            <Image src="/techicons/github_inv.png" alt="GitHub Logo" width={20} height={20} className="inline mr-2" />
                                            Login with GitHub
                                        </button>
                                }
                            </div>
                        </div>
                        {/* end pdfBtn */}
                        {/* theme switcher */}
                        <div>
                            <ThemeToggle />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}