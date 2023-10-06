/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../../../store'

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3333',
  prepareHeaders: (headers, { getState }) => {
    const state: RootState = getState() as RootState
    const token = state.adminAuth.token
    headers.set('authorization', `Bearer ${token}`)
    console.log(token)
    return headers
  },
})

export const adminApiSlice = createApi({
  reducerPath: 'adminApi',
  baseQuery,
  tagTypes: ['Admin'],
  endpoints: (_builder) => ({}),
})
