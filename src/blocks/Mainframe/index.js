import { useState, useEffect } from 'react';
import Head from 'next/head'
import { supabase } from "@/lib/supabaseClient";

import { Navbar } from './Navbar';
import Footer from './Footer';
import { MeContext } from '@/contexts/MeContext';
import { AppContext } from '@/contexts/AppContext';
import Link from 'next/link';
import X from '@/icons/X';



const PageHead = ({ data, title }) => {

  if (data) {
    // this is for all profile pages
    return (
      <>
        <title>{`${data.fullname} on Supertype Collective`}</title>
        <meta name="description" content={`${data.fullname} (${data.short}) | ${data.affiliations.length > 0 && data.affiliations[0]['title'] + ' ' + data.affiliations[0]['position']} | Supertype Collective`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* this is for image appearing on opengraph when shared on social media */}
        <meta property="og:image" content={data.gh.avatar_url || data.avatar_url} />
        <meta property="og:title" content={`${data.fullname} on Supertype Collective`} />
        <meta property="og:description" content={`${data.fullname} (${data.short}) | ${data.affiliations.length > 0 && data.affiliations[0]['title'] + ' ' + data.affiliations[0]['position']} | Supertype Collective`} />
        <meta property="og:site_name" content="Supertype Collective" />

        <link rel="icon" href="/favicon-32x32.png" />
      </>
    )
  }
  else {
    const siteDescription = "Supertype Collective is a community of analytics developers, data scientists &#38; engineering leaders building products across the full stack."
    return (
      <>
        <title>{`${title}` || `Supertype Collective`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={siteDescription} />

        <meta property="og:image" content="/assets/header.png" />
        <meta property="og:title" content={title || `Supertype Collective`} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:site_name" content="Supertype Collective" />

        <link rel="icon" href="/favicon-32x32.png" />
      </>
    )
  }
}

const MeContextWrapper = ({ children, data }) => {
  return (
    <MeContext.Provider value={data}>
      {children}
    </MeContext.Provider>
  )
}

const AppContextWrapper = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  // const [isDarkMode, setIsDarkMode] = useState(false)
  useEffect(() => {

    async function checkUser() {
      const { data } = await supabase.auth.getSession()
      console.log("supabase data", data)
      if (data.session) {
        setIsLoggedIn(data ? {
          githubToken: data.session.access_token,
          githubUser: data.session.user
        } : false)
      }
    }
    checkUser()
  }, [])

  return (
    <AppContext.Provider value={{ isLoggedIn: isLoggedIn }}>
      {children}
    </AppContext.Provider>
  )
}


export const Mainframe = ({ children, data, title }) => {

  const [createProfileCTA, setCreateProfileCTA] = useState(true)

  if (data) {
    return (
      <MeContextWrapper data={data}>
        <AppContextWrapper>
          <Head>
            <PageHead data={data} />
          </Head>
          <Navbar pdfBtn={true} />
          {/* <!-- Main content --> */}
          <main className={`max-w-7xl mx-auto gap-4 backdrop-blur-lg drop-shadow-lg my-12 break-words bg-gradient-to-r from-amber-700 to-rose-900 mb-6 shadow-xl rounded-lg`} id="mainframe">
            {
              createProfileCTA && (
                <h4 className='text-right text-xs mx-4 font-medium'>
                  <X onClick={() => setCreateProfileCTA(false)} /> &nbsp;
                  Create a <Link
                    href="/enroll"
                    className="link link-info hover:opacity-70"
                  >Developer Profile</Link> like this in 3 mins!
                </h4>
              )
            }
            <div className="grid grid-cols-12 items-center grid-flow gap-4 bg-black bg-opacity-30 rounded-lg px-2 sm:px-4 lg:px-8 rounded-b-none">
              {children}
            </div>
          </main >
          <Footer />
        </AppContextWrapper>
      </MeContextWrapper>
    )
  } else {
    return (
      <AppContextWrapper>
        <Head>
          <PageHead title={title} />
        </Head>
        <Navbar />
        {/* <!-- Main content --> */}
        <main className={`max-w-7xl mx-auto gap-4 backdrop-blur-lg drop-shadow-lg my-12 break-words bg-gradient-to-r from-amber-700 to-rose-900 mb-6 shadow-xl rounded-lg`} id="mainframe">
          <div className="grid grid-cols-12 items-center grid-flow gap-4 bg-black bg-opacity-30 rounded-lg px-2 sm:px-4 lg:px-8 rounded-b-none">
            <div className="col-span-12 text-white mt-8">
              {children}
            </div>
          </div>
        </main >
        <Footer />
      </AppContextWrapper>
    )
  }
};

