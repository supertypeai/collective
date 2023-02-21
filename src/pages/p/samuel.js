import { useEffect, useState } from 'react'

import Link from 'next/link'
import Image from 'next/image'

import styles from '@/styles/Home.module.css'
import Home from '@/icons/Home'


const timeAgo = (date) => {
    const diff = Number(new Date()) - date;
    const minute = 60 * 1000;
    const hour = minute * 60;
    const day = hour * 24;
    const week = day * 7;
    const month = day * 30;
    const year = day * 365;
    switch (true) {
        case diff < minute:
            return 'just now';
        case diff < hour:
            return `${Math.floor(diff / minute)} minutes ago`;
        case diff < day:
            return `${Math.floor(diff / hour)} hours ago`;
        case diff < 2 * week:
            return Math.round(diff / day) + ' days ago';
        case diff < 3 * month:
            return Math.round(diff / week) + ' weeks ago';
        case diff < 2 * year:
            return Math.round(diff / month) + ' months ago';
        case diff > 2 * year:
            return Math.round(diff / year) + ' years ago';
        default:
            return ""
    }
}

const parse_url_string = (url) => {
    return url.replace(/\\/g, '')
}

const decodeHtml = (html) => {
    let txt = document.createElement("textarea");
    txt.innerHTML = html;
    // remove html tags like <p> etc
    txt.value = txt.value.replace(/<\/?[^>]+(>|$)/g, "");
    return txt.value;
}


const feed_from_wordpress = async (site_url, author_id, page_limit = 10) => {

    if (!site_url) {
        return Promise.reject('site_url is required')
    }


    const url = `${site_url}/wp-json/wp/v2/posts?per_page=${page_limit}` +
        (author_id ? `&author=${author_id}` : '')
    console.log(url)

    // if(author_id){
    //     url = `${site_url}/wp-json/wp/v2/posts?author=${author_id}&per_page=${page_limit || 10}`
    // }else{
    //     url = `${site_url}/wp-json/wp/v2/posts?per_page=${page_limit || 10}`
    // }

    const res = await fetch(url)
    const posts = await res.json()
    return posts.map(post => {
        return {
            title: decodeHtml(post.title.rendered),
            // processed link: https:\/\/supertype.ai\/p\/samuel\/ -> https://supertype.ai/p/samuel/
            link: parse_url_string(post.link),
            slug: post.slug,
            date: timeAgo(new Date(post.date).getTime()),
            excerpt: decodeHtml(post.excerpt.rendered),
            content: post.content.rendered,
            author: post.author
        }
    })
}


const Samuel = () => {

    const [feedRoll, setFeedRoll] = useState([])

    useEffect(() => {
        // ('https://supertype.ai', null, 3) gets you the latest 3 posts from the site
        feed_from_wordpress('https://supertype.ai', 1)
            .then(posts => {
                setFeedRoll(posts)
            })
    }, [])


    return (
        <main className={styles.main}>
            <div className={styles.description} style={{ margin: '1rem 0', top: '-120px', position: 'relative' }}>
                <p>
                    <Link href="/">
                        <Home /> Back to homepage
                    </Link>
                </p>
                <div>
                    <a
                        href="https://supertype.ai"
                        target="_blank"
                        rel="noreferrer noopener"
                    >
                        by{' '}
                        <Image
                            src="/supertype.svg"
                            alt="Supertype Logo"
                            // className={styles.SupertypeLogo}
                            width={100}
                            height={100}
                            priority
                        />
                    </a>
                </div>
            </div>

            <div className={styles.center}>

                <section className="relative pt-16">
                    <div className="container mx-auto px-4">
                        <div className="relative backdrop-blur-lg rounded drop-shadow-lg flex flex-col min-w-0 break-words bg-gradient-to-r from-amber-700 to-rose-900 w-full mb-6 shadow-xl rounded-lg -mt-64">
                            <div className="px-6 bg-black bg-opacity-30 rounded rounded-lg">
                                <div className="flex flex-wrap justify-center">
                                    <div className="w-full lg:w-2/12 lg:order-2 flex justify-center mt-8">
                                        <Image src="/photos/samuel.png" alt="samuel supertype" className="mt-8" width={200} height={200} priority />
                                    </div>
                                    <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right">
                                        <div className="py-6 px-3 mt-4 sm:mt-0 grid justify-items-center lg:justify-items-end">
                                            <button type="button"
                                                className="bg-rose-900 hover:bg-rose-700 active:bg-pink-600 cursor-pointer uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150">
                                                Connect
                                            </button>
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4 lg:order-1">
                                        <div className="flex justify-center md:justify-start py-8 lg:pt-4">
                                            <div className="mr-4 p-1 text-center">
                                                <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">22</span>
                                                <div className="text-xs">GitHub Stars</div>
                                            </div>
                                            <div className="mr-4 p-1 text-center">
                                                <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">10</span>
                                                <div className="text-xs">Fellowship Badges</div>
                                            </div>
                                            <div className="lg:mr-4 p-1 text-center">
                                                <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">{feedRoll.length}</span>
                                                <div className="text-xs">Articles</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center -mt-6">
                                    <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                                        Samuel Chan
                                    </h3>
                                    <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                                        <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                                        Bogor, Indonesia
                                    </div>
                                    <div className="mb-2 text-blueGray-600 mt-10 text-sm">
                                        MLOps, Full Stack Development, Data Science, Analytics Engineering
                                    </div>
                                    <div className="mb-2">

                                        <span className="text-slate-400">
                                            Supertype
                                        </span>
                                        &nbsp; and &nbsp;
                                        <span className="text-slate-400">
                                            Algoritma
                                        </span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-5 gap-4 mt-10">
                                    <div className="col-span-5 lg:col-span-2">
                                        <h3 className="text-lg semibold">Expertise</h3>
                                        <div className="mt-4">
                                            {feedRoll.map(post => (
                                                <div className="mb-4" key={post.id}>
                                                    <h4 className="text-sm font-semibold link">
                                                        <Link href={post.link} rel="noopener noreferrer">
                                                            <h4>{post.title}</h4>
                                                        </Link>
                                                    </h4>
                                                    <p className="text-xs text-slate-300">
                                                        {post.date}
                                                    </p>
                                                    <p className="text-sm text-slate-300">
                                                        {post.excerpt}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="col-span-5 lg:col-span-3">
                                        <h3 className="text-lg semibold">Feed</h3>
                                        <p className="mb-4 text-slate-300">
                                            Samuel is the co-founder of Supertype and has been building world-class software and analytics
                                            teams since 2014.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div >

        </main >
    )
}

export default Samuel