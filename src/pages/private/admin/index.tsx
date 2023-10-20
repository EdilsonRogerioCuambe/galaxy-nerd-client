import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'

export function AdminPrivateRoutes() {
  const { user: admin } = useSelector((state: RootState) => state.adminAuth)

  if (admin) {
    return <Outlet />
  } else {
    return <Navigate to="/admin-login" />
  }
}
