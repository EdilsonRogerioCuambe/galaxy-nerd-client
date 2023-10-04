import { Route, Routes } from 'react-router-dom'
import Aos from 'aos'
import { Home } from './pages/home'
import { Course } from './pages/course'
import { Lessons } from './pages/lessons'
import { CoursesLists } from './pages/courses-lists'
import { Login } from './pages/login'
import { Register } from './pages/register'
import { Dashboard } from './pages/dashboard'
import { Categories } from './pages/categories'

const App = () => {
  Aos.init()
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course/:slug" element={<Course />} />
        <Route path="/course/:slug/:lessons" element={<Lessons />} />
        <Route path="/login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/courses-list" element={<CoursesLists />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/categories" element={<Categories />} />
      </Routes>
    </>
  )
}

export default App
