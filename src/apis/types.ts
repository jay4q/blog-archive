export interface MenuModel {
  sort: number
  title: string
  enTitle: string
  icon: string
  intro: string
  cover: string
  b64Cover?: string | null
}

export interface PowerByModel {
  icon: string
  name: string
  href: string
}

export interface SiteMetaModel {
  name: string
  avatar: string
  github: string
  description: string
  powerBy: PowerByModel[]
}

export interface PostModel {
  slug: string
  title: string
  createTime: string
  updateTime: string
  coverImage?: string
  author: string
  intro: string
  content: string
  readingTime: string
  b64Cover?: string | null
}

export type MdFields = {
  [key in string]: string
}
