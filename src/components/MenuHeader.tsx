import { MenuModel } from '@/apis/types'
import { Fragment, FunctionComponent } from 'react'
import { BlurImage, FullSizeImage } from './Image'

type Props = {
  menu: MenuModel
  cover: CoverImageInfo
  count: number
}

/**
 * 菜单页说明
 */
export const MenuHeader: FunctionComponent<Props> = ({ menu, cover }) => {
  return (
    <Fragment>
      <FullSizeImage
        alt='cover'
        src={cover.src}
        key={menu.enTitle}
        blurSrc={cover.b64}
        ratio={cover.ratio}
        enableZoom={false}
        className='mb-3 cursor-pointer group'
      >
        <div className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-easy'>
          <h1 className='absolute right-2 bottom-2 text-white text-right whitespace-pre-line opacity-0 transform translate-y-1/3 group-hover:opacity-100 group-hover:translate-y-0 transition-easy'>{menu.intro}</h1>
        </div>
      </FullSizeImage>
      <h1 className='pb-2 mb-6 font-bold text-sm dark:text-white border-gray-100 dark:border-gray-600 border-b-2'>{menu.enTitle.toUpperCase()}</h1>
    </Fragment>
  )
}