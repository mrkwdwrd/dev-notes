import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { remark } from 'remark'
import html from 'remark-html'

const  postsDir = path.join(process.cwd(), 'src/posts')

export function allSlugs() {
  const filenames = fs.readdirSync(postsDir)
  return filenames.map((filename: string) => {
    return {
      params: {
        slug: filename.replace(/\.md$/, '')
      }
    }
  })
}

export function postsIndex() {
  // get a list of filenames
  const filenames = fs.readdirSync(postsDir)

  return filenames.map((filename: string) => {

    // get file contents
    const fullPath = path.join(postsDir, filename)
    const fileContent = fs.readFileSync(fullPath, 'utf8')

    // parse file data
    const post = matter(fileContent)
    const slug = filename.replace(/\.md$/, '')
    return {
      slug,
      meta: post.data
    }
  })
}

export async function postShow(slug: string) {
  // fetch markdown file that matches slug
  const fullPath = path.join(postsDir, `${slug}.md`)
  const fileContent = fs.readFileSync(fullPath)
  const post = matter(fileContent)

  // parse markdown to html
  const content = await remark().use(html).process(post.content)
  const htmlContent = content.toString()
  return {
    slug,
    title: post.data.title,
    date: post.data.date,
    content: htmlContent

  }
}