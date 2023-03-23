import { useState } from 'react'
import Script from 'next/script'
import '@/styles/globals.css'
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider } from "next-themes";

export default function App({ Component, pageProps }) {

  const [queryClient] = useState(() => new QueryClient())

  return (
    <>
      <Script async defer data-website-id="d2ad8970-0b32-4ada-93a6-cfbd95030fda" src="https://umai.supertype.ai/umami.js" />
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ThemeProvider attribute="class">
            <Component {...pageProps} />
          </ThemeProvider>
        </Hydrate>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  )
}
