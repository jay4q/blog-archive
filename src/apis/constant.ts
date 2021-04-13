import { SiteMetaModel } from './types'
import { MenuModel } from './types'

/**
 * 网站元信息描述
 */
export const siteMetas: SiteMetaModel = require('../../public/__post/meta.json')

/**
 * 网站菜单描述
 */
export const staticMenus: MenuModel[] = require('../../public/__post/menu.json')