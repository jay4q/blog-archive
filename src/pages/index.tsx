import Head from 'next/head'
import { Fragment, FunctionComponent, useEffect } from 'react'
import { PostModel } from '@/apis/types'
import { getPostBySlug, markdown2Html } from '@/apis/post'
import { siteMetas } from '@/apis/constant'
import { getConsoleTxt } from '@/apis/console'
import { MdxRemote } from 'next-mdx-remote/types'
import { upperFirstLetter } from '@/utils'
import { Post } from '@/components/Post'

type Props = {
  /**
   * 控制台打印资料
   */
  consoleTxt: string

  /**
   * 个人介绍
   */
  post: PostModel

  /**
   * Markdown 渲染信息
   */
  source: MdxRemote.Source
}

/**
 * 首页
 */
const Index: FunctionComponent<Props> = ({ consoleTxt, source }) => {
  useEffect(() => {
    console.log(consoleTxt)
  }, [consoleTxt])

  return (
    <Fragment>
      <Head>
        <title>{siteMetas.name}'s blog</title>
      </Head>
      <div className='w-full p-6 pt-12 lg:p-8 lg:pt-16'>
        <h2 className='text-5xl lg:text-6xl font-black mb-6 tracking-wide'>{upperFirstLetter(siteMetas.name)} {upperFirstLetter(siteMetas.firstName)}</h2>
        <h3 className='text-xl lg:text-2xl font-bold tracking-wide'>{siteMetas.description}</h3>
      </div>
      <div className='lg:-mr-16 lg:-ml-16 h-16 border-black border-t-2 border-b-2'></div>
      <Post className='lg:p-8 p-6' source={source} />
    </Fragment>
  )
}

export default Index

export const getStaticProps = async () => {
  const post = getPostBySlug('about', 'about', [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
  ])

  const consoleTxt = getConsoleTxt()

  if (!post) {
    return {
      notFound: true,
    }
  }

  const source = await markdown2Html('about', 'about', post.content)

  return {
    props: {
      post,
      source,
      consoleTxt
    },
  }
}