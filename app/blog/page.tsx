import { getBlogPosts } from "@/app/blog/blog";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "All of my articles where I share guides on software engineering topics.",
};

export default async function BlogPage() {
  let blogPosts = await getBlogPosts();

  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">
        read my blog
      </h1>
      {blogPosts
        .sort((a, b) => {
          if (a.frontmatter.publishedAt > b.frontmatter.publishedAt) {
            return -1;
          }
          return 1;
        })
        .map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col space-y-1 mb-4"
            href={`/blog/${post.slug}`}
          >
            <div className="w-full flex flex-col">
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                {post.frontmatter.title}
              </p>
            </div>
          </Link>
        ))}
    </section>
  );
}
