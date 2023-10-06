/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3333',
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as { auth: { token: string | null } }
    let token = null
    if (state && state.auth) {
      token = state.auth.token
    }
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  },
})

export const courseApiSlice = createApi({
  reducerPath: 'courseApi',
  baseQuery,
  tagTypes: ['Course'],
  endpoints: (_builder) => ({}),
})
