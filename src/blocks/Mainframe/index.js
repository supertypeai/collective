import Head from 'next/head'

import { MeContext } from '@/contexts/MeContext';

import { Navbar } from './Navbar';
import Footer from './Footer';

export const Mainframe = ({ children, data }) => {

  return (
    <MeContext.Provider value={data}>

      <Head>
        <title>{`${data.fullname} on Supertype Collective`}</title>
        <meta name="description" content={`${data.fullname} (${data.short}) | ${data.affiliations.length > 0 && data.affiliations[0]['title'] + ' ' + data.affiliations[0]['position']} | Supertype Collective`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* this is for image appearing on opengraph when shared on social media */}
        <meta property="og:image" content={data.gh.avatar_url || data.avatar_url} />
        <meta property="og:title" content={`${data.fullname} on Supertype Collective`} />
        <meta property="og:description" content={`${data.fullname} (${data.short}) | ${data.affiliations.length > 0 && data.affiliations[0]['title'] + ' ' + data.affiliations[0]['position']} | Supertype Collective`} />
        <meta property="og:site_name" content="Supertype Collective" />

        <link rel="icon" href="/favicon-32x32.png" />
      </Head>
      <Navbar pdfBtn={true} />

      {/* <!-- Main content --> */}
      <main className={`max-w-7xl mx-auto gap-4 backdrop-blur-lg drop-shadow-lg my-12 break-words bg-gradient-to-r from-amber-700 to-rose-900 mb-6 shadow-xl rounded-lg`} id="mainframe">
        <div className="grid grid-cols-12 items-center grid-flow gap-4 bg-black bg-opacity-30 rounded-lg px-2 sm:px-4 lg:px-8 rounded-b-none">
          {children}
        </div>
      </main >
      <Footer />
    </MeContext.Provider>
  );
};

