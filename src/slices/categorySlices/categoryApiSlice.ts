import { categoryApiSlice } from '.'

const CATEGORIES_API_ENDPOINT = '/categories'

export const categoriesApiSlice = categoryApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => CATEGORIES_API_ENDPOINT,
      providesTags: ['Category'],
    }),
    getCategory: builder.query({
      query: (id) => `${CATEGORIES_API_ENDPOINT}/${id}`,
      providesTags: ['Category'],
    }),
    createCategory: builder.mutation({
      query: (body) => ({
        url: CATEGORIES_API_ENDPOINT,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Category'],
    }),
    updateCategory: builder.mutation({
      query: ({ id, body }) => ({
        url: `${CATEGORIES_API_ENDPOINT}/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Category'],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `${CATEGORIES_API_ENDPOINT}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Category'],
    }),
  }),
})

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApiSlice
