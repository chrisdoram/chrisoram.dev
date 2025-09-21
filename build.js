#!/usr/bin/env bun
import { marked } from 'marked'
import { glow } from 'nue-glow'
import { readFile, readdir, mkdir, stat } from "node:fs/promises"
import { basename, extname, join } from "node:path"

const POSTS_DIR = "posts"
const TEMPLATE_FILE = "post.html"
const OUT_DIR = "dist"
const SLOT_REGEX = /<slot\s*\/>/

// setup a custom renderer for code blocks
const renderer = {
  code({ text, lang }) {
    const html = glow(text, { language: lang, numbered: true })
    return `<pre>${ html }</pre>`
  } 
}
marked.use({renderer})

async function main() {
  const template = await readFile(TEMPLATE_FILE, "utf8")
  const posts = await listMarkdownFiles(POSTS_DIR)
  
  if (posts.length == 0) {
    console.log(`Found no markdown files when processing ${POSTS_DIR}/`)
    return
  }

  for (const post of posts) {
    await buildPost({ post, template })
  }
}

async function listMarkdownFiles(dir) {
  const files = await readdir(dir);
  return files.filter(file => file.endsWith(".md")).map((markdownFile => join(dir, markdownFile)))
}

async function buildPost({ post, template }) {
  const postMarkdown = await readFile(post, "utf8")
  const postHTML = marked.parse(postMarkdown)
  const finalHTML = template.replace(SLOT_REGEX, postHTML)
  const slug = basename(post, extname(post))
  const outDir = join(OUT_DIR, slug)
  const outFile = join(outDir, "index.html")
  await mkdir(outDir, { recursive: true })
  await Bun.write(outFile, finalHTML)
  const {size} = await stat(outFile);
  console.log(`✓ ${post} -> ${outFile} (${size} bytes)`)
}

main()