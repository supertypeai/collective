import { useState, useEffect } from "react"
import Head from "next/head"
import { supabase } from "@/lib/supabaseClient";

import { Navbar } from "./Navbar"
import Footer from "./Footer"
import { AppContext } from "@/contexts/AppContext";

const siteDescription = "Supertype Collective is a community of analytics developers, data scientists &#38; engineering leaders building products across the full stack."

const Pageframe = ({ children, title }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false)

    // check supabase to see if user is logged in
    useEffect(() => {

        async function checkUser() {
            const { data, error } = await supabase.auth.getSession()

            if (data.session) {
                setIsLoggedIn(data ? {
                    githubToken: data.session.provider_token,
                    githubUser: data.session.user
                } : false)
            }
        }
        checkUser()
    }, [])


    return (
        <>
            <Head>
                <title>{title || `Supertype Collective`}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content={siteDescription} />

                <meta property="og:image" content="/assets/header.png" />
                <meta property="og:title" content={title || `Supertype Collective`} />
                <meta property="og:description" content={siteDescription} />
                <meta property="og:site_name" content="Supertype Collective" />

                <link rel="icon" href="/favicon-32x32.png" />
            </Head>

            <AppContext.Provider value={{ isLoggedIn: isLoggedIn }}>
                <Navbar />
                <main className="max-w-7xl mx-auto gap-4 backdrop-blur-lg drop-shadow-lg my-12 break-words bg-gradient-to-r from-amber-700 to-rose-900 mb-6 shadow-xl rounded-lg">
                    <div className="grid grid-cols-12 items-center grid-flow gap-4 bg-black bg-opacity-30 rounded-lg px-2 sm:px-4 lg:px-8 pb-8 rounded-b-none">
                        <div className="col-span-12 text-white mt-8">
                            {children}
                        </div>
                    </div>
                </main>
                <Footer />
            </AppContext.Provider>
        </>
    )
}


export default Pageframe