import { quizApi } from '.'

const QUIZ_API_ENDPOINT = '/quizzes'

export const quizzesApiSlice = quizApi.injectEndpoints({
  endpoints: (builder) => ({
    getQuizzes: builder.query({
      query: () => QUIZ_API_ENDPOINT,
      providesTags: ['Quiz'],
    }),
    getQuiz: builder.query({
      query: (id) => `${QUIZ_API_ENDPOINT}/${id}`,
      providesTags: ['Quiz'],
    }),
    getQuizzesByLessonId: builder.query({
      query: (lessonId) => `${QUIZ_API_ENDPOINT}/${lessonId}`,
      providesTags: ['Quiz'],
    }),
    createQuiz: builder.mutation({
      query: (body) => ({
        url: QUIZ_API_ENDPOINT,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Quiz'],
    }),
    updateQuiz: builder.mutation({
      query: ({ id, body }) => ({
        url: `${QUIZ_API_ENDPOINT}/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Quiz'],
    }),
    deleteQuiz: builder.mutation({
      query: (id) => ({
        url: `${QUIZ_API_ENDPOINT}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Quiz'],
    }),
  }),
})

export const {
  useGetQuizzesQuery,
  useGetQuizQuery,
  useCreateQuizMutation,
  useUpdateQuizMutation,
  useDeleteQuizMutation,
  useGetQuizzesByLessonIdQuery,
} = quizzesApiSlice
