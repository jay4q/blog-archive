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
        ratio={Number(extraInfo.ratio as string)}
        className='my-8'
      />
    )
  },
  strong: (props: { children: string }) => {
    return <strong className='bg-red-300 px-1'>{props.children}</strong>
  },
  a: (props: { href: string, children: string }) => {
    return (
      <a href={props.href} className='relative px-1 group' target='__blank'>
        <span className='absolute bottom-0 left-0 w-full h-full bg-blue-300 transition-easy transform origin-bottom scale-y-[.3] group-hover:scale-y-100'></span>
        <span className='relative'>{props.children}</span>
      </a>
    )
  },
  h2: (props: { children: string }) => {
    return (
      <h2 className='relative'>
        <span className='absolute bottom-0 -left-1 w-12 h-3 bg-red-300'></span>
        <span className='relative'>{props.children}</span>
      </h2>
    )
  },
  inlineCode: (props: { children: string }) => {
    return (
      <code className='relative'>
        <span className='absolute bottom-0 w-8 h-2 bg-green-300'></span>
        <span className='relative'>{props.children}</span>
      </code>
    )
  }
}