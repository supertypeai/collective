import Link from 'next/link'
import { LinkToHome } from "./Navbar"
import Image from 'next/image'

const Footer = () => {
    return (
        <div className="col-span-12 bg-black pb-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <LinkToHome />
                        <div className='text-xs w-screen max-w-sm lg:max-w-lg xl:max-w-xl pr-4'>
                            Supertype Collective is a community of analytics developers, data scientists & engineering leaders building products across the full stack.
                            <br />Incubated by &nbsp;
                            <Link href="https://supertype.ai/incubate" className="text-rose-200 hover:text-rose-100"
                                target="_blank" rel="noopener noreferrer">
                                Supertype
                            </Link>,
                            a full cycle data science consultancy.

                            <Link href="https://supertype.ai/incubate" target="_blank" rel="noopener noreferrer">
                                <Image src="/incubated.svg" alt="Incubated by Supertype"
                                    className="max-w-fit inline ml-2 mb-1" width={136} height={20} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer