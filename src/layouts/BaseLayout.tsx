import { siteMetas } from '@/apis/constant'
import { MenuModel } from '@/apis/types'
import Link from 'next/link'
import { Fragment, FunctionComponent } from 'react'
import { RiGithubFill } from 'react-icons/ri'
import { BiMenuAltRight } from 'react-icons/bi'
import classNames from 'classnames'
import { useBoolean } from 'ahooks'

type Props = {
  menus: MenuModel[]
}

const getRealURL = (slug: string) => '/' + (slug === 'about' ? '' : slug)

const DesktopMenu: FunctionComponent<Props> = ({ menus }) => {
  return (
    <div className='max-w-5xl h-full relative mx-auto flex-row items-center justify-between border-l-2 border-r-2 hidden lg:flex'>
      <div className='flex justify-center items-center w-16 h-full border-r-2'>
        <h1 className='font-black text-5xl'>J</h1>
      </div>
      <div className='flex felx-row items-center'>
        {
          menus.map(item => (
            <Link key={item.enTitle} href={getRealURL(item.enTitle)}>
              <a className='relative ml-4 mr-4 group'>
                <span className='absolute left-0 right-0 bottom-0 w-full h-0.5 bg-black transform translate-y-1.5 opacity-0 transition-easy group-hover:translate-y-0 group-hover:opacity-90'></span>
                <span className='text-base tracking-wide font-semibold'>{item.enTitle.toUpperCase()}</span>
              </a>
            </Link>
          ))
        }
      </div>
      <a className='group flex justify-center items-center w-16 h-full border-l-2' href={siteMetas.github} target='__blank'>
        <RiGithubFill className='w-11 h-11 transition-easy transform group-hover:scale-110' />
      </a>
    </div>
  )
}

const MobileMenu: FunctionComponent<Props> = ({ menus }) => {
  const [visible, { setFalse: onClose }] = useBoolean(true)

  return (
    <div className='w-full h-full flex flex-row items-center justify-between px-6 lg:hidden'>
      <h1 className='font-black text-5xl'>J</h1>
      <BiMenuAltRight className='w-11 h-11' />
      <div
        className={classNames('fixed z-50 w-screen h-screen top-0 left-0 transition-easy backdrop-filter', visible ? 'backdrop-blur' : 'backdrop-blur-0')}
        style={{ visibility: visible ? 'visible' : 'hidden' }}
      >
        <div onClick={onClose} className={classNames('absolute w-full h-full top-0 left-0 transition-easy')}></div>
      </div>
    </div>
  )
}

/**
 * 网站的基础布局
 */
export const BaseLayout: FunctionComponent<Props> = ({ menus, children }) => {
  const copyright = `${siteMetas.name.toUpperCase()} @ ${new Date().getFullYear()}`

  return (
    <Fragment>
      <header className='absolute top-8 left-0 w-full h-16 border-black border-t-2 border-b-2'>
        <DesktopMenu menus={menus} />
        <MobileMenu menus={menus} />
      </header>
      <div className='max-w-5xl min-h-screen mx-auto flex lg:border-l-2 lg:border-r-2 lg:border-black'>
        <div className='w-full lg:max-w-4xl mx-auto flex flex-grow lg:border-l-2 lg:border-r-2 lg:border-black'>
          <main className='w-full flex-grow py-24'>
            {children}
          </main>
        </div>
      </div>
      <footer className='flex items-center justify-center absolute bottom-8 left-0 w-full h-16 border-black border-t-2 border-b-2'>
        <h1 className='text-base font-semibold'>{copyright}</h1>
      </footer>
    </Fragment>
  )
}