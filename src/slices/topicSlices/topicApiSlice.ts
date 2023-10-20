import { topicApiSlice } from '.'

const TOPICS_API_ENDPOINT = '/topics'

export const topicsApiSlice = topicApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTopics: builder.query({
      query: () => TOPICS_API_ENDPOINT,
      providesTags: ['Topic'],
    }),
    getTopic: builder.query({
      query: (id) => `${TOPICS_API_ENDPOINT}/${id}`,
      providesTags: ['Topic'],
    }),
    getTopicBySlug: builder.query({
      query: (slug) => `${TOPICS_API_ENDPOINT}/slug/${slug}`,
      providesTags: ['Topic'],
    }),
    createTopic: builder.mutation({
      query: (body) => ({
        url: TOPICS_API_ENDPOINT,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Topic'],
    }),
    updateTopic: builder.mutation({
      query: ({ id, body }) => ({
        url: `${TOPICS_API_ENDPOINT}/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Topic'],
    }),
    deleteTopic: builder.mutation({
      query: (id) => ({
        url: `${TOPICS_API_ENDPOINT}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Topic'],
    }),
  }),
})

export const {
  useGetTopicsQuery,
  useGetTopicQuery,
  useCreateTopicMutation,
  useUpdateTopicMutation,
  useDeleteTopicMutation,
  useGetTopicBySlugQuery,
} = topicsApiSlice
