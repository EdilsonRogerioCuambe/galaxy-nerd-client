import { InstructorSideBar } from '../../layout/sidebar/instructor'
import { useGetCoursesQuery } from '../../slices/courseSlices/courseApiSlice'

interface ITopics {
  title: string
  icon: File | null
  description: string
  order: number
  courseId: string
}

export function InstructorAddTopicsToCours() {
  return (
    <InstructorSideBar>
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Adicionar Tópicos</h2>
      </div>
    </InstructorSideBar>
  )
}
