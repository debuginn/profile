import type { BlogPost } from "../lib/config";

type Props = {
  title: string;
  viewAllLabel: string;
  viewAllHref: string;
  fallbackImage: string;
  posts: BlogPost[];
};

function formatDate(iso: string) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y} / ${m} / ${day}`;
}

export default function BlogSection({ title, viewAllLabel, viewAllHref, fallbackImage, posts }: Props) {
  return (
    <section className="page-screen page-screen-blog" id="blog">
      <div className="blog-page">
        <div className="blog-header">
          <h2 className="blog-title">{title}</h2>
          <a className="blog-view-all" href={viewAllHref} target="_blank" rel="noreferrer">
            {viewAllLabel}
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </a>
        </div>

        <div className="blog-grid">
          {posts.map((post) => (
            <a
              key={post.link}
              className="blog-card"
              href={post.link}
              target="_blank"
              rel="noreferrer"
            >
              <div className="blog-card-image">
                <img
                  src={post.image || fallbackImage}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="blog-card-body">
                <div className="blog-card-meta">{formatDate(post.date)}</div>
                <h3 className="blog-card-title">{post.title}</h3>
                <p className="blog-card-excerpt">{post.excerpt}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
