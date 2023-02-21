import Link from "next/link";

const WordPressBlogroll = ({ feed }) => {
  return feed.map((post) => (
    <div className="mb-4" key={post.id}>
      <h4 className="text-sm font-semibold link">
        <Link href={post.link} target="_blank" rel="noreferrer noopener">
          <h4>{post.title}</h4>
        </Link>
      </h4>
      <p className="text-xs text-slate-300">{post.date}</p>
      <p className="text-sm text-slate-300">{post.excerpt}</p>
    </div>
  ));
};

export default WordPressBlogroll;
