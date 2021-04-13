import { isServer } from '@/utils'
import { useEffect, useState } from 'react'

/**
 * 用于监听视图是否进入视窗
 */
export const useObserver = () => {
  const [rootRef, setRootRef] = useState<any>()
  const [isVisible, setInViewport] = useState(() => {
    if (isServer()) {
      return false
    }
    return !IntersectionObserver
  })

  useEffect(
    () => {
      let observer: IntersectionObserver
      let didCancel = false

      if (
        rootRef &&
        !isServer() &&
        IntersectionObserver
      ) {
        observer = new IntersectionObserver(
          entries => {
            entries.forEach(entry => {
              if (
                !didCancel &&
                (entry.intersectionRatio > 0 || entry.isIntersecting)
              ) {
                setInViewport(true)
                observer.unobserve(rootRef)
              }
            })
          }
        )
        observer.observe(rootRef)
      }

      return () => {
        didCancel = true
        if (observer && observer.unobserve) {
          observer.unobserve(rootRef)
        }
      }
    },
    [rootRef]
  )

  return {
    isVisible,
    setRootRef,
  }
}