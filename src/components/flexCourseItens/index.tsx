import { FaRegCalendarAlt } from 'react-icons/fa'
import { BiTime } from 'react-icons/bi'

export function FlexCourseItens({ course }: { course: any }) {
  return (
    <>
      <div className="flex items-center gap-2">
        <span className="text-md font-medium">{course.categoria}</span>
      </div>
      <div className="flex items-center gap-2">
        <FaRegCalendarAlt className="w-4 h-4 text-green-400" />
        <span className="text-md font-medium">{course.ano}</span>
      </div>
      <div className="flex items-center gap-2">
        <BiTime className="w-6 h-4 text-green-400" />
        <span className="text-md font-medium">{course.duracao}</span>
      </div>
    </>
  )
}
