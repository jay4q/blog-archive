import { Fragment, FunctionComponent } from 'react'
import Head from 'next/head'
import Lottie from 'react-lottie-player'

const lottieData = require('@/assets/404.json')

/**
 * 404
 */
const Index: FunctionComponent = () => {
  return (
    <Fragment>
      <Head>
        <title>🙇 404 🙇</title>
      </Head>
      <div className='w-full h-full flex flex-col items-center justify-center'>
        <div className='w-80 h-80 lg:w-96 lg:h-96'>
          <Lottie
            loop
            play
            animationData={lottieData}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </div>
    </Fragment>
  )
}

export default Index