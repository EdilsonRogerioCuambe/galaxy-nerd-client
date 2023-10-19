import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'

export function InstructorPrivateRoutes() {
  const location = useLocation()
  const { instructor } = useSelector((state: RootState) => state.instructorAuth)

  if (!instructor) {
    return <Navigate to="/instructor-login" />
  }

  return instructor ? (
    <Outlet />
  ) : (
    <Navigate to="/instructor-login" state={{ from: location }} replace />
  )
}
