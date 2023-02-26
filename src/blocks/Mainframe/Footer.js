import Link from 'next/link'
import { LinkToHome } from "./Navbar"

const Footer = () => {
    return (
        <div className="col-span-12 bg-black pb-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <LinkToHome />
                        <div className='text-xs w-screen max-w-sm lg:max-w-lg xl:max-w-xl pr-4'>
                            Supertype Collective is a an open source community of analytics developers, data scientists
                            and engineering leaders passionate about solving the region&apos;s most pressing
                            problems with data and engineering. Incubated by &nbsp;
                            <Link href="https://supertype.ai" className="text-rose-200 hover:text-rose-100"
                                target="_blank" rel="noopener noreferrer">
                                Supertype
                            </Link>,
                            a full cycle data science consultancy.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer