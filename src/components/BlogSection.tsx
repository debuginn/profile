import Image from "next/image";
import type { BlogPost } from "../lib/config";

type Props = {
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

  return (
    <section className="page-screen page-screen-blog" id="blog">
      <div className="blog-backdrop-word" aria-hidden="true">
        BLOG
      </div>
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
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 340px, (max-width: 1024px) 380px, 25vw"
                    priority={index < 2}
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
      </div>
    </section>
  );
}
