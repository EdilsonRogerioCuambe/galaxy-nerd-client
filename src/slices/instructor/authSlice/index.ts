import { createSlice } from '@reduxjs/toolkit'

const storedInstructor = localStorage.getItem('instructor')
const storedToken = localStorage.getItem('instructorToken')
const googleToken = localStorage.getItem('googleToken')

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
  googleToken: googleToken || null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action) {
      state.instructor = action.payload.instructor
      state.instructorToken = action.payload.token
      state.googleToken = action.payload.googleToken

      localStorage.setItem(
        'instructor',
        JSON.stringify(action.payload.instructor),
      )
      localStorage.setItem('instructorToken', action.payload.instructorToken)
      localStorage.setItem('googleToken', action.payload.googleToken)
    },
    logout: (state) => {
      state.instructor = null
      state.instructorToken = null
      state.googleToken = null
      localStorage.removeItem('instructor')
      localStorage.removeItem('instructorToken')
      localStorage.removeItem('googleToken')
    },
  },
})

export const { setCredentials, logout } = authSlice.actions

export default authSlice.reducer
