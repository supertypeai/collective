import { timeAgo, parseUrlString, decodeHtml } from "wordpress-posts-react";
import { useEffect, useState } from "react";

const WordPressBlogroll = ({ wp_data }) => {

    const [feed, setFeed] = useState([]);

    useEffect(() => {
        if (wp_data) {
            const posts = wp_data.map((post) => {
                const { id, title, link, date, excerpt } = post;
                return {
                    id: id,
                    title: decodeHtml(title.rendered),
                    link: link ? parseUrlString(link) : parseUrlString(post['data-permalink']),
                    date: timeAgo(new Date(date).getTime()),
                    excerpt: decodeHtml(excerpt.rendered),
                };
            });
            setFeed(posts);
        }
    }, [wp_data]);


    if (!feed) return (<div>loading...</div>)

    return feed.map((post) => (
        <div style={{ marginBottom: "2rem" }} key={post.id}>
            <h4
                className="text-sm font-semibold"
                style={{ fontWeight: 600, fontSize: "0.875rem", lineHeight: "1.25rem" }}
            >
                <a
                    href={post.link}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="link"
                >
                    <h4 style={{ fontSize: "0.875rem", lineHeight: "1rem" }}>
                        {/* {JSON.stringify(post.title)} */}
                        {post.title}
                    </h4>
                </a>
            </h4>
            <p className="text-xs">{post.date}</p>
            <p style={{ fontSize: "0.875rem", lineHeight: "1.25rem" }}>
                {post.excerpt}
            </p>
        </div>
    ));
};

export default WordPressBlogroll;
