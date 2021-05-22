import classNames from 'classnames'
import { FunctionComponent } from 'react'
import { BlurImage } from './BlurImage'
import { BlurImageProps } from './types'

type Props = BlurImageProps & {
  ratio: number
  width?: number
}

// 维持宽高比的图片
// 根据原图尺寸，但最大不超过父容器宽度，即 max-w-full
export const FullSizeImage: FunctionComponent<Props> = ({ style, ratio, width, className, ...imageProps }) => {
  return (
    <div className='w-full'>
      <BlurImage
        enableZoom  // 默认打开缩放
        className={classNames(className, 'max-w-full mx-auto')}
        style={{
          ...style,
          ...(
            width ?
              { width: width + 'px', paddingBottom: (1 / ratio) * width + 'px' } :
              { paddingBottom: (1 / ratio) * 100 + '%' }
          ),
          height: 0,
        }}
        {...imageProps}
      />
    </div>
  )
}