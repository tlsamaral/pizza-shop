import { http, HttpResponse } from "msw";
import { GetManageRestaurantResponse } from "../get-managed-restaurant";

export const getManagedRestaurantMock = http.get<never, never, GetManageRestaurantResponse>('/managed-restaurant',  () => {
  return  HttpResponse.json({ 
    id: 'custom-restaurant-id',
    name: 'Pizza Shop',
    managerId: 'custom-manager-id',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    createdAt: new Date(),
    updatedAt: null
   })
})