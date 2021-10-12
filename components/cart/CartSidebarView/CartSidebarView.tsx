import cn from 'classnames'
import Link from 'next/link'
import { FC } from 'react'
import s from './CartSidebarView.module.css'
import CartItem from '../CartItem'
import { Button, Text } from '@components/ui'
import { useUI } from '@components/ui/context'
import { Bag, Cross, Check } from '@components/icons'
import useCart from '@framework/cart/use-cart'
import usePrice from '@framework/product/use-price'
import SidebarLayout from '@components/common/SidebarLayout'
import { FormattedMessage } from 'react-intl'

const CartSidebarView: FC = () => {
  const { closeSidebar, setSidebarView } = useUI()
  const { data, isLoading, isEmpty } = useCart()

  const { price: subTotal } = usePrice(
    data && {
      amount: Number(data.subtotalPrice),
      currencyCode: data.currency.code,
    }
  )
  const { price: total } = usePrice(
    data && {
      amount: Number(data.totalPrice),
      currencyCode: data.currency.code,
    }
  )
  const handleClose = () => closeSidebar()
  const goToCheckout = () => setSidebarView('CHECKOUT_VIEW')

  const error = null
  const success = null

  return (
    <SidebarLayout
      className={cn({
        [s.empty]: error || success || isLoading || isEmpty,
      })}
      handleClose={handleClose}
    >
      {isLoading || isEmpty ? (
        <div className="flex-1 px-4 flex flex-col justify-center items-center">
          <span className="border border-dashed border-primary rounded-full flex items-center justify-center w-16 h-16 p-12 bg-secondary text-secondary">
            <Bag className="absolute" />
          </span>
          <h2 className="pt-6 text-2xl font-bold tracking-wide text-center">
            <FormattedMessage id="cart_is_empty" />
          </h2>
          <p className="text-accent-3 px-10 text-center pt-2">
            <FormattedMessage id="order_cart_checkout_warning" />
          </p>
        </div>
      ) : error ? (
        <div className="flex-1 px-4 flex flex-col justify-center items-center">
          <span className="border border-white rounded-full flex items-center justify-center w-16 h-16">
            <Cross width={24} height={24} />
          </span>
          <h2 className="pt-6 text-xl font-light text-center">
            <FormattedMessage id="checkout_check_cart" />
          </h2>
        </div>
      ) : success ? (
        <div className="flex-1 px-4 flex flex-col justify-center items-center">
          <span className="border border-white rounded-full flex items-center justify-center w-16 h-16">
            <Check />
          </span>
          <h2 className="pt-6 text-xl font-light text-center">
            <FormattedMessage id="thank_you_order" />
          </h2>
        </div>
      ) : (
        <>
          <div className="px-4 sm:px-6 flex-1">
            <Link href="/cart">
              <a>
                <Text variant="sectionHeading" onClick={handleClose}>
                  <FormattedMessage id="my_cart" />
                </Text>
              </a>
            </Link>
            <ul className={s.lineItemsList}>
              {data!.lineItems.map((item: any) => (
                <CartItem
                  key={item.id}
                  item={item}
                  currencyCode={data!.currency.code}
                />
              ))}
            </ul>
          </div>

          <div className="flex-shrink-0 px-6 py-6 sm:px-6 sticky z-20 bottom-0 w-full right-0 left-0 bg-accent-0 border-t text-sm">
            <ul className="pb-2">
              <li className="flex justify-between py-1">
                <span><FormattedMessage id="sub_total" /></span>
                <span>{subTotal}</span>
              </li>
              <li className="flex justify-between py-1">
                <span><FormattedMessage id="taxes" /></span>
                <span><FormattedMessage id="calculated_at_checkout" /></span>
              </li>
              <li className="flex justify-between py-1">
                <span><FormattedMessage id="shipping" /></span>
                <span className="font-bold tracking-wide"><FormattedMessage id="FREE" /></span>
              </li>
            </ul>
            <div className="flex justify-between border-t border-accent-2 py-3 font-bold mb-2">
              <span><FormattedMessage id="total" /></span>
              <span>{total}</span>
            </div>
            <div>
              {process.env.COMMERCE_CUSTOMCHECKOUT_ENABLED ? (
                <Button Component="a" width="100%" onClick={goToCheckout}>
                  <FormattedMessage id="proceed_to_checkout" /> ({total})
                </Button>
              ) : (
                <Button href="/checkout" Component="a" width="100%">
                  <FormattedMessage id="proceed_to_checkout" />
                </Button>
              )}
            </div>
          </div>
        </>
      )}
    </SidebarLayout>
  )
}

export default CartSidebarView
