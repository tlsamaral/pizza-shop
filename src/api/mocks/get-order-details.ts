import { http, HttpResponse } from "msw";
import { GetOrderDetailsParams, GetOrderDetailsResponse } from "../get-order-details";

export const getOrderDetailsMock = http.get<GetOrderDetailsParams, never, GetOrderDetailsResponse>(
  '/orders/:orderId',  
  ({ params }) => {
  return  HttpResponse.json({ 
    id: params.orderId,
    status: 'pending',
    customer: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '123456789',
    },
    createdAt: new Date().toISOString(),
    totalInCents: 500,
    orderItems: [
      {
        id: 'order-item-1',
        priceInCents: 100,
        quantity: 1,
        product: {
          name: 'Pizza',
        },
      },
      {
        id: 'order-item-2',
        priceInCents: 400,
        quantity: 2,
        product: {
          name: 'Pizza de Calabresa',
        },
      },
    ],
   })
})