import '@assets/main.css'
import '@assets/chrome-bug.css'
import 'keen-slider/keen-slider.min.css'

import { FC, useEffect } from 'react'
import type { AppProps } from 'next/app'
import { Head } from '@components/common'
import { ManagedUIContext } from '@components/ui/context'
import { useRouter } from 'next/router'
import { IntlProvider } from 'react-intl'
import vi from '../locales/vi.json'
import en from '../locales/en.json'

const Noop: FC = ({ children }: any) => <>{children}</>
const messages: any = {
  en: en,
  vi: vi
}

export default function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop
  const { 
    locale,
    defaultLocale = 'vi',
  } = useRouter()

  const languages = messages[locale || defaultLocale];

  useEffect(() => {
    document.body.classList?.remove('loading')
  }, [])

  return (
    <IntlProvider locale={locale || defaultLocale } defaultLocale={defaultLocale} messages={languages}>
      <Head />
      <ManagedUIContext>
        <Layout pageProps={pageProps}>
          <Component {...pageProps} />
        </Layout>
      </ManagedUIContext>
    </IntlProvider>
  )
}
