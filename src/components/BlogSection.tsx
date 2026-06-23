import type { BlogPost } from "../lib/config";

type Props = {
  title: string;
  viewAllLabel: string;
  viewAllHref: string;
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

export default function BlogSection({ posts }: Props) {
  const featuredPosts = posts.slice(0, 4);
  const mobilePosts = posts.slice(0, 2);

  return (
    <section className="page-screen page-screen-blog" id="blog">
      <div className="blog-backdrop-word" aria-hidden="true">BLOG</div>
      <div className="blog-page">
        <div className="blog-grid">
          {featuredPosts.map((post, index) => (
            <a
              key={post.link}
              className={`blog-card blog-card--post blog-card--${index + 1}`}
              href={post.link}
              target="_blank"
              rel="noreferrer"
            >
              {post.image && (
                <div className="blog-card-image">
                  <img
                    src={post.image}
                    alt=""
                    loading={index < 2 ? "eager" : "lazy"}
                    fetchPriority={index < 2 ? "high" : "auto"}
                    decoding="async"
                  />
                </div>
              )}
              <div className="blog-card-body">
                <div className="blog-card-date">{formatDate(post.date)}</div>
                <h3 className="blog-card-title">{post.title}</h3>
              </div>
            </a>
          ))}
        </div>

        <div className="blog-mobile-list" aria-label="Latest blog posts">
          {mobilePosts.map((post, index) => (
            <a
              key={`mobile-${post.link}`}
              className="blog-mobile-card"
              href={post.link}
              target="_blank"
              rel="noreferrer"
            >
              {post.image && (
                <img
                  className="blog-mobile-card-image"
                  src={post.image}
                  alt=""
                  width={640}
                  height={395}
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "auto"}
                  decoding="async"
                />
              )}
              <span className="blog-mobile-card-copy">
                <span className="blog-mobile-card-date">{formatDate(post.date)}</span>
                <span className="blog-mobile-card-title">{post.title}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
