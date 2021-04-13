import classNames from 'classnames'
import hydrate from 'next-mdx-remote/hydrate'
import { MdxRemote } from 'next-mdx-remote/types'
import { FunctionComponent } from 'react'
import { components } from './components'

type Props = {
  source: MdxRemote.Source
  className?: string
}

/**
 * 文章渲染
 */
export const Post: FunctionComponent<Props> = ({ source, className }) => {
  const content = hydrate(source, { components })

  return (
    <article className={classNames('prose prose-pink max-w-full', className)}>
      {content}
    </article>
  )
}