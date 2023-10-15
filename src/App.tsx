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

const App = () => {
  Aos.init()
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course/:slug" element={<Course />} />
        <Route path="/course/:slug/:lessons" element={<Lessons />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="register" element={<Register />} />
        <Route path="/courses-list" element={<CoursesLists />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/add-course" element={<AddCourse />} />
        <Route path="/" element={<AdminPrivateRoutes />}>
          <Route path="admin-dashboard" element={<AdminDashboard />} />
          <Route path="admin-categories" element={<AdminCategories />} />
          <Route path="admin-courses-list" element={<AdminCoursesLists />} />
          <Route path="admin-users" element={<AdminUsersList />} />
          <Route path="admin-update-profile" element={<AdminUpdateProfile />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
