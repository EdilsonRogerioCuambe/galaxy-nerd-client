import { Route, Routes } from 'react-router-dom'
import Aos from 'aos'
import { Home } from './pages/home'
import { Course } from './pages/course'
import { Lessons } from './pages/lessons'
import { CoursesLists } from './pages/courses-lists'
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
import { InstructorAddTopicsToCourse } from './pages/add-topic'
import { InstructorAddLessonsToCourse } from './pages/add-lesson'
import { RegisterAdmin } from './pages/register/admin'
import { RegisterStudent } from './pages/register/student'
import { StudentLogin } from './pages/login/student'
import { StudentAddNewQuestionPage } from './pages/add-question'
import { ForumPage } from './pages/forum-page'
import { AddQuiz } from './pages/add-quiz'
import { Quizzes } from './pages/quizzes-page'
import { StudentProfile } from './pages/profile'
import { ProblemPage } from './pages/problem-page'
import { InstructorAddProblemSet } from './pages/add-problem-set'

const App = () => {
  Aos.init()
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course/:slug" element={<Course />} />
        <Route path="/course/:slug/lesson/:lesson" element={<Lessons />} />

        {/** STUDENT QUESTION */}
        <Route
          path="/course/:slug/lesson/:lesson/add-question"
          element={<StudentAddNewQuestionPage />}
        />

        <Route path="/question/:slug" element={<ForumPage />} />

        {/** LOGIN */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/instructor-login" element={<InstructorLogin />} />
        <Route path="/login" element={<StudentLogin />} />

        {/** REGISTER */}
        <Route path="/register-admin" element={<RegisterAdmin />} />
        <Route path="/register-instructor" element={<RegisterInstructor />} />
        <Route path="/register" element={<RegisterStudent />} />

        <Route path="/courses-list" element={<CoursesLists />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/challenge/:slug" element={<Quizzes />} />

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
          <Route
            path="instructor-add-topics-to-course"
            element={<InstructorAddTopicsToCourse />}
          />
          <Route
            path="/instructor-add-lessons-to-course"
            element={<InstructorAddLessonsToCourse />}
          />
          <Route path="instructor-add-quiz" element={<AddQuiz />} />
          <Route
            path="instructor-add-problem-set"
            element={<InstructorAddProblemSet />}
          />
        </Route>
        <Route path="/profile" element={<StudentProfile />} />
        <Route path="/lesson/:slug/problem" element={<ProblemPage />} />
      </Routes>
    </>
  )
}

export default App
