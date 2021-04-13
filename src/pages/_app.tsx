import 'nprogress/nprogress.css'
import '@/styles/global.css'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { BaseLayout } from '@/layouts'
import { staticMenus, siteMetas } from '@/apis/constant'
import { useLoading } from '@/hooks'
import { upperFirstLetter } from '@/utils'

export default function MyApp({ Component, pageProps }: AppProps) {
  useLoading()

  return (
    <BaseLayout menus={staticMenus}>
      <Head>
        <link rel="icon" href="/favicon.png" />
        <title>{upperFirstLetter(siteMetas.name)}'s Blog</title>
      </Head>
      <Component {...pageProps} />
    </BaseLayout>
  )
}