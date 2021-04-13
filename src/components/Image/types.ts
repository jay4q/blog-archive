import { CSSProperties, ImgHTMLAttributes } from 'react'

export type BlurImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'layout' | 'width' | 'height'> & {
  /**
   * 图片容器的样式
   * @description 一般需要填写宽和高，因此这里设为必填
   */
  className?: string

  /**
   * 是否使用图片点击缩放
   * @description 默认不开启
   */
  enableZoom?: boolean

  /**
   * 可以用于占位用的资源
   * @description 一般是 base64
   */
  blurSrc?: string | null

  /**
   * 图片容器样式
   */
  style?: CSSProperties

  onClick?: (e: any) => void
}