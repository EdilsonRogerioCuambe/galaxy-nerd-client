import { answerApiSlice } from '.'

const ANSWERS_API_ENDPOINT = '/answers'

export const answersApiSlice = answerApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAnswers: builder.query({
      query: () => ANSWERS_API_ENDPOINT,
      providesTags: ['Answer'],
    }),
    getAnswer: builder.query({
      query: (id) => `${ANSWERS_API_ENDPOINT}/${id}`,
      providesTags: ['Answer'],
    }),
    getChildrenAnswers: builder.query({
      query: (forumId) => `${ANSWERS_API_ENDPOINT}/${forumId}`,
      providesTags: ['Answer'],
    }),
    createAnswer: builder.mutation({
      query: (body) => ({
        url: `${ANSWERS_API_ENDPOINT}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Answer'],
    }),
    updateAnswer: builder.mutation({
      query: ({ id, body }) => ({
        url: `${ANSWERS_API_ENDPOINT}/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Answer'],
    }),
    deleteAnswer: builder.mutation({
      query: (id) => ({
        url: `${ANSWERS_API_ENDPOINT}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Answer'],
    }),
    upvoteAnswer: builder.mutation({
      query: ({ id, body }) => ({
        url: `${ANSWERS_API_ENDPOINT}/${id}/upvote`,
        method: 'POST',
        credentials: 'include',
        body,
      }),
      invalidatesTags: ['Answer'],
    }),
    downvoteAnswer: builder.mutation({
      query: ({ id, body }) => ({
        url: `${ANSWERS_API_ENDPOINT}/${id}/downvote`,
        method: 'POST',
        credentials: 'include',
        body,
      }),
      invalidatesTags: ['Answer'],
    }),
  }),
})

export const {
  useGetAnswersQuery,
  useGetAnswerQuery,
  useCreateAnswerMutation,
  useUpdateAnswerMutation,
  useDeleteAnswerMutation,
  useGetChildrenAnswersQuery,
  useUpvoteAnswerMutation,
  useDownvoteAnswerMutation,
} = answersApiSlice
