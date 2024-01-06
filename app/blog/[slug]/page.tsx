import { getBlogPosts } from "@/app/blog/blog";
import { notFound } from 'next/navigation';

export default async function Blog({ params }: { params: {slug: string }}) {
    let posts = await getBlogPosts()
    let post = posts.find((post) => post.slug === params.slug);
  
    if (!post) {
      notFound();
    }
  
    return (
      <section>
        <h1 className="title font-medium text-2xl tracking-tighter max-w-[650px]">
          {post.frontmatter.title}
        </h1>
        <div className="flex justify-between items-center mt-2 mb-8 text-sm max-w-[650px]">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {`${post.frontmatter.publishedAt}`}
          </p>
        </div>
        <article className="prose prose-quoteless prose-neutral dark:prose-invert">
          { post.content }
        </article>
      </section>
    );
  }
