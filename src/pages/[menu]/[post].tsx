import { getAllPostSlugs, getPostBySlug, markdown2Html } from '@/apis/post'
import { getBlurImage, getImageRatio, getImageUrl } from '@/apis/image'
import { MenuModel, PostModel } from '@/apis/types'
import Head from 'next/head'
import { Fragment, FunctionComponent } from 'react'
import dayjs from 'dayjs'
import { MdxRemote } from 'next-mdx-remote/types'
import { Post } from '@/components/Post'
import { FullSizeImage } from '@/components/Image'
import { staticMenus } from '@/apis/constant'

type Props = {
  /**
   * 菜单信息
   */
  menu: MenuModel

  /**
   * 文章信息
   */
  post: PostModel

  /**
   * Markdown 渲染信息
   */
  source: MdxRemote.Source

  /**
   * 封面信息
   */
  cover?: {
    src: string
    b64: string
    ratio: number
  }
}

/**
 * 文章页
 */
const PostPage: FunctionComponent<Props> = ({ post, source, cover }) => {
  const createAt = dayjs(post.createTime).format('MMMM DD, YYYY')

  return (
    <Fragment>
      <Head>
        <title>{post.title}</title>
      </Head>
      <div className='w-full p-6 lg:p-8'>
        <h2 className='text-2xl lg:text-3xl font-bold tracking-wide'>{post.title}</h2>
      </div>
      <div className='lg:-mr-16 lg:-ml-16 h-16 border-black border-t-2 border-b-2 flex flex-row items-center pl-6 lg:pl-24'>
        <h3 className='text-base lg:text-lg font-bold tracking-wide'>{createAt} • {post.readingTime}</h3>
      </div>
      {
        cover && <FullSizeImage {...cover} className='border-b-2 border-black' />
      }
      <Post className='lg:p-8 p-6' source={source} />
    </Fragment>
  )
}

export default PostPage

type Params = {
  params: {
    menu: string
    post: string
  }
}

export const getStaticProps = async ({ params }: Params) => {
  const menu = staticMenus.find(({ enTitle }) => enTitle === params.menu)

  const post = getPostBySlug(params.menu, params.post, [
    'slug',
    'title',
    'createTime',
    'updateTime',
    'coverImage',
    'readingTime',
    'author',
    'intro',
    'content'
  ])

  if (!menu || !post) {
    return {
      notFound: true
    }
  }

  const source = await markdown2Html(menu.enTitle, params.post, post.content)

  // 加工一下封面
  const cover = await (async () => {
    if (!post.coverImage) return null

    const args = [params.menu, post.slug, post.coverImage]
    return {
      src: await getImageUrl(...args),
      b64: await getBlurImage(...args),
      ratio: (await getImageRatio(...args)).ratio,
    }
  })()

  return {
    props: {
      menu,
      post,
      cover,
      source,
    }
  }
}

export const getStaticPaths = async () => {
  const res = getAllPostSlugs()

  return {
    paths: res.map(params => {
      return {
        params,
      }
    }),
    fallback: false,
  }
}