/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BaseQueryApi,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'
import { RootState } from '../../store'
import { logout, setCredentials } from '../instructor/authSlice'

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3333',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).instructorAuth.instructorToken
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
  const user = (api.getState() as RootState).instructorAuth.instructor

  if (result?.error?.status === 401) {
    console.log('401 error, trying to refresh token')

    const refreshResult = await baseQuery(
      {
        url: 'http://localhost:3333/instrcutor/token/refresh',
        method: 'POST',
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

export const courseApiSlice = createApi({
  reducerPath: 'courseApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Course'],
  endpoints: (_builder) => ({}),
})
