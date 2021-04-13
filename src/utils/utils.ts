import readingTime from 'reading-time'

export const isServer = () => !process.browser

export const isArrayExist = (arr?: any[]) => Array.isArray(arr) && arr.length > 0

/**
 * 首字母大些
 * @param word 
 */
export const upperFirstLetter = (word: string) => word.toLowerCase().replace(/^[a-z]/g, (L) => L.toUpperCase())

/**
 * 格式化阅读时间
 * @param text 
 */
export const formatReadingTime = (text: string) => {
  const minutes = Math.ceil(readingTime(text).minutes)
  let cups = Math.round(minutes / 5)

  if (cups > 5) {
    return `${new Array(Math.round(cups / Math.E))
      .fill('🍱')
      .join('')} ${minutes} min read`
  } else {
    return `${new Array(cups || 1).fill('☕️').join('')} ${minutes} min read`
  }
}

/**
 * 获取中文的周天
 * @param week 
 */
export const getWeekCN = (week: number) => ['星期日', '星期一', '星期二', '星期三', '周四', '星期五', '星期六'][week]