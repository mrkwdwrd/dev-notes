import { GetStaticProps } from 'next'
import { postsIndex } from '@/lib/posts'

export default function Home({ allPosts }: { allPosts: AllPosts }) {
 return (
  <>
    <ul>
       {allPosts}
    </ul>
  </>
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