import { GetStaticPropsContext, GetStaticPaths } from 'next'
import { allSlugs, postShow } from '@/lib/posts'

export default function Post({ postData }: { postData: PostData }) {
  return (
    <>
    {postData.slug}
    </>
  )
}

type PostData = ReturnType<typeof postShow>

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