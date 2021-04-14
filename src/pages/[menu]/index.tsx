import Head from 'next/head'
import { Fragment, FunctionComponent } from 'react'
import { getImageUrl, getBlurImage, getImageRatio } from '@/apis/image'
import { staticMenus } from '@/apis/constant'
import { getPostsByMenu } from '@/apis/post'
import { MenuModel, PostModel } from '@/apis/types'

type Props = {
  /**
   * 菜单信息
   */
  menu: MenuModel

  /**
   * 菜单下的所有文章
   */
  posts: PostModel[]

  /**
   * 封面信息
   */
  cover: CoverImageInfo
}

/**
 * 菜单页
 */
const MenuPage: FunctionComponent<Props> = ({ menu, posts, cover }) => {
  console.log(menu, posts, cover)

  return (
    <Fragment>
      <Head>
        <title>{menu.title}｜{menu.enTitle.toUpperCase()}</title>
      </Head>
    </Fragment>
  )
}

export default MenuPage

type Params = {
  params: {
    menu: string
  }
}

export const getStaticProps = async ({ params }: Params) => {
  const menu = staticMenus.find(({ enTitle }) => enTitle === params.menu)

  let posts: any[] = getPostsByMenu(params.menu, [
    'slug',
    'title',
    'createTime',
    'updateTime',
    'coverImage',
    'readingTime',
    'author',
    'intro',
  ])

  if (!menu || !posts) {
    return {
      notFound: true
    }
  }

  // 菜单封面处理
  const cover = await (async () => {
    if (!menu) return null

    return {
      src: await getImageUrl(menu.cover),
      b64: await getBlurImage(menu.cover),
      ratio: await getImageRatio(menu.cover),
    }
  })()

  if (posts.length > 0) {
    // 博客封面处理
    posts = await Promise.all(
      posts.map<Promise<PostModel>>((post: PostModel) => (
        (async () => {
          let b64 = null
          if (post.coverImage) {
            b64 = await getBlurImage(menu.enTitle, post.slug, post.coverImage)
          }
          return {
            ...(post as unknown as PostModel),
            b64Cover: b64,
            coverImage: post.coverImage ? getImageUrl(menu.enTitle, post.slug, post.coverImage) : ''
          }
        })()
      ))
    )
  }

  return {
    props: {
      menu,
      cover,
      posts,
    }
  }
}

export const getStaticPaths = async () => {
  return {
    fallback: false,
    paths: staticMenus
      .filter(menu => menu.enTitle !== 'about')
      .map(menu => {
        return {
          params: {
            menu: menu.enTitle,
          },
        }
      }),
  }
}