import { BiTime, BiCategoryAlt } from 'react-icons/bi'

interface LanguageProps {
  id: string
  name: string
  icon: string
}

interface CoursesProps {
  id: string
  title: string
  description: string
  shortDescription: string
  thumbnail: string
  price: string
  rating: number
  slug: string
  instructor: {
    name: string
    avatar: string
  }
  languages: LanguageProps[]
  duration: string
}

export function FlexCourseItens({ course }: { course: CoursesProps }) {
  return (
    <>
      <div className="flex items-center gap-2">
        <BiCategoryAlt className="w-4 h-4 text-green-400" />
        {course?.languages?.map((language) => (
          <div key={language?.id} className="flex items-center gap-2">
            <img
              src={language?.icon}
              alt={language?.name}
              className="w-4 h-4"
            />
            <span>{language?.name}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <BiTime className="w-6 h-4 text-green-400" />
        <span className="text-md font-medium">{course?.duration}</span>
      </div>
    </>
  )
}
