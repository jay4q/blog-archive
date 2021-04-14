import Head from 'next/head'
import { Fragment, FunctionComponent, useEffect } from 'react'
import { PostModel } from '@/apis/types'
import { getPostBySlug, markdown2Html } from '@/apis/post'
import { siteMetas } from '@/apis/constant'
import { getConsoleTxt } from '@/apis/console'
import { MdxRemote } from 'next-mdx-remote/types'

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
        <title>{siteMetas.name}'s Blog</title>
      </Head>
      {/* <Post className='mb-16' source={source} /> */}
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