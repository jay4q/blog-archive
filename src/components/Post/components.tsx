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
  }
}