import Head from 'next/head'
import { Inter } from 'next/font/google'
import { invoke } from "@tauri-apps/api/tauri"
import { useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  useEffect(() => {
    invoke('greet', { name: 'World' })
    .then(console.log)
    .catch(console.error)
  }, []);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='flex justify-center items-center h-[100vh] text-red-400'>
        Welcome to my first Tauri App with Next.js
      </main>
    </>
  )
}
