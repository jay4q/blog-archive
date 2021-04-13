import { FunctionComponent } from 'react'
import { MenuModel } from '@/apis/types'
import classNames from 'classnames'

export interface HeaderProps {
  menus: MenuModel[]
}

interface DrawerProps {
  visible: boolean
  menus: MenuModel[]
  onClose: () => void
}

/**
 * 侧边栏菜单
 * todo: 待定
 */
export const MenuDrawer: FunctionComponent<DrawerProps> = ({ menus, visible, onClose }) => {
  return (
    <div
      className={classNames('fixed z-50 w-screen h-screen top-0 left-0 transition-easy sm:hidden backdrop-filter', visible ? 'backdrop-blur' : 'backdrop-blur-0')}
      style={{ visibility: visible ? 'visible' : 'hidden' }}
    >
      <div onClick={onClose} className={classNames('absolute w-full h-full top-0 left-0 transition-easy')}></div>
    </div>
  )
}