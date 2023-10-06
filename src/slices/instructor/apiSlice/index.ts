/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3333/instructors',
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as { auth: { token: string | null } }
    const token = state.auth.token
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  },
})

export const instructorApiSlice = createApi({
  reducerPath: 'instructorApi',
  baseQuery,
  tagTypes: ['Instructor'],
  endpoints: (_builder) => ({}),
})
