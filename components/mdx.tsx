import { compileMDX, MDXRemoteProps } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

// define custom MDX components here
// type will become Omit<MDXRemoteProps, "options" | "components">
// or simply source: VFileCompatible

export function customCompileMDX(props: Omit<MDXRemoteProps, "options">) {
  return compileMDX<{ title: string, publishedAt: Date }>({
    options: {
      mdxOptions: {
        rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
      },
      parseFrontmatter: true,
    },
    ...props,
  });
}
