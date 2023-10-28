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
    addStudentScore: builder.mutation({
      query: ({ studentId, body }) => ({
        url: `${STUDENT_API_ENDPOINT}/${studentId}/scores`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Student'],
    }),
    getStudentById: builder.query({
      query: (id) => `${STUDENT_API_ENDPOINT}/${id}`,
      providesTags: ['Student'],
    }),
  }),
})

export const {
  useGetStudentQuery,
  useCreateStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
  useLoginMutation,
  useAddStudentScoreMutation,
  useGetStudentByIdQuery,
} = studentApi
