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
    return <strong className='bg-red-300 py-1 px-2'>{props.children}</strong>
  },
  a: (props: { href: string, children: string }) => {
    console.log(props)
    return (
      <a href={props.href} className='relative py-1 px-2 group' target='__blank'>
        <span className='absolute bottom-0 left-0 w-full h-full bg-blue-300 transition-easy transform origin-bottom scale-y-[.35] group-hover:scale-y-100'></span>
        <span className='relative'>{props.children}</span>
      </a>
    )
  }
}