import React from 'react'
import classNames from 'classnames'
import { useBoolean } from 'ahooks'
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi'

/**
 * 深色模式切换
 */
export const Darkmode = () => {
  const [isDark, { toggle }] = useBoolean(false)

  const onToggle = () => {
    toggle()

    // 记得修改 class
    if (isDark) {
      document.documentElement.classList.remove('dark')
    } else {
      document.documentElement.classList.add('dark')
    }
  }

  return (
    <div
      onClick={() => onToggle()}
      // z-index 解决了 overflow & border-radius 在 safari 上的显示溢出问题
      // @see https://gist.github.com/ayamflow/b602ab436ac9f05660d9c15190f4fd7b#gistcomment-3234249
      className='relative flex flex-col items-center justify-center w-8 h-8 rounded-full overflow-hidden z-10 cursor-pointer bg-yellow-300 dark:bg-purple-600 transition-easy'
    >
      <div className={classNames('absolute left-1/2 top-1/2 w-7 h-7 origin-center transform rotate-0 transition-easy', isDark && 'rotate-90')}>
        <span className="absolute left-0 top-0 transform -translate-x-1/2 -translate-y-1/2">
          <HiOutlineSun className='w-4 h-4' />
        </span>
        <span className="absolute left-0 bottom-0 transform -translate-x-1/2 translate-y-1/2 -rotate-90">
          <HiOutlineMoon className='w-4 h-4' />
        </span>
      </div>
    </div>
  )
}