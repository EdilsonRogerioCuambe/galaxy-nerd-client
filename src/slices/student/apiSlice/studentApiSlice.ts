import { studentApiSlice } from '.'

const STUDENT_API_ENDPOINT = 'students'

export const studentApi = studentApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStudent: builder.query({
      query: () => STUDENT_API_ENDPOINT,
      providesTags: ['Student'],
    }),
    createStudent: builder.mutation({
      query: (body) => ({
        url: STUDENT_API_ENDPOINT,
        method: 'POST',
        body,
        formData: true,
      }),
      invalidatesTags: ['Student'],
    }),
    updateStudent: builder.mutation({
      query: ({ id, body }) => ({
        url: `${STUDENT_API_ENDPOINT}/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Student'],
    }),
    deleteStudent: builder.mutation({
      query: (id) => ({
        url: `${STUDENT_API_ENDPOINT}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Student'],
    }),
    login: builder.mutation({
      query: (body) => ({
        url: `${STUDENT_API_ENDPOINT}/sessions`,
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const {
  useGetStudentQuery,
  useCreateStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
  useLoginMutation,
} = studentApi
