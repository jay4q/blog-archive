import { MenuModel } from '@/apis/types'
import { useBoolean } from 'ahooks'
import classNames from 'classnames'
import { Fragment, FunctionComponent } from 'react'
import { HiMenuAlt2 } from 'react-icons/hi'
import { MenuDrawer } from '../MenuDrawer'
import styles from './index.module.css'

/**
 * 移动端：菜单显示按钮
 */
export const MenuButton: FunctionComponent<{ menus: MenuModel[] }> = ({ menus }) => {
  const [visible, { setTrue, setFalse }] = useBoolean(false)

  return (
    <Fragment>
      <div className='relative w-6 h-6 sm:hidden'>
        <div className='absolute w-full h-full -top-1 -left-1'>
          <div className={classNames('absolute top-0 left-0 w-2 h-2 bg-pink-400 dark:bg-pink-600', styles.cube1)}></div>
          <div className={classNames('absolute top-0 left-0 w-2 h-2 bg-pink-400 dark:bg-pink-600', styles.cube2)}></div>
        </div>
        <HiMenuAlt2 className='relative cursor-pointer w-full h-full dark:text-white' onClick={setTrue} />
      </div>
      <MenuDrawer menus={menus} visible={visible} onClose={setFalse} />
    </Fragment>
  )
}