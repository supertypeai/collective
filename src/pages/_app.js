import Script from 'next/script'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Script async defer data-website-id="d2ad8970-0b32-4ada-93a6-cfbd95030fda" src="https://umai.supertype.ai/umami.js" />
      <Component {...pageProps} />
    </>
  )
}
