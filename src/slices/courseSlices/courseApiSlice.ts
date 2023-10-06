import { courseApiSlice } from '.'

const COURSES_API_ENDPOINT = '/courses'

export const coursesApiSlice = courseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: () => COURSES_API_ENDPOINT,
      providesTags: ['Course'],
    }),
    getCourse: builder.query({
      query: (id) => `${COURSES_API_ENDPOINT}/${id}`,
      providesTags: ['Course'],
    }),
    createCourse: builder.mutation({
      query: (body) => ({
        url: COURSES_API_ENDPOINT,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Course'],
    }),
    updateCourse: builder.mutation({
      query: ({ id, body }) => ({
        url: `${COURSES_API_ENDPOINT}/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Course'],
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `${COURSES_API_ENDPOINT}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Course'],
    }),
  }),
})

export const {
  useGetCoursesQuery,
  useGetCourseQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} = coursesApiSlice
