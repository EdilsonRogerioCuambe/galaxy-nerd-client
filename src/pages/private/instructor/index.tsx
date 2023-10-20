import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'

export function InstructorPrivateRoutes() {
  const { instructor } = useSelector((state: RootState) => state.instructorAuth)

  if (instructor) {
    return <Outlet />
  } else {
    return <Navigate to="/instructor-login" />
  }
}
