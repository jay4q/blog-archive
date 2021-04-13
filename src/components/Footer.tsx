import { siteMetas } from '@/apis/constant'
import { Fragment, FunctionComponent } from 'react'

const { powerBy } = siteMetas

/**
 * 页脚
 */
export const Footer: FunctionComponent = () => {
  const currentYear = new Date().getFullYear()

  const powerByEl = (
    powerBy.map((item, i) => (
      <Fragment key={item.name}>
        {
          0 !== i && <span>&emsp;|&emsp;</span>
        }
        <a className='hidden sm:inline-block hover:text-white transition-easy' href={item.href} target='__blank'>
          {item.icon}&ensp;{item.name}
        </a>
        <a className='sm:hidden' href={item.href} target='__blank'>
          {item.icon}
        </a>
      </Fragment>
    ))
  )

  return (
    <footer className='w-full py-4 bg-gray-800 dark:bg-gray-900'>
      <div className='container-base flex flex-col items-center text-base text-gray-400'>
        <p className='leading-8'>
          {powerByEl}
        </p>
        <p className='leading-8'>
          <a className='hover:text-white transition-easy' href={siteMetas.github} target='__blank'>
            {siteMetas.name}&ensp;
          </a>
          @&ensp;2021-{currentYear}
        </p>
      </div>
    </footer>
  )
}