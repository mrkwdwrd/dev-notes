import { GetStaticPropsContext, GetStaticPaths } from 'next'
import { allSlugs, postShow } from '@/lib/posts'
import Link from 'next/link'

export default function Post({ postData }: { postData: PostData }) {
  return (
    <main className='max-w-lg mx-auto p-8'>
      <h1 className='text-5xl font-serif'>{postData.title}</h1>
      <div className='border border-white p-4 rounded'>
        <article dangerouslySetInnerHTML={{ __html: postData.content }} />
        <div className='flex justify-end text-zinc-500'>
          { postData.date }
        </div>
      </div>
      <div className='py-2'>
        <Link href={`/`} className='text-lg'>
          ← <span className='hover:underline text-sm'>Back to posts</span>
        </Link>
      </div>
    </main>
  )
}

type PostData = Awaited<ReturnType<typeof postShow>>

export async function getStaticProps(ctx: GetStaticPropsContext<{ slug: string }>) {
  const slug = ctx.params!.slug
  const postData: PostData = await postShow(slug)
  return {
    props: {
      postData
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = allSlugs()
  return {
    paths,
    fallback: false
  }
}

