import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { MdFields } from './types'
import { staticMenus } from './constant'
import { formatReadingTime } from '@/utils'
import renderToString from 'next-mdx-remote/render-to-string'
import { fixImagesInContent } from './image'
import { components } from '@/components/Post/components'

const postsDirectory = join(process.cwd(), 'public/__post')

/**
 * 根据 菜单和文章名称 搜索文章
 * @param menuSlug 
 * @param slug 
 * @param fields 
 */
export const getPostBySlug = (menuSlug: string, slug: string, fields: string[]) => {
  try {
    const realSlug = slug.replace(/\.md$/, '')
    const fullPath = join(postsDirectory, menuSlug, realSlug, 'index.md')
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    let res: MdFields = {}

    fields.forEach(f => {
      if (f === 'slug') {
        res[f] = realSlug
      }
      if (f === 'content') {
        res[f] = content
      }
      if (f === 'readingTime') {
        res[f] = formatReadingTime(content)
      }

      if (data[f]) {
        res[f] = data[f]
      }
    })

    return res
  } catch (e) {
    return false
  }
}

/**
 * 搜索某一菜单下的所有文章
 * @param menu 
 * @param fields 
 */
export const getPostsByMenu = (menu: string, fields: string[]) => {
  try {
    const menuPath = join(postsDirectory, menu)
    const files = fs.readdirSync(menuPath, 'utf-8')
    let res: MdFields[] = []

    files
      // 只获取 Markdown 文章
      .filter(filename => !filename.includes('.'))
      .forEach(filename => {
        const content = getPostBySlug(menu, filename, fields)
        if (content) {
          res.push(content)
        }
      })

    return res
  } catch (e) {
    // 找不到任何文章
    return []
  }
}

/**
 * 获取所有文章的标题
 */
export const getAllPostSlugs = () => {
  let slugs: { menu: string, post: string }[] = []

  staticMenus
    .map(menu => menu.enTitle)
    // 首页文章的特殊性，需过滤
    .filter(menuSlug => menuSlug !== 'about')
    .forEach(menuSlug => {
      try {
        const menuPath = join(postsDirectory, menuSlug)
        const paths = fs.readdirSync(menuPath, 'utf8')

        const res = paths
          .filter(filename => !filename.includes('.'))
          // 得到文章标题和对应菜单即可
          .map(filename => ({
            menu: menuSlug,
            post: filename
          }))

        slugs = [...slugs, ...res]
      } catch (e) {
        // 找不到任何一篇文章
      }
    })

  return slugs
}

/**
 * 将 Markdown 文档转换为 Html
 * @param menu 
 * @param post 
 * @param content 
 */
export const markdown2Html = async (menu: string, post: string, content: string) => {
  const fixedContent = await fixImagesInContent(menu, post, content)
  const mdxSource = await renderToString(fixedContent, {
    components,
  })

  return mdxSource
}