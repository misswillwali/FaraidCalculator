// File: components/Layout.tsx
import { ReactNode } from 'react'
import Head from 'next/head'

interface LayoutProps {
  children: ReactNode
  title?: string
  description?: string
}

export default function Layout({ 
  children, 
  title = "Willwali Faraid Calculator", 
  description = "Calculate Islamic inheritance shares accurately and easily" 
}: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {children}
      </main>
    </>
  )
}
