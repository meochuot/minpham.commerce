import '@assets/main.css'
import '@assets/chrome-bug.css'
import 'keen-slider/keen-slider.min.css'

import { FC, useEffect } from 'react'
import type { AppProps } from 'next/app'
import { IntlProvider } from 'react-intl'
import { Head } from '@components/common'
import { ManagedUIContext } from '@components/ui/context'
import vi from '../locales/vi.json'
import en from '../locales/en.json'
import { useLanguage } from '@hooks/useLanguage'

const Noop: FC = ({ children }: any) => <>{children}</>
const messages: any = {
  'vi': vi,
  'en': en
}

export default function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop
  const { locale } = useLanguage();
  
  useEffect(() => {
    document.body.classList?.remove('loading')
  }, [])

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <Head />
      <ManagedUIContext>
        <Layout pageProps={pageProps}>
          <Component {...pageProps} />
        </Layout>
      </ManagedUIContext>
    </IntlProvider>
  )
}
