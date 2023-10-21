import { lessonApiSlice } from '.'

const LESSONS_API_ENDPOINT = 'lessons'

export const lessonsApiSlice = lessonApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLessons: builder.query({
      query: () => LESSONS_API_ENDPOINT,
      providesTags: ['Lesson'],
    }),
    getLesson: builder.query({
      query: (id) => `${LESSONS_API_ENDPOINT}/${id}`,
      providesTags: ['Lesson'],
    }),
    getLessonBySlug: builder.query({
      query: (slug) => `${LESSONS_API_ENDPOINT}/slug/${slug}`,
      providesTags: ['Lesson'],
    }),
    createLesson: builder.mutation({
      query: (body) => ({
        url: LESSONS_API_ENDPOINT,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Lesson'],
    }),
    updateLesson: builder.mutation({
      query: ({ id, body }) => ({
        url: `${LESSONS_API_ENDPOINT}/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Lesson'],
    }),
    deleteLesson: builder.mutation({
      query: (id) => ({
        url: `${LESSONS_API_ENDPOINT}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Lesson'],
    }),
  }),
})

export const {
  useGetLessonsQuery,
  useGetLessonQuery,
  useCreateLessonMutation,
  useUpdateLessonMutation,
  useDeleteLessonMutation,
  useGetLessonBySlugQuery,
} = lessonsApiSlice
