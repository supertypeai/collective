import Link from 'next/link'
import Home from '@/icons/Home'
import Download from '@/icons/Download';

import { supabase } from "@/lib/supabaseClient";
import Image from 'next/image';

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

async function signInWithGitHub() {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
    })
    if (error) {
        console.log(error);
    }
}

export const LinkToHome = () => {
    return (
        <Link href="/" className='hover:text-rose-100 hover:background-white-100 text-rose-200'>
            <Home className="h-8 w-8" /> &nbsp; <span className="font-bold">Collective</span>
        </Link>
    )
}

const DownloadPDFBtn = () => {
    return (
        <button onClick={onCreatePDF}
            className="text-white group hover:border hover:text-rose-200 text-sm px-3 py-1 rounded-md text-sm">

            <span className='hidden group-hover:inline group-hover:animate-spin'>
                <Download />
            </span>
            Download
        </button>
    )
}

export const Navbar = ({ pdfBtn }) => {
    return (
        <nav className="bg-gradient-to-r backdrop-blur-lg from-amber-700 to-rose-900 shadow-lg opacity-80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-14">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <LinkToHome />
                        </div>


                    </div>
                    <div className="flex items-center">
                        <div className="hidden md:block ">
                            <div className="ml-10 flex items-baseline space-x-4">
                                {pdfBtn && <DownloadPDFBtn />}

                                <button onClick={signInWithGitHub}
                                    className="text-white group hover:border hover:text-rose-200 px-3 py-1 rounded-md text-sm hover:bg-secondary">
                                    <Image src="/techicons/github_inv.png" alt="GitHub Logo" width={20} height={20} className="inline mr-2" />
                                    Login with GitHub
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}