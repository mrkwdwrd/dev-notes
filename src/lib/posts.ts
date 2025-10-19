import fs from 'fs'
import path from 'path'
const  postsDir = path.join(process.cwd(), 'src/posts')

export function postsIndex() {
  // get a list of filenames
  const filenames = fs.readdirSync(postsDir)

  return filenames
}