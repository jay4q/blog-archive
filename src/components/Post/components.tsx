import { parse } from 'query-string'
import { MdxRemote } from 'next-mdx-remote/types'
import { FullSizeImage } from '../Image'

export const components: MdxRemote.Components = {
  img: (props: { src: string, alt: string }) => {
    const infos = props.src.split('?')
    const extraInfo = parse(infos[1])

    return (
      <FullSizeImage
        src={infos[0]}
        blurSrc={extraInfo.b64 as string}
        ratio={Number(extraInfo.ratio as string) || 1}
        width={Number(extraInfo.width as string) || 0}
        className='my-8'
      />
    )
  },
  strong: (props: { children: string }) => {
    return <strong className='__strong'>{props.children}</strong>
  },
  a: (props: { href: string, children: string }) => {
    return (
      <a href={props.href} className='__a' target='__blank'>
        {props.children}
      </a>
    )
  },
  h2: (props: { children: string }) => {
    return (
      <h2 className='__h2'>
        {props.children}
      </h2>
    )
  },
  h3: (props: { children: string }) => {
    return (
      <h3 className='__h2'>
        {props.children}
      </h3>
    )
  },
  inlineCode: (props: { children: string }) => {
    return (
      <code className='__code'>
        {props.children}
      </code>
    )
  }
}