import axios from 'axios'
import jwtDecode from 'jwt-decode'
import store from '../store'
import { refreshToken } from '../slices/admin/authSlice'

export const axiosPublic = axios.create({
  baseURL: 'http://localhost:3333/admins',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const axiosPrivate = axios.create({
  baseURL: 'http://localhost:3333/admins',
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosPrivate.interceptors.request.use(
  async (config) => {
    const adminToken = localStorage.getItem('token')

    const currentDate = new Date()

    if (adminToken) {
      const decodedToken: { exp: number } = jwtDecode(adminToken)
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        store.dispatch(refreshToken({ token: adminToken }))
        if (config.headers) {
          config.headers.Authorization = `Bearer ${localStorage.getItem(
            'token',
          )}`
        }
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)
