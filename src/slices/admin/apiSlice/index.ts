/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BaseQueryApi,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'
import { RootState } from '../../../store'
import { logout, setCredentials } from '../authSlice'

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3333',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).adminAuth.token
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  },
})

const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {},
) => {
  let result = await baseQuery(args, api, extraOptions)
  const user = (api.getState() as RootState).adminAuth.user

  if (result?.error?.status === 401) {
    console.log('401 error, trying to refresh token')

    const refreshResult = await baseQuery(
      {
        url: 'http://localhost:3333/admin/token/refresh',
        method: 'PATCH',
      },
      api,
      extraOptions,
    )

    console.log('refreshResult', refreshResult)

    if (refreshResult?.data) {
      console.log('refreshResult.data', refreshResult.data)
      api.dispatch(setCredentials({ ...user, token: refreshResult.data }))
      result = await baseQuery(args, api, extraOptions)
    } else {
      console.log('refreshResult.data is null')
      api.dispatch(logout())
    }
  }

  return result
}

export const adminApiSlice = createApi({
  reducerPath: 'adminApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Admin'],
  endpoints: (_builder) => ({}),
})
