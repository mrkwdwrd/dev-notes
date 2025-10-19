import { GetStaticProps } from 'next'
import Link from 'next/link'
import { postsIndex } from '@/lib/posts'

export default function Home({ allPosts }: { allPosts: AllPosts }) {
 return (
  <main className='max-w-lg mx-auto p-8'>
    <h1 className='text-5xl font-serif'>Posts</h1>
    <ul className='border border-white p-4 rounded'>
       {allPosts.map(post => (
         <li key={ post.slug } className='border-b border-dotted p-2'>
          <div className='w-full flex justify-between items-baseline'>
            <h2 className='font-serif text-2xl'>
              <Link href={`/${post.slug}`} title={post.meta.title} className='hover:underline'>{post.meta.title}</Link>
            </h2>
            { post.meta.date }
          </div>
          <div className='text-sm text-zinc-500'>{post.meta.excerpt}</div>
        </li>
       ))}
    </ul>
  </main>
 )
}

type AllPosts = ReturnType<typeof postsIndex>

export const getStaticProps: GetStaticProps<{ allPosts: AllPosts }> = async () => {
  const allPosts = postsIndex()
  return {
    props: {
      allPosts
    }
  }
}