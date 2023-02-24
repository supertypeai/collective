import Head from 'next/head'
import Home from '@/icons/Home'

import { MeContext } from '@/contexts/MeContext';
import Link from 'next/link';

export const Mainframe = ({ children, data }) => {

  return (
    <MeContext.Provider value={data}>

      <Head>
        <title>{data.fullname} on Supertype Collective</title>
        <meta name="description" content={`${data.fullname} (${data.short}) | ${data.affiliations.length > 0 && data.affiliations[0]['title'] + ' ' + data.affiliations[0]['position']} | Supertype Collective`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon-32x32.png" />
      </Head>
      {/* <!-- Navbar content --> */}
      <nav className="bg-gradient-to-r backdrop-blur-lg from-amber-700 to-rose-900 shadow-lg opacity-80">


        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link href="/" className='hover:text-rose-100 hover:background-white-100'>
                  <Home className="h-8 w-8 text-white" /> &nbsp; <span className="font-bold">Collective</span>
                </Link>
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

      {/* <!-- Main content --> */}
      <main className={`max-w-7xl mx-auto gap-4 backdrop-blur-lg rounded drop-shadow-lg my-12 break-words bg-gradient-to-r from-amber-700 to-rose-900 mb-6 shadow-xl rounded-lg`} >
        <div className="grid grid-cols-12 items-center grid-flow gap-4 bg-black bg-opacity-30 rounded-lg px-4 lg:px-8">
          {children}
          <div className="footer col-span-12 rounded-lg border bg-opacity-30 bg-gray-200 p-6">
            {/* <!-- Footer content --> */}


          </div>
        </div>
      </main >
    </MeContext.Provider>
  );
};

