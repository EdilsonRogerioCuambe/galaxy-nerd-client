import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'

export function AdminPrivateRoutes() {
  const location = useLocation()
  const { user, token } = useSelector((state: RootState) => state.adminAuth)

  if (!user) {
    return <Navigate to="/admin-login" />
  }

  if (!token) {
    return <Navigate to="/admin-login" />
  }

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/admin-login" state={{ from: location }} replace />
  )
}
