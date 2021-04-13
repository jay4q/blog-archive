import { useObserver } from '@/hooks'
import { useBoolean } from 'ahooks'
import classNames from 'classnames'
import { v4 as uuid } from 'uuid'
import { FunctionComponent, useCallback, useRef, useEffect } from 'react'
import MediumZoom, { Zoom } from 'medium-zoom'
import { BlurImageProps } from './types'

/**
 * 优化后的图片组件
 */
export const BlurImage: FunctionComponent<BlurImageProps> = ({
  style,
  blurSrc,
  children,
  className,
  enableZoom,
  onClick,
  ...imageProps
}) => {
  const imgId = useRef(uuid().replace(/-/g, ''))
  const zoom = useRef<Zoom>()

  const [isImageReady, { setTrue }] = useBoolean(false)
  const { isVisible, setRootRef } = useObserver()

  const onImageLoad = useCallback(() => {
    setTrue()
  }, [])

  const onImageClick = useCallback((e: any) => {
    if (onClick) {
      onClick(e)
    } else if (isImageReady && enableZoom && zoom.current) {
      zoom.current.open()
    }
  }, [isImageReady, enableZoom, onClick])

  useEffect(() => {
    if (enableZoom && isVisible) {
      zoom.current = MediumZoom(document.getElementById(imgId.current) as any, {
        background: 'rgba(0, 0, 0, 0.8)'
      })
    }
  }, [isVisible, enableZoom])

  return (
    <div
      style={{
        ...(style || {}),
        cursor: isImageReady && enableZoom ? 'zoom-in' : 'default'
      }}
      ref={setRootRef}
      className={classNames('relative overflow-hidden', className)}
      onClick={onImageClick}
    >
      {
        isVisible && (
          <img
            {...imageProps}
            id={imgId.current}
            className='absolute inset-0 w-full h-full object-cover object-center'
            style={{ margin: '0px' }}
            onLoad={onImageLoad}
          />
        )
      }
      {
        blurSrc && (
          <div className={classNames('absolute inset-0 w-full h-full bg-transparent transition duration-700 ease-in-out', isImageReady ? 'opacity-0' : 'opacity-100')}>
            <img
              alt=''
              src={blurSrc}
              className='absolute inset-0 w-full h-full object-cover object-center'
              style={{ margin: '0px' }}
            />
            <div className='absolute inset-0 w-full h-full bg-transparent backdrop-filter backdrop-blur'></div>
          </div>
        )
      }
      {
        children
      }
    </div>
  )
}