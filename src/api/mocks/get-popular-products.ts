import { http, HttpResponse } from "msw";
import { GetPopularProductsResponse } from "../get-popular-products";

export const getPopularProductsMock = http.get<never, never, GetPopularProductsResponse>('/metrics/popular-products',  () => {
  return  HttpResponse.json([
    { product: 'Pizza', amount: 10 },
    { product: 'Burger', amount: 5 },
    { product: 'Pasta', amount: 3 },
    { product: 'Salad', amount: 2 },
    { product: 'Sushi', amount: 1 },
  ])
})