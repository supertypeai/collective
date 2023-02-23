import { timeAgo, parseUrlString, decodeHtml } from "wordpress-posts-react";
import { useEffect, useState } from "react";

const WordPressBlogroll = ({ wp_data }) => {

    const [feed, setFeed] = useState(wp_data);

    useEffect(() => {
        if (wp_data) {
            const posts = wp_data.map((post) => {
                const { title, link, date, excerpt } = post;
                return {
                    id: post.id,
                    title: decodeHtml(title.rendered),
                    link: parseUrlString(link),
                    date: timeAgo(new Date(post.date).getTime()),
                    excerpt: decodeHtml(excerpt.rendered),
                };
            });
            setFeed(posts);
        }
    }, [wp_data]);

    // return JSON.stringify(feed)

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
