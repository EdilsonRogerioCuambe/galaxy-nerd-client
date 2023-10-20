/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  createApi,
  fetchBaseQuery,
  FetchArgs,
  BaseQueryApi,
} from '@reduxjs/toolkit/query/react'
import { RootState } from '../../../store'
import { logout, setCredentials } from '../authSlice'

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
  const instructorAuth = (api.getState() as RootState).instructorAuth

  if (result?.error?.status === 401) {
    console.log('401 error, trying to refresh token')

    const refreshResult = await baseQuery(
      {
        url: 'http://localhost:3333/instructor/token/refresh',
        method: 'PATCH',
      },
      api,
      extraOptions,
    )

    console.log('refreshResult', refreshResult)

    if (refreshResult?.data) {
      console.log('refreshResult.data', refreshResult.data)
      api.dispatch(
        setCredentials({
          ...instructorAuth,
          instructorToken: refreshResult.data,
        }),
      )
      result = await baseQuery(args, api, extraOptions)
    } else {
      console.log('refreshResult.data is null')
      api.dispatch(logout())
    }
  }

  return result
}

export const instructorApiSlice = createApi({
  reducerPath: 'instructorApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Instructor'],
  endpoints: (_builder) => ({}),
})
