import { instructorApiSlice } from '.'

const INSTRUCTORS_API_ENDPOINT = '/instructors'

export const instructorsApiSlice = instructorApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInstructors: builder.query({
      query: () => INSTRUCTORS_API_ENDPOINT,
      providesTags: ['Instructor'],
    }),
    getInstructor: builder.query({
      query: (id) => `${INSTRUCTORS_API_ENDPOINT}/${id}`,
      providesTags: ['Instructor'],
    }),
    createInstructor: builder.mutation({
      query: (body) => ({
        url: INSTRUCTORS_API_ENDPOINT,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Instructor'],
    }),
    updateInstructor: builder.mutation({
      query: ({ id, body }) => ({
        url: `${INSTRUCTORS_API_ENDPOINT}/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Instructor'],
    }),
    deleteInstructor: builder.mutation({
      query: (id) => ({
        url: `${INSTRUCTORS_API_ENDPOINT}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Instructor'],
    }),
    login: builder.mutation({
      query: (body) => ({
        url: `${INSTRUCTORS_API_ENDPOINT}/sessions`,
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const {
  useGetInstructorsQuery,
  useGetInstructorQuery,
  useCreateInstructorMutation,
  useUpdateInstructorMutation,
  useDeleteInstructorMutation,
  useLoginMutation,
} = instructorsApiSlice
