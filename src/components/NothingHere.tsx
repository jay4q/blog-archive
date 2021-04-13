import classNames from 'classnames'
import Link from 'next/link'
import { FunctionComponent } from 'react'

type Props = {
  className?: string
}

/**
 * 空内容占位
 */
export const NothingHere: FunctionComponent<Props> = ({ className }) => {
  return (
    <div className={classNames('flex-grow flex flex-col items-center pb-24', className)}>
      <h1 className='text-xl mb-4 font-bold mt-8 dark:text-white'>OOPS NOTHING HERE :P</h1>
      <Link href='/'>
        <a className='text-sm text-gray-500'>🏠&ensp;back home</a>
      </Link>
    </div>
  )
}