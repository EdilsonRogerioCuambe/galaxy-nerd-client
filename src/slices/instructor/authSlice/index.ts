import { createSlice } from '@reduxjs/toolkit'

const storedInstructor = localStorage.getItem('instructor')
const storedToken = localStorage.getItem('instructorToken')

let parsedInstructor = null

if (storedInstructor) {
  try {
    parsedInstructor = JSON.parse(storedInstructor)
  } catch (e) {
    console.error(e)
  }
}

const initialState = {
  instructor: parsedInstructor,
  instructorToken: storedToken || null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action) {
      state.instructor = action.payload.instructor
      state.instructorToken = action.payload.token
      localStorage.setItem(
        'instructor',
        JSON.stringify(action.payload.instructor),
      )
      localStorage.setItem('instructorToken', action.payload.instructorToken)
    },
    logout: (state) => {
      state.instructor = null
      state.instructorToken = null
      localStorage.removeItem('instructor')
      localStorage.removeItem('instructorToken')
    },
  },
})

export const { setCredentials, logout } = authSlice.actions

export default authSlice.reducer
