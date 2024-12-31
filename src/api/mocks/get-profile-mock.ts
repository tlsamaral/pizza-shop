import { http, HttpResponse } from "msw";
import { GetProfileResponse } from "../get-profile";

export const getProfileMock = http.get<never, never, GetProfileResponse>('/me',  () => {
  return  HttpResponse.json({ 
    id: 'custom-user-id',
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: null,
    role: 'customer',
    createdAt: new Date(),
    updatedAt: null
   })
})