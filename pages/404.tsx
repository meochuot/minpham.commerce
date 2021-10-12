import type { GetStaticPropsContext } from 'next'
import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import { Text } from '@components/ui'
import { FormattedMessage } from 'react-intl'

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const { pages } = await commerce.getAllPages({ config, preview })
  const { categories, brands } = await commerce.getSiteInfo({ config, preview })
  return {
    props: {
      pages,
      categories,
      brands,
    },
    revalidate: 200,
  }
}

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-8 sm:mx-auto py-20 flex flex-col items-center justify-center fit">
      <Text variant="heading"><FormattedMessage id="not_found" /></Text>
      <Text className="">
        <FormattedMessage id="not_found_warning" />
      </Text>
    </div>
  )
}

NotFound.Layout = Layout
