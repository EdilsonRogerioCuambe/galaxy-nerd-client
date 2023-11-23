import { configureStore } from '@reduxjs/toolkit'
import adminAuthReducer from './slices/admin/authSlice'
import { adminApiSlice } from './slices/admin/apiSlice'
import instructorAuthReducer from './slices/instructor/authSlice'
import { instructorApiSlice } from './slices/instructor/apiSlice'
import { categoryApiSlice } from './slices/categorySlices'
import { courseApiSlice } from './slices/courseSlices'
import { topicApiSlice } from './slices/topicSlices'
import { lessonApiSlice } from './slices/lessonsSlices'
import studentAuthReducer from './slices/student/authSlice'
import { studentApiSlice } from './slices/student/apiSlice'
import { questionApiSlice } from './slices/questionSlices'
import { answerApiSlice } from './slices/answersSlices'
import { quizApi } from './slices/quizzesSlices'
import { problemApiSlice } from './slices/problemsApiSlices'

const store = configureStore({
  reducer: {
    adminAuth: adminAuthReducer,
    [adminApiSlice.reducerPath]: adminApiSlice.reducer,
    instructorAuth: instructorAuthReducer,
    [instructorApiSlice.reducerPath]: instructorApiSlice.reducer,
    studentAuth: studentAuthReducer,
    [studentApiSlice.reducerPath]: studentApiSlice.reducer,
    [categoryApiSlice.reducerPath]: categoryApiSlice.reducer,
    [courseApiSlice.reducerPath]: courseApiSlice.reducer,
    [topicApiSlice.reducerPath]: topicApiSlice.reducer,
    [lessonApiSlice.reducerPath]: lessonApiSlice.reducer,
    [questionApiSlice.reducerPath]: questionApiSlice.reducer,
    [answerApiSlice.reducerPath]: answerApiSlice.reducer,
    [quizApi.reducerPath]: quizApi.reducer,
    [problemApiSlice.reducerPath]: problemApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      adminApiSlice.middleware,
      instructorApiSlice.middleware,
      categoryApiSlice.middleware,
      courseApiSlice.middleware,
      topicApiSlice.middleware,
      lessonApiSlice.middleware,
      studentApiSlice.middleware,
      questionApiSlice.middleware,
      answerApiSlice.middleware,
      quizApi.middleware,
      problemApiSlice.middleware,
    ),
  devTools: true,
})

export default store

export type RootState = ReturnType<typeof store.getState>
