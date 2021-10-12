import { FC } from 'react'
import cn from 'classnames'

import Button from '@components/ui/Button'
import { useUI } from '@components/ui/context'
import SidebarLayout from '@components/common/SidebarLayout'
import useAddAddress from '@framework/customer/address/use-add-item'

import s from './ShippingView.module.css'
import { FormattedMessage } from 'react-intl'

interface Form extends HTMLFormElement {
  cardHolder: HTMLInputElement
  cardNumber: HTMLInputElement
  cardExpireDate: HTMLInputElement
  cardCvc: HTMLInputElement
  firstName: HTMLInputElement
  lastName: HTMLInputElement
  company: HTMLInputElement
  streetNumber: HTMLInputElement
  zipCode: HTMLInputElement
  city: HTMLInputElement
  country: HTMLSelectElement
}

const PaymentMethodView: FC = () => {
  const { setSidebarView } = useUI()
  const addAddress = useAddAddress()

  async function handleSubmit(event: React.ChangeEvent<Form>) {
    event.preventDefault()

    await addAddress({
      type: event.target.type.value,
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      company: event.target.company.value,
      streetNumber: event.target.streetNumber.value,
      apartments: event.target.streetNumber.value,
      zipCode: event.target.zipCode.value,
      city: event.target.city.value,
      country: event.target.country.value,
    })

    setSidebarView('CHECKOUT_VIEW')
  }

  return (
    <form className="h-full" onSubmit={handleSubmit}>
      <SidebarLayout handleBack={() => setSidebarView('CHECKOUT_VIEW')}>
        <div className="px-4 sm:px-6 flex-1">
          <h2 className="pt-1 pb-8 text-2xl font-semibold tracking-wide cursor-pointer inline-block">
            <FormattedMessage id="shipping" />
          </h2>
          <div>
            <div className="flex flex-row my-3 items-center">
              <input name="type" className={s.radio} type="radio" />
              <span className="ml-3 text-sm">
                <FormattedMessage id="same_as_billing_address" />
              </span>
            </div>
            <div className="flex flex-row my-3 items-center">
              <input name="type" className={s.radio} type="radio" />
              <span className="ml-3 text-sm">
                <FormattedMessage id="use_a_different_shipping_address" />
              </span>
            </div>
            <hr className="border-accent-2 my-6" />
            <div className="grid gap-3 grid-flow-row grid-cols-12">
              <div className={cn(s.fieldset, 'col-span-6')}>
                <label className={s.label}><FormattedMessage id="first_name" /></label>
                <input name="firstName" className={s.input} />
              </div>
              <div className={cn(s.fieldset, 'col-span-6')}>
                <label className={s.label}><FormattedMessage id="last_name" /></label>
                <input name="lastName" className={s.input} />
              </div>
            </div>
            <div className={s.fieldset}>
              <label className={s.label}><FormattedMessage id="company_optional" /></label>
              <input name="company" className={s.input} />
            </div>
            <div className={s.fieldset}>
              <label className={s.label}><FormattedMessage id="street_house_number" /></label>
              <input name="streetNumber" className={s.input} />
            </div>
            <div className={s.fieldset}>
              <label className={s.label}>
                <FormattedMessage id="apartment_optional" />
              </label>
              <input name="apartments" className={s.input} />
            </div>
            <div className="grid gap-3 grid-flow-row grid-cols-12">
              <div className={cn(s.fieldset, 'col-span-6')}>
                <label className={s.label}><FormattedMessage id="postal_code" /></label>
                <input name="zipCode" className={s.input} />
              </div>
              <div className={cn(s.fieldset, 'col-span-6')}>
                <label className={s.label}><FormattedMessage id="city" /></label>
                <input name="city" className={s.input} />
              </div>
            </div>
            <div className={s.fieldset}>
              <label className={s.label}><FormattedMessage id="country_region" /></label>
              <select name="country" className={s.select}>
                <option value="vn">Viet Nam</option>
              </select>
            </div>
          </div>
        </div>
        <div className="sticky z-20 bottom-0 w-full right-0 left-0 py-12 bg-accent-0 border-t border-accent-2 px-6">
          <Button type="submit" width="100%" variant="ghost">
            <FormattedMessage id="continue" />
          </Button>
        </div>
      </SidebarLayout>
    </form>
  )
}

export default PaymentMethodView
