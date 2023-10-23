import { questionApiSlice } from '.'

const QUESTIONS_API_ENDPOINT = '/forums'

export const questionsApiSlice = questionApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuestions: builder.query({
      query: () => QUESTIONS_API_ENDPOINT,
      providesTags: ['Question'],
    }),
    getQuestion: builder.query({
      query: (id) => `${QUESTIONS_API_ENDPOINT}/${id}`,
      providesTags: ['Question'],
    }),
    getQuestionBySlug: builder.query({
      query: (slug) => `${QUESTIONS_API_ENDPOINT}/slug/${slug}`,
      providesTags: ['Question'],
    }),
    createQuestion: builder.mutation({
      // rota prar :lessonId/:studentId
      query: ({ lessonId, studentId, body }) => ({
        url: `${QUESTIONS_API_ENDPOINT}/${lessonId}/${studentId}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Question'],
    }),
    updateQuestion: builder.mutation({
      query: ({ id, body }) => ({
        url: `${QUESTIONS_API_ENDPOINT}/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Question'],
    }),
    deleteQuestion: builder.mutation({
      query: (id) => ({
        url: `${QUESTIONS_API_ENDPOINT}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Question'],
    }),
  }),
})

export const {
  useGetQuestionsQuery,
  useGetQuestionQuery,
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
  useGetQuestionBySlugQuery,
} = questionsApiSlice
