import { Route, Routes } from 'react-router-dom'
import Aos from 'aos'
import { Home } from './pages/home'
import { Course } from './pages/course'
import { Lessons } from './pages/lessons'
import { CoursesLists } from './pages/courses-lists'
import { Register } from './pages/register'
import { Dashboard } from './pages/dashboard'
import { Categories } from './pages/categories'
import { AddCourse } from './pages/add-course'
import { AdminLogin } from './pages/login/admin'
import { AdminDashboard } from './pages/dashboard/admin'
import { AdminCategories } from './pages/categories/admin'
import { AdminCoursesLists } from './pages/courses-lists/admin'
import { AdminUsersList } from './pages/users-list'
import { AdminUpdateProfile } from './pages/update-profile/admin'
import { AdminPrivateRoutes } from './pages/private/admin'
import { AdminUpdatePassword } from './pages/update-password/admin'
import { InstructorLogin } from './pages/login/instructor'
import { RegisterInstructor } from './pages/register/instructor'
import { InstructorPrivateRoutes } from './pages/private/instructor'
import { InstructorDashboard } from './pages/dashboard/instructor'

const App = () => {
  Aos.init()
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course/:slug" element={<Course />} />
        <Route path="/course/:slug/:lessons" element={<Lessons />} />

        {/** LOGIN */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/instructor-login" element={<InstructorLogin />} />

        {/** REGISTER */}
        <Route path="/register" element={<Register />} />
        <Route path="/register-instructor" element={<RegisterInstructor />} />
        <Route path="/courses-list" element={<CoursesLists />} />
        <Route path="/categories" element={<Categories />} />

        <Route path="/" element={<AdminPrivateRoutes />}>
          <Route path="admin-dashboard" element={<AdminDashboard />} />
          <Route path="admin-categories" element={<AdminCategories />} />
          <Route path="admin-courses-list" element={<AdminCoursesLists />} />
          <Route path="admin-users" element={<AdminUsersList />} />
          <Route path="admin-update-profile" element={<AdminUpdateProfile />} />
          <Route
            path="admin-update-password"
            element={<AdminUpdatePassword />}
          />
        </Route>
        <Route path="/" element={<InstructorPrivateRoutes />}>
          <Route
            path="instructor-dashboard"
            element={<InstructorDashboard />}
          />
          <Route path="instructor-add-course" element={<AddCourse />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
