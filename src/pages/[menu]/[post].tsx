import { getAllPostSlugs, getPostBySlug, markdown2Html } from '@/apis/post'
import { getBlurImage, getImageRatio, getImageUrl } from '@/apis/image'
import { MenuModel, PostModel } from '@/apis/types'
import Head from 'next/head'
import { Fragment, FunctionComponent } from 'react'
import dayjs from 'dayjs'
import { NothingHere } from '@/components/NothingHere'
import { MdxRemote } from 'next-mdx-remote/types'
import { Post } from '@/components/Post'
import { FullSizeImage } from '@/components/Image'
import classNames from 'classnames'
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
      <h1 className='font-bold text-2xl mb-2 dark:text-white'>{post.title}</h1>
      <h2 className='text-xs text-gray-400 mb-4 dark:text-gray-500'>{createAt} • {post.readingTime}</h2>
      {
        cover && (
          <FullSizeImage
            src={cover.src}
            blurSrc={cover.b64}
            ratio={cover.ratio}
            className='mb-8'
          />
        )
      }
      {
        !post.content
          ? <NothingHere className='pb-0' /> :
          <Post className={classNames('mb-16', !cover && 'mt-12')} source={source} />
      }
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
      ratio: await getImageRatio(...args),
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