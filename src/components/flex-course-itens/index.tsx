import { BiTime, BiCategoryAlt } from 'react-icons/bi'

export function FlexCourseItens({ course }: { course: any }) {
  return (
    <>
      <div className="flex items-center gap-2">
        <BiCategoryAlt className="w-4 h-4 text-green-400" />
        <span className="text-md font-medium">{course.categoria}</span>
      </div>
      <div className="flex items-center gap-2">
        <BiTime className="w-6 h-4 text-green-400" />
        <span className="text-md font-medium">{course.duracao}</span>
      </div>
    </>
  )
}
