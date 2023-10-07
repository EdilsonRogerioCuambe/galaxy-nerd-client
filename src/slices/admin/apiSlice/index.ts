/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../../../store'

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3333',
  prepareHeaders: (headers, { getState }) => {
    const adminAuth = (getState() as RootState).adminAuth
    console.log(adminAuth.token)

    if (adminAuth && adminAuth.token) {
      headers.set('authorization', `Bearer ${adminAuth.token}`)
    }
    return headers
  },
})

export const adminApiSlice = createApi({
  reducerPath: 'adminApi',
  baseQuery,
  tagTypes: ['Admin'],
  endpoints: (_builder) => ({}),
})
