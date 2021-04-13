import classNames from 'classnames'
import { FunctionComponent } from 'react'
import { BlurImage } from './BlurImage'
import { BlurImageProps } from './types'

type Props = BlurImageProps & {
  ratio: number
}

/**
 * 维持宽高比的图片
 * @description 移动端屏幕填满显示宽度
 */
export const FullSizeImage: FunctionComponent<Props> = ({ style, ratio, className, ...imageProps }) => {
  return (
    <div className='full-size-image sm:w-full'>
      <BlurImage
        enableZoom  // 默认打开缩放
        className={classNames(className, 'w-full')}
        style={{
          ...style,
          height: 0,
          paddingBottom: (1 / ratio) * 100 + '%'
        }}
        {...imageProps}
      />
    </div>
  )
}