'use client'
import 'tailwindcss/tailwind.css';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export const metadata ={
  title: "Recylink",
  description: "A Digital platform that facilitates seamless reporting and resolution of waste management"
}

function App({ Component, pageProps }: AppProps) {
  return (
  <div>
        <Component {...pageProps} />
 </div>
  )
}

export default App;