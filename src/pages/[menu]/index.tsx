import Head from 'next/head'
import { Fragment, FunctionComponent } from 'react'
import { getImageUrl, getBlurImage, getImageRatio } from '@/apis/image'
import { staticMenus } from '@/apis/constant'
import { getPostsByMenu } from '@/apis/post'
import { MenuModel, PostModel } from '@/apis/types'
import { BlurImage } from '@/components/Image'
import dayjs from 'dayjs'
import Link from 'next/link'

type Props = {
  /**
   * 菜单信息
   */
  menu: MenuModel

  /**
   * 菜单下的所有文章
   */
  posts: PostModel[]
}

const Item: FunctionComponent<{ menu: MenuModel, post: PostModel }> = ({ menu, post }) => {
  const createAt = dayjs(post.createTime).format('MMMM DD, YYYY')

  return (
    <Link href={`/${menu.enTitle}/${post.slug}`}>
      <a className='group'>
        <li className='w-full flex flex-row border-b-2 border-black'>
          <BlurImage src={post.coverImage} blurSrc={post.b64Cover} className='flex-shrink-0 w-28 h-28 lg:w-48 lg:h-48 border-r-2 border-black' />
          <div className='p-4 lg:p-8 flex-grow-1 tracking-wide transform transition-easy lg:group-hover:translate-x-2'>
            <h1 className='text-lg lg:text-2xl font-bold line-clamp-2 mb-1 lg:mb-2'>{post.title}</h1>
            <h2 className='text-sm lg:text-base font-bold text-black text-opacity-70 lg:mb-2'>{createAt} • {post.readingTime}</h2>
            <h3 className='hidden text-sm lg:text-base font-bold text-black text-opacity-50 lg:line-clamp-2'>{post.intro}</h3>
          </div>
        </li>
      </a>
    </Link>
  )
}

/**
 * 菜单页
 */
const MenuPage: FunctionComponent<Props> = ({ menu, posts }) => {
  return (
    <Fragment>
      <Head>
        <title>{menu.title}｜{menu.enTitle.toUpperCase()}</title>
      </Head>
      <div className='lg:-mx-16 lg:px-24 px-6 h-16 border-black border-b-2 flex flex-row items-center justify-between font-bold text-lg tracking-wide'>
        <span>{menu.icon}&ensp;{menu.enTitle.toUpperCase()}</span>
        <span>TOTAL: {posts.length}</span>
      </div>
      <ul className='w-full'>
        {
          posts.map(post => (
            <Item key={post.slug} menu={menu} post={post} />
          ))
        }
      </ul>
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