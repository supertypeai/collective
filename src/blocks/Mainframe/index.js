import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { supabase } from "@/lib/supabaseClient";
import { QueryClient } from '@tanstack/react-query';

import { Navbar } from './Navbar';
import Footer from './Footer';
import X from '@/icons/X';
import { MeContext } from '@/contexts/MeContext';
import { AppContext } from '@/contexts/AppContext';

const PageHead = ({ data, title }) => {

  if (data) {
    // this is for all profile pages
    return (
      <Head>
        <title>{`${data.fullname} on Supertype Collective`}</title>
        <meta name="description" content={`${data.fullname} (${data.short}) | ${data.affiliations.length > 0 && data.affiliations[0]['title'] + ' ' + data.affiliations[0]['position']} | Supertype Collective`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* this is for image appearing on opengraph when shared on social media */}
        <meta property="og:image" content={data.superinference.profile.avatar_url} />
        <meta property="og:title" content={`${data.fullname} on Supertype Collective`} />
        <meta property="og:description" content={`${data.fullname} (${data.short}) | ${data.affiliations.length > 0 && data.affiliations[0]['title'] + ' ' + data.affiliations[0]['position']} | Supertype Collective`} />
        <meta property="og:site_name" content="Supertype Collective" />

        <link rel="icon" href="/favicon-32x32.png" />
      </Head>
    )
  }
  else {
    const siteDescription = "Supertype Collective is a community of analytics developers, data scientists &#38; engineering leaders building products across the full stack."
    return (
      <Head>
        <title>{title || `Supertype Collective`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={siteDescription} />

        <meta property="og:image" content="/collective_promo.png" />
        <meta property="og:title" content={title || `Supertype Collective`} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:site_name" content="Supertype Collective" />

        <link rel="icon" href="/favicon-32x32.png" />
      </Head>
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

const fetchData = async (userID) => {
  const queryClient = new QueryClient();
  const data = await queryClient.fetchQuery(['profileData', userID], async () => {
    const { data, error } = await supabase
      .from('profile')
      .select()
      .eq('auth_uuid', userID)
      .single();

    if (!data) {
      throw new Error('No such user in the database');
    }

    if (error) {
      console.log(error);
      throw new Error(error, 'Error fetching this user');
    }

    if (data && data['wp_blog_root_url'] && data['wp_blog_author_id']) {
      let url = '';
      // check if this root url is numeric or not

      if (!data['wp_blog_root_url'].includes('.')) {
        url = `https://public-api.wordpress.com/rest/v1.1/sites/${data['wp_blog_root_url']}/posts?author=${data['wp_blog_author_id']}&number=5&fields=id,link,title,date,excerpt`
        const res_wp = await fetch(url)
        const wp_data = await res_wp.json();
        data['wp'] = wp_data['posts']
      } else {
        url = `${data['wp_blog_root_url']}/wp-json/wp/v2/posts?per_page=5&&author=${data['wp_blog_author_id']}&_fields=id,link,title,date,excerpt`
        const res_wp = await fetch(url)
        const wp_data = await res_wp.json();
        data['wp'] = wp_data
      }
    }
    return data;
  },
    {
      staleTime: 1000 * 60 * 60 * 24, // 24 hours
      retry: false, // Disable retries on error
    }
  );

  return data;
};

const AppContextWrapper = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(() => {

    async function checkUser() {
      const { data } = await supabase.auth.getSession()
      console.log("supabase data", data)

      if (data.session) {
        const tokenProvider = `${data.session.user.app_metadata.provider}Token`
        const tokenUser = `${data.session.user.app_metadata.provider}User`
        let user;
        try {
          user = await fetchData(data.session.user.id);
        } catch (error) {
          console.log(error);
        }

        setIsLoggedIn(data ? {
          ...isLoggedIn,
          [tokenProvider]: data.session.access_token,
          [tokenUser]: data.session.user,
          providerToken: data.session.provider_token
        } : false)

        // check if the slack notification has already been sent
        const notificationSent = localStorage.getItem('slackNotificationSent');

        if (new Date() - new Date(data.session.user.created_at) <= 10000 && !notificationSent) {
          fetch("/api/slackNotification", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              message: `A new user has signed up! Email: ${data.session.user.email}`
            })
          })
            .then((res) => {
              return res.json()
            })

          localStorage.setItem('slackNotificationSent', 'true');
        }
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


export const Mainframe = ({ data, title, children, dehydratedState }) => {

  const [createProfileCTA, setCreateProfileCTA] = useState(true)

  if (data) {
    return (
      <>
        <MeContextWrapper data={data}>
          <AppContextWrapper>
            <PageHead data={data} />
            <Navbar pdfBtn={true} />
            {/* <!-- Main content --> */}
            <main className={`max-w-7xl mx-auto gap-4 backdrop-blur-lg drop-shadow-lg my-12 break-words 
              bg-gradient-to-r from-amber-700 to-rose-900 dark:bg-none dark:bg-black mb-6 shadow-xl rounded-lg`} id="mainframe">
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
              {children}
            </main >
            <Footer />
          </AppContextWrapper>
        </MeContextWrapper>
      </>
    )
  } else {
    return (
      <>
        <AppContextWrapper>
          <PageHead title={title} />
          <Navbar />
          {/* <!-- Main content --> */}
          <main className={`max-w-7xl mx-auto gap-4 backdrop-blur-lg drop-shadow-lg my-12 break-words 
              bg-gradient-to-r from-amber-700 to-rose-900 dark:bg-none dark:bg-black mb-6 shadow-xl rounded-lg`} id="mainframe">
            <div className="grid grid-cols-12 items-center grid-flow gap-4 bg-black bg-opacity-30 rounded-lg px-2 sm:px-4 lg:px-8 rounded-b-none">
              <div className="col-span-12 text-white mt-8">
                {children}
              </div>
            </div>
          </main >
          <Footer />
        </AppContextWrapper>
      </>
    )
  }
};

