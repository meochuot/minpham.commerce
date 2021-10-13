import type { GetStaticPropsContext } from 'next'
import useCustomer from '@framework/customer/use-customer'
import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import { Container, Text } from '@components/ui'
import { StyledText } from '@components/ui/Text'

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { pages } = await pagesPromise
  const { categories } = await siteInfoPromise

  return {
    props: { pages, categories },
  }
}

export default function Profile() {
  const { data } = useCustomer()
  return (
    <Container>
      <Text variant="pageHeading"><StyledText id="my_profile" /></Text>
      {data && (
        <div className="grid lg:grid-cols-12">
          <div className="lg:col-span-8 pr-4">
            <div>
              <Text variant="sectionHeading"><StyledText id="full_name" /></Text>
              <span>
                {data.firstName} {data.lastName}
              </span>
            </div>
            <div className="mt-5">
              <Text variant="sectionHeading"><StyledText id="email" /></Text>
              <span>{data.email}</span>
            </div>
          </div>
        </div>
      )}
    </Container>
  )
}

Profile.Layout = Layout
