import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { MenuModel } from './types'

const postsDirectory = join(process.cwd(), 'public/__post')

type MdFields = {
  [key in string]: string
}

/**
 * 获取排序后的菜单
 * @param menu 
 */
export const getSortedMenu = (menu: MenuModel[]) => menu.sort((a, b) => a.sort - b.sort)

/**
 * 根据菜单名获取菜单详情
 * @param slug 
 * @param fields 
 */
export const getMenuBySlug = (slug: string, fields: string[]) => {
  try {
    // 默认每个菜单文件根目录下的 index.md 为介绍
    const fullPath = join(postsDirectory, slug, 'index.md')
    const fileContents = fs.readFileSync(fullPath, 'utf-8')
    const { data, content } = matter(fileContents)

    let res: MdFields = {}

    fields.forEach(f => {
      if (f === 'content') {
        res[f] = content
      }

      if (data[f]) {
        res[f] = data[f]
      }
    })

    return res
  } catch (e) {
    // 如果没有简介，说明菜单页还没准备好
    return false
  }
}

/**
 * 获取所有菜单名称
 */
export const getAllMenuSlugs = () => {
  try {
    const slugs = fs.readdirSync(postsDirectory).filter(menu => !menu.includes('.'))  // 只获取菜单
    return slugs
  } catch (e) {
    return []
  }
}

/**
 * 获取所有菜单
 * @param fields 
 */
export const getAllMenus = (fields: string[]) => {
  try {
    const menus = getAllMenuSlugs()
    let res: MdFields[] = []

    menus.forEach(slug => {
      const menu = getMenuBySlug(slug, fields)
      if (menu) {
        res.push(menu)
      }
    })

    // @ts-ignore
    return getSortedMenu(res)
  } catch (e) {
    return []
  }
}