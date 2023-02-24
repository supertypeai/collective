import Link from 'next/link'
import Home from '@/icons/Home'

export const LinkToHome = () => {
    return (
        <Link href="/" className='hover:text-rose-100 hover:background-white-100 text-rose-200'>
            <Home className="h-8 w-8" /> &nbsp; <span className="font-bold">Collective</span>
        </Link>
    )
}

export const Navbar = () => {
    return (
        <nav className="bg-gradient-to-r backdrop-blur-lg from-amber-700 to-rose-900 shadow-lg opacity-80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-14">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <LinkToHome />
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                {/* <a href="/collective" className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">About</a> */}
                                {/* <a href="/explore" className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Contact</a> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}