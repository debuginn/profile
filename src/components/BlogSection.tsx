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

export default function BlogSection({ fallbackImage, posts }: Props) {
  const featuredPosts = posts.slice(0, 4);

  return (
    <section className="page-screen page-screen-blog" id="blog">
      <div className="blog-page">
        <div className="blog-backdrop-word" aria-hidden="true">BLOG</div>

        <div className="blog-grid">
          {featuredPosts.map((post, index) => (
            <a
              key={post.link}
              className={`blog-card blog-card--post blog-card--${index + 1}`}
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
                <div className="blog-card-date">{formatDate(post.date)}</div>
                <h3 className="blog-card-title">{post.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
