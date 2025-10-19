import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
const  postsDir = path.join(process.cwd(), 'src/posts')

export function postsIndex() {
  // get a list of filenames
  const filenames = fs.readdirSync(postsDir)

  return filenames.map((filename: string) => {

    // get file contents
    const fullPath = path.join(postsDir, filename)
    const fileContent = fs.readFileSync(fullPath, 'utf8')

    // parse meta data
    const meta = matter(fileContent)
    const slug = filename.replace(/\.md$/, '');
    return {
      slug,
      meta: meta.data
    }
  })
}