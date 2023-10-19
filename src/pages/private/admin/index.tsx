import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'

export function AdminPrivateRoutes() {
  const location = useLocation()
  const { user: admin } = useSelector((state: RootState) => state.adminAuth)

  if (admin.ROLE !== 'ADMIN') {
    return <Navigate to="/admin-login" />
  }

  return admin.ROLE === 'ADMIN' ? (
    <Outlet />
  ) : (
    <Navigate to="/admin-login" state={{ from: location }} replace />
  )
}
