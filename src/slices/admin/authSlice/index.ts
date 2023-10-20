/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'

const storedUser = localStorage.getItem('user')
const storedToken = localStorage.getItem('token')

let parsedUser = null

if (storedUser) {
  try {
    parsedUser = JSON.parse(storedUser)
  } catch (e) {
    console.error(e)
  }
} else {
  console.log("'user' is not defined in localStorage")
}

const initialState = {
  user: parsedUser,
  token: storedToken || null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action) {
      state.user = action.payload.user
      state.token = action.payload.token
      localStorage.setItem('user', JSON.stringify(action.payload.user))
      localStorage.setItem('token', action.payload.token)
    },
    logout: (state) => {
      state.user = null
      state.token = null
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    },
  },
})

export const { setCredentials, logout } = authSlice.actions

export default authSlice.reducer
