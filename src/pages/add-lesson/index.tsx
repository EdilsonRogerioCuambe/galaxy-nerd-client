import { InstructorSideBar } from '../../layout/sidebar/instructor'
import { useGetInstructorQuery } from '../../slices/instructor/apiSlice/instructorsApiSlice'
import { useGetCourseQuery } from '../../slices/courseSlices/courseApiSlice'
import { LessonModal } from '../../components/lesson-modal'
import { FaPlus } from 'react-icons/fa'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'

interface Lesson {
  id: string
  title: string
  description: string
  order: string
  topicId: string
  duration: string
  video: File | null
}

interface Language {
  id: string
  name: string
  icon: string
}

interface Topic {
  id: string
  title: string
  description: string
  order: string
  courseId: string
  icon: string
  lessons: Lesson[]
}

interface Courses {
  id: string
  title: string
  duration: string
  image: string
  description: string
  shortDescription: string
  thumbnail: string
  price: string
  rating: number
  slug: string
  topics: Topic[]
  instructor: {
    name: string
    avatar: string
  }
  languages: Language[]
}

export function InstructorAddLessonsToCourse() {
  const { instructor } = useSelector((state: RootState) => state.instructorAuth)
  const [open, setOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<string>('')
  const [selectedTopic, setSelectedTopic] = useState<string>('')
  const { data: instructorData } = useGetInstructorQuery(instructor?.id || '')
  const { data: course } = useGetCourseQuery(selectedCourse)

  console.log(course)

  return (
    <InstructorSideBar>
      <div className="flex flex-col gap-6">
        <div className="flex-betweens gap-2">
          <h2 className="text-xl font-bold">Adicionar Aulas</h2>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="course">Curso</label>
            <select
              name="course"
              id="course"
              className="border border-border rounded-lg px-4 py-2 bg-main text-[#c4c4cc]"
              onChange={(event) => setSelectedCourse(event.target.value)}
              value={selectedCourse}
            >
              <option value="">Selecione um curso</option>
              {instructorData?.instructor?.courses?.map((course: Courses) => (
                <option key={course?.id} value={course?.id}>
                  {course?.title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="topic">Tópico</label>
            <select
              name="topic"
              id="topic"
              className="border border-border rounded-lg px-4 py-2 bg-main text-[#c4c4cc]"
              onChange={(event) => setSelectedTopic(event.target.value)}
            >
              <option value="">Selecione um tópico</option>
              {course?.course?.course?.topics?.map((topic: Topic) => (
                <option key={topic?.id} value={topic?.id}>
                  {topic?.title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <button
              type="button"
              title="Adicionar aula"
              className="flex items-center gap-2 bg-main text-[#c4c4cc] px-4 py-2 rounded-lg"
              onClick={() => setOpen(true)}
            >
              <FaPlus />
              Adicionar aula
            </button>
          </div>
          <LessonModal open={open} setOpen={setOpen} topicId={selectedTopic} />
        </div>
      </div>
    </InstructorSideBar>
  )
}
