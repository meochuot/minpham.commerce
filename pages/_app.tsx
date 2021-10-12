import '@assets/main.css'
import '@assets/chrome-bug.css'
import 'keen-slider/keen-slider.min.css'

import { FC, useEffect } from 'react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { IntlProvider } from 'react-intl'
import { Head } from '@components/common'
import { ManagedUIContext } from '@components/ui/context'
import vi from '../locales/vi.json'
import en from '../locales/en.json'

const Noop: FC = ({ children }) => <>{children}</>
const messages: any = {
  'vi': vi,
  'en': en
}

export default function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop
  const { locale, defaultLocale } = useRouter();
  const lang = locale || defaultLocale || 'vi';
  
  useEffect(() => {
    document.body.classList?.remove('loading')
  }, [])

  return (
    <IntlProvider locale={lang} messages={messages[lang]} defaultLocale={defaultLocale}>
      <Head />
      <ManagedUIContext>
        <Layout pageProps={pageProps}>
          <Component {...pageProps} />
        </Layout>
      </ManagedUIContext>
    </IntlProvider>
  )
}
