import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Feed from '../common/components/Feed/Feed'
import Header from '../common/components/Header/Header'
import Modal from '../common/components/Modal/Modal'

const Home: NextPage = () => {
  return (
    <div className='bg-gray-50 h-screen overflow-y-scroll scrollbar-hide'>
      <Head>
        <title>Instagram</title>
        <meta name="description" content="Instagram-clone by Adham Tarek" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Feed />
      <Modal />
    </div>
  )
}

export default Home
