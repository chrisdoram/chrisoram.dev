import fs from 'fs';
import path from 'path';
import { customCompileMDX } from '@/components/mdx';

/**
 * Returns an array of all mdx files located in a given directory
 * @param dir - the directory the mdx files are located
 */
function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx');
}

/**
 * Return the slug, frontmatter, and compiled MDX content (HTML) from the given directory
 * @param dir - the directory the mdx files are located
 */
async function getMDXData(dir: string) {
  let mdxFiles = getMDXFiles(dir);
  let promises = mdxFiles.map(async (file) => {
    let fileContent = fs.readFileSync(path.join(dir, file), 'utf-8');
    const { frontmatter, content } = await customCompileMDX({ source: fileContent })
    let slug = path.basename(file, path.extname(file));
    return {
      slug,
      frontmatter,
      content,
    };
  })
  return await Promise.all(promises)
}

/**
 * Return all compiled MDX content (HTML) from the ./content/ directory
 */
export async function getBlogPosts() {
  return await getMDXData(path.join(process.cwd(), 'content'));
}
