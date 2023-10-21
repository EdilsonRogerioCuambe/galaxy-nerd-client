import { configureStore } from '@reduxjs/toolkit'
import adminAuthReducer from './slices/admin/authSlice'
import { adminApiSlice } from './slices/admin/apiSlice'
import instructorAuthReducer from './slices/instructor/authSlice'
import { instructorApiSlice } from './slices/instructor/apiSlice'
import { categoryApiSlice } from './slices/categorySlices'
import { courseApiSlice } from './slices/courseSlices'
import { topicApiSlice } from './slices/topicSlices'
import { lessonApiSlice } from './slices/lessonsSlices'

const store = configureStore({
  reducer: {
    adminAuth: adminAuthReducer,
    [adminApiSlice.reducerPath]: adminApiSlice.reducer,
    instructorAuth: instructorAuthReducer,
    [instructorApiSlice.reducerPath]: instructorApiSlice.reducer,
    [categoryApiSlice.reducerPath]: categoryApiSlice.reducer,
    [courseApiSlice.reducerPath]: courseApiSlice.reducer,
    [topicApiSlice.reducerPath]: topicApiSlice.reducer,
    [lessonApiSlice.reducerPath]: lessonApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      adminApiSlice.middleware,
      instructorApiSlice.middleware,
      categoryApiSlice.middleware,
      courseApiSlice.middleware,
      topicApiSlice.middleware,
      lessonApiSlice.middleware,
    ),
  devTools: true,
})

export default store

export type RootState = ReturnType<typeof store.getState>
