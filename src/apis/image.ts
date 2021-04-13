import { join } from 'path'
import lqip from 'lqip'
import sizeOf from 'image-size'
import { stringify } from 'query-string'
import { isArrayExist } from '@/utils'

const rootDir = join(process.cwd(), 'public')
const baseDir = join(rootDir, '/__post')

type FixedImageType = {
  // 原始图片路径
  rawPath: string
  // 可用的图片请求路径
  realPath: string
  // 宽高比
  ratio?: number
  // 占位图
  b64?: string | null
}

/**
 * 获取图片的请求路径
 * @param paths 
 */
export const getImageUrl = (...paths: string[]) => {
  return join(baseDir, ...paths).replace(rootDir, '')
}

/**
 * 获取模糊后的缩略图，base64 格式
 * @param paths
 */
export const getBlurImage = async (...paths: string[]) => {
  try {
    const realPath = join(baseDir, ...paths)
    const res = await lqip.base64(realPath)
    return res
  } catch (e) {
    return null
  }
}

/**
 * 获取图片宽高比
 * @param paths
 */
export const getImageRatio = async (...paths: string[]) => {
  try {
    const realPath = join(baseDir, ...paths)
    const res = await sizeOf(realPath)
    return (res.width || 1) / (res.height || 1)
  } catch (e) {
    return 1
  }
}

/**
 * 将文章中的图片链接转换为next链接并补上有用的信息
 * @param menu 
 * @param post 
 * @param content 
 */
export const fixImagesInContent = async (menu: string, post: string, content: string) => {
  if (!content) return ''

  const imagePatterns: string[] = content.match(/!\[.*\](.*)/gi) || []

  if (!isArrayExist(imagePatterns)) return content

  const fixedImages = (await Promise.all(
    imagePatterns
      // 获取 图片请求路径
      .reduce<FixedImageType[]>((res, mdImg) => {
        const rawPath = (mdImg.match(/!\[.*\]\((.*)\)/) || [])[1]
        if (!rawPath) {
          return res
        } else {
          return [
            ...res,
            { rawPath, realPath: getImageUrl(menu, post, rawPath) }
          ]
        }
      }, [])
      // 获取 图片宽高比和占位图
      .map(img => (
        (async () => {
          const ratio = await getImageRatio(menu, post, img.rawPath)
          const b64 = await getBlurImage(menu, post, img.rawPath)
          return { ...img, ratio, b64 }
        })()
      ))
  ))

  let res = content

  // 将处理后的信息写入图片链接
  fixedImages.forEach(img => {
    const search = stringify(
      {
        b64: img.b64,
        ratio: img.ratio,
      },
      {
        skipEmptyString: true,
        skipNull: true
      }
    )

    res = res.replace(img.rawPath, img.realPath + '?' + search)
  })

  return res
}