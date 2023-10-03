import { Route, Routes } from 'react-router-dom'
import Aos from 'aos'
import { Home } from './pages/home'
import { Course } from './pages/course'
import { Lessons } from './pages/lessons'

const App = () => {
  Aos.init()
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course/:slug" element={<Course />} />
        <Route path="/course/:slug/:lessons" element={<Lessons />} />
      </Routes>
    </>
  )
}

export default App
