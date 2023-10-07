import { createSlice } from '@reduxjs/toolkit'

const storedUser = localStorage.getItem('user')
const storedToken = localStorage.getItem('token')

const initialState = {
  // Define o estado inicial do reducer
  user: storedUser ? JSON.parse(storedUser) : null,
  token: storedToken || null,
}

const authSlice = createSlice({
  // Cria um slice de reducer
  name: 'auth', // Define o nome do slice de reducer
  initialState, // Define o estado inicial do slice de reducer
  reducers: {
    // Define as actions e reducers do slice
    setCredentials(state, action) {
      // Define a action setCredentials
      state.user = action.payload.user
      state.token = action.payload.token
      localStorage.setItem('user', JSON.stringify(action.payload.user))
    },
    logout: (state, _action) => {
      state.user = null
      state.token = null
      localStorage.removeItem('user')
    },
  },
})

export const { setCredentials, logout } = authSlice.actions

export default authSlice.reducer
