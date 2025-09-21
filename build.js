#!/usr/bin/env bun
import { marked } from "marked"
import { glow } from "nue-glow"
import { readFile, readdir, stat } from "node:fs/promises"
import { basename, extname, join } from "node:path"
import YAML from "yaml"

const POSTS_DIR = "posts"
const OUT_DIR = "dist"
const TEMPLATE_FILE = "post.html"
const SLOT_RE = /<slot\s*\/>/
const PLACEHOLDER_RE = /{{\s*([a-zA-Z0-9_.-]+)\s*}}/g

// global template string
const template = await readFile(TEMPLATE_FILE, "utf8")

function extractFrontMatter(markdown) {
  const end = markdown.indexOf("\n---")
  const fm = markdown.slice(3, end + 1).trim()
  const body = markdown.slice(end + 4).trimStart()
  return {fm, body}
}

function preprocess(markdown) {
  const { fm, body } = extractFrontMatter(markdown)
  marked.__post_metadata = YAML.parse(fm)
  return body
}

function postprocess(html) {
  let fullHTML = template.replace(SLOT_RE, html)
  return fullHTML.replace(PLACEHOLDER_RE, (_, key) => {
    return marked.__post_metadata[key]
  })
}

const renderer = {
  code({ text, lang }) {
    const html = glow(text, { language: lang, numbered: true })
    return `<pre>${html}</pre>`
  },
}

// global marked instance
marked.use({ renderer, hooks: { preprocess, postprocess } })


for (const post of await readdir(POSTS_DIR)) {
  const postMarkdown = await readFile(join(POSTS_DIR, post), "utf8")
  const outFile = join(OUT_DIR, basename(post, extname(post)), "index.html")
  await Bun.write(outFile, marked.parse(postMarkdown))
  
  const { size } = await stat(outFile)
  console.log(`✓ ${post} -> ${outFile} (${size} bytes)`)
}
