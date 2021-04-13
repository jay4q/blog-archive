import { Fragment, FunctionComponent } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Lottie from 'react-lottie-player'

const lottieData = require('@/assets/404.json')

/**
 * 404
 */
const Index: FunctionComponent = () => {
  return (
    <Fragment>
      <Head>
        <title>🙇 oops ~</title>
      </Head>
      <div className='flex-grow flex flex-col items-center pt-8'>
        <Lottie
          loop
          play
          animationData={lottieData}
          style={{ width: 256, height: 256 }}
        />
        <h1 className='text-xl mb-4 font-bold -mt-4 dark:text-white'>OOPS NOTHING HERE :P</h1>
        <Link href='/'>
          <a className='text-sm text-gray-500'>🏠&ensp;back home</a>
        </Link>
      </div>
    </Fragment>
  )
}

export default Index