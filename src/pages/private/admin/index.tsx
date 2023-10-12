import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'

export function AdminPrivateRoutes() {
  const { user } = useSelector((state: RootState) => state.adminAuth)

  if (!user) {
    return <Navigate to="/admin-login" />
  }

  return <Outlet />
}
