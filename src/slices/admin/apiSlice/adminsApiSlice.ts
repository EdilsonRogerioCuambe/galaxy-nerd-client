import { adminApiSlice } from '.'

const ADMINS_API_ENDPOINT = '/admins'

export const adminsApiSlice = adminApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdmins: builder.query({
      query: () => ADMINS_API_ENDPOINT,
      providesTags: ['Admin'],
    }),
    getAdmin: builder.query({
      query: (id) => `${ADMINS_API_ENDPOINT}/${id}`,
      providesTags: ['Admin'],
    }),
    createAdmin: builder.mutation({
      query: (body) => ({
        url: ADMINS_API_ENDPOINT,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Admin'],
    }),
    updateAdmin: builder.mutation({
      query: ({ id, body }) => ({
        url: `${ADMINS_API_ENDPOINT}/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Admin'],
    }),
    deleteAdmin: builder.mutation({
      query: (id) => ({
        url: `${ADMINS_API_ENDPOINT}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Admin'],
    }),
    login: builder.mutation({
      query: (body) => ({
        url: `${ADMINS_API_ENDPOINT}/sessions`,
        method: 'POST',
        body,
      }),
    }),
    refreshToken: builder.mutation({
      query: () => ({
        url: 'http://localhost:3333/token/refresh',
        method: 'PATCH',
      }),
    }),
  }),
})

export const {
  useGetAdminsQuery,
  useGetAdminQuery,
  useCreateAdminMutation,
  useUpdateAdminMutation,
  useDeleteAdminMutation,
  useLoginMutation,
  useRefreshTokenMutation,
} = adminsApiSlice
