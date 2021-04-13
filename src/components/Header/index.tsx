import { FunctionComponent } from 'react'
import { siteMetas } from '@/apis/constant'
import { MenuModel } from '@/apis/types'
import Link from 'next/link'
import { RiExternalLinkLine } from 'react-icons/ri'
import { upperFirstLetter } from '@/utils'
import { MenuButton } from './MenuButton'

export interface HeaderProps {
  menus: MenuModel[]
}

const Github: FunctionComponent = () => {
  return (
    <a className='hidden sm:flex flex-row items-center p-2 rounded bg-pink-50 dark:bg-transparent' target='__blank' href={siteMetas.github}>
      <span className='mr-1 text-pink-600'>Github</span>
      <RiExternalLinkLine className='w-full h-full text-pink-600' />
    </a>
  )
}

/**
 * 页头
 */
export const Header: FunctionComponent<HeaderProps> = ({ menus }) => {
  return (
    <header className='flex flex-row items-center justify-between w-full py-4'>
      <Link href='/'>
        <a className='text-2xl font-bold dark:text-white'>{upperFirstLetter(siteMetas.name)}</a>
      </Link>
      <span>
        <Github />
        <MenuButton menus={menus} />
      </span>
    </header>
  )
}