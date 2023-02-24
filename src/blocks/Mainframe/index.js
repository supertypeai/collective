import Head from 'next/head'

import { MeContext } from '@/contexts/MeContext';

import { Navbar, LinkToHome } from './Navbar';
import Footer from './Footer';


export const Mainframe = ({ children, data }) => {

  return (
    <MeContext.Provider value={data}>

      <Head>
        <title>{`${data.fullname} on Supertype Collective`}</title>
        <meta name="description" content={`${data.fullname} (${data.short}) | ${data.affiliations.length > 0 && data.affiliations[0]['title'] + ' ' + data.affiliations[0]['position']} | Supertype Collective`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon-32x32.png" />
      </Head>
      <Navbar />

      {/* <!-- Main content --> */}
      <main className={`max-w-7xl mx-auto gap-4 backdrop-blur-lg rounded drop-shadow-lg my-12 break-words bg-gradient-to-r from-amber-700 to-rose-900 mb-6 shadow-xl rounded-lg`} >
        <div className="grid grid-cols-12 items-center grid-flow gap-4 bg-black bg-opacity-30 rounded-lg px-4 lg:px-8 rounded-b-none">
          {children}
        </div>
        <Footer />
      </main >
    </MeContext.Provider>
  );
};

