import { PostModel } from '@/apis/types'
import { Fragment, FunctionComponent } from 'react'
import dayjs from 'dayjs'
import Link from 'next/link'
import { BlurImage } from './Image'

type Props = {
  data: PostModel
  menu: string
}

/**
 * 文章列表上的卡片
 */
export const PostItem: FunctionComponent<Props> = ({ data, menu }) => {
  const createAndReadingTime = dayjs(data.createTime).format('MMMM DD, YYYY') + ' • ' + data.readingTime

  return (
    <Fragment>
      <li className='relative w-full flex flex-row justify-between items-stretch sm:mb-6'>
        <div className='flex-grow flex flex-col'>
          <Link href={`/post/${menu}/${data.slug}`}>
            <a>
              <h1 className='text-lg font-bold tracking-wider line-clamp-2 dark:text-white'>{data.title}</h1>
            </a>
          </Link>
          <p className='text-sm text-gray-400 mt-1 line-clamp-2 dark:text-gray-500'>{data.intro}</p>
          <p className='text-xs text-gray-400 mt-3 dark:text-gray-500 hidden sm:block'>{createAndReadingTime}</p>
        </div>
        {
          data.coverImage && (
            <BlurImage
              alt='cover'
              blurSrc={data.b64Cover}
              src={data.coverImage}
              className='relative flex-shrink-0 block w-20 sm:w-40 ml-4'
            />
          )
        }
      </li>
      <p className='text-xs text-gray-400 mt-3 mb-6 dark:text-gray-500 sm:hidden'>{createAndReadingTime}</p>
    </Fragment>
  )
}