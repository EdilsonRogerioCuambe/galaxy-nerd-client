import { problemApiSlice } from '.'

const PROBLEMS_API_ENDPOINT = 'http://localhost:3333/problems'

export const problemsApiSlice = problemApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProblems: builder.query({
      query: () => PROBLEMS_API_ENDPOINT,
      providesTags: ['Problem'],
    }),
    getProblem: builder.query({
      query: (id) => `${PROBLEMS_API_ENDPOINT}/${id}`,
      providesTags: ['Problem'],
    }),
    getProblemByLessonId: builder.query({
      query: (lessonId) => `${PROBLEMS_API_ENDPOINT}/${lessonId}`,
      providesTags: ['Problem'],
    }),
    createProblem: builder.mutation({
      query: (body) => ({
        url: PROBLEMS_API_ENDPOINT,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Problem'],
    }),
    updateProblem: builder.mutation({
      query: ({ id, body }) => ({
        url: `${PROBLEMS_API_ENDPOINT}/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Problem'],
    }),
    deleteProblem: builder.mutation({
      query: (id) => ({
        url: `${PROBLEMS_API_ENDPOINT}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Problem'],
    }),
  }),
})

export const {
  useGetProblemsQuery,
  useGetProblemQuery,
  useCreateProblemMutation,
  useUpdateProblemMutation,
  useDeleteProblemMutation,
  useGetProblemByLessonIdQuery,
} = problemsApiSlice
