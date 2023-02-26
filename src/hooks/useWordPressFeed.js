import { useEffect, useState } from 'react'

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

const parseUrlString = (url) => {
    return url.replace(/\\/g, '')
}

const decodeHtml = (html) => {
    let txt = document.createElement("textarea");
    txt.innerHTML = html;
    // remove html tags like <p> etc
    txt.value = txt.value.replace(/<\/?[^>]+(>|$)/g, "");
    return txt.value;
}

export default function useWordPressFeed(site_url, author_id, number_of_posts = 10) {
    // Usage:
    // import useWordPressFeed from '../hooks/useWordPressFeed'
    //
    // const { feed, loading } = useWordPressFeed()
    //

    const [feed, setFeed] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchFeed(site_url, author_id, number_of_posts) {
            if (!site_url) {
                return Promise.reject('site_url is required')
            }

            const url = `${site_url}/wp-json/wp/v2/posts?per_page=${number_of_posts}` +
                (author_id ? `&author=${author_id}` : '')

            await fetch(url)
                .then(
                    response => {
                        if (response.ok) {
                            return response.json();
                        } else {
                            let error = new Error('Error ' + response.status + ': ' + response.statusText);
                            error.response = response;
                            throw error;
                        }
                    }
                )
                .then(posts => {
                    return posts.map(post => {
                        return {
                            title: decodeHtml(post.title.rendered),
                            // processed link: https:\/\/supertype.ai\/p\/samuel\/ -> https://supertype.ai/p/samuel/
                            link: parseUrlString(post.link),
                            slug: post.slug,
                            date: timeAgo(new Date(post.date).getTime()),
                            excerpt: decodeHtml(post.excerpt.rendered),
                            content: post.content.rendered,
                        }
                    })
                })
                .then(posts => {
                    setFeed(posts)
                    setLoading(false)
                })
                .catch(error => {
                    alert('Your posts could not be fetched from the specified address.\nError: ' + error.message);
                });
        }

        fetchFeed(site_url, author_id, number_of_posts)

    }, [site_url, author_id, number_of_posts])

    return { feed, loading }
}
