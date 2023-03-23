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
                    title: title.rendered ? decodeHtml(title.rendered) : decodeHtml(title),
                    link: link ? parseUrlString(link) : parseUrlString(post['URL']),
                    date: timeAgo(new Date(date).getTime()),
                    excerpt: excerpt.rendered ? decodeHtml(excerpt.rendered) : decodeHtml(excerpt),
                };
            });
            setFeed(posts);
        }
    }, [wp_data]);

    // return JSON.stringify(feed)

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

const WpArticles = ({ wp_data }) => {
    return (
        <div>
            <h3 className="text-lg uppercase font-semibold leading-normal mb-2 my-4">Articles</h3>
            <WordPressBlogroll wp_data={wp_data} />
        </div>
    )
}

export default WpArticles