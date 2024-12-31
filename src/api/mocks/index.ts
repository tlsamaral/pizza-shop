import { env } from '@/env'
import { setupWorker } from 'msw/browser'
import { signInMock } from './sign-in.mock'
import { registerRestaurantMock } from './register-restaurant-mock'
import { getDayOrdersAmountMock } from './get-day-orders-amount'
import { getMonthCanceledOrdersAmountMock } from './get-month-canceled-orders-amount'
import { getMonthRevenueMock } from './get-month-revenue'
import { getMonthOrdersAmountMock } from './get-month-orders-amount'
import { gedailyRevenueInPeriodMock } from './get-daily-revenue-in-period'
import { getPopularProductsMock } from './get-popular-products'
import { getProfileMock } from './get-profile-mock'
import { updateProfileMock } from './update-profile-mock'
import { getManagedRestaurantMock } from './get-managed-restaurant-mock'
import { getOrdersMock } from './get-orders-mock'
import { getOrderDetailsMock } from './get-order-details'
import { approveOrderMock } from './approve-order-mock'
import { cancelOrderMock } from './cancel-order-mock'
import { deliverOrderMock } from './deliver-order-mock'
import { dispatchOrderMock } from './dispatch-order-mock'

export const worker = setupWorker(
  signInMock, 
  registerRestaurantMock, 
  getDayOrdersAmountMock, 
  getMonthCanceledOrdersAmountMock, 
  getMonthOrdersAmountMock, 
  getMonthRevenueMock,
  gedailyRevenueInPeriodMock,
  getPopularProductsMock,
  getProfileMock,
  updateProfileMock, 
  getManagedRestaurantMock,
  getOrdersMock,
  getOrderDetailsMock,
  approveOrderMock,
  cancelOrderMock,
  deliverOrderMock,
  dispatchOrderMock
)

export async function enableMSW() {
  if(env.MODE !== 'test') {
    return 
  }
  await worker.start()
}