import { FunctionComponent } from 'react'
import { HeaderProps } from '@/components/Header'

interface Props extends HeaderProps {

}

/**
 * 基础布局
 */
export const BaseLayout: FunctionComponent<Props> = ({ children }) => {
  return (
    <div className='w-full min-h-screen flex flex-col' style={{ backgroundColor: '#f1e6d6' }}>
      <main className='container-base flex-grow'>
        {/* <Header {...headerProps} /> */}
        {children}
      </main>
      {/* <Footer /> */}
    </div>
  )
}