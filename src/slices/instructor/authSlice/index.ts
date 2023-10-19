import { createSlice } from '@reduxjs/toolkit'

const storedInstructor = localStorage.getItem('instructor')
const storedToken = localStorage.getItem('token')

const initialState = {
  instructor: storedInstructor ? JSON.parse(storedInstructor) : null,
  token: storedToken || null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action) {
      state.instructor = action.payload.instructor
      state.token = action.payload.token
      localStorage.setItem('user', JSON.stringify(action.payload.instructor))
      localStorage.setItem('token', action.payload.token)
    },
    logout: (state) => {
      state.instructor = null
      state.token = null
      localStorage.removeItem('instructor')
      localStorage.removeItem('token')
    },
  },
})

export const { setCredentials, logout } = authSlice.actions

export default authSlice.reducer
