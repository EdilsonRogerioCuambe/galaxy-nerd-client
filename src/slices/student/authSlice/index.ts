import { createSlice } from '@reduxjs/toolkit'

const storedStudent = localStorage.getItem('student')
const storedToken = localStorage.getItem('studentToken')

let parsedStudent = null

if (storedStudent) {
  try {
    parsedStudent = JSON.parse(storedStudent)
  } catch (e) {
    console.error(e)
  }
}

const initialState = {
  student: parsedStudent,
  studentToken: storedToken || null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action) {
      state.student = action.payload.student
      state.studentToken = action.payload.token
      localStorage.setItem('student', JSON.stringify(action.payload.student))
      localStorage.setItem('studentToken', action.payload.studentToken)
    },
    logout: (state) => {
      state.student = null
      state.studentToken = null
      localStorage.removeItem('student')
      localStorage.removeItem('studentToken')
    },
  },
})

export const { setCredentials, logout } = authSlice.actions

export default authSlice.reducer
