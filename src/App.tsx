import { Route, Routes } from 'react-router-dom'
import Aos from 'aos'
import { Home } from './pages/home'

const App = () => {
  Aos.init()
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  )
}

export default App
