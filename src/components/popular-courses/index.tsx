import { BsCollectionFill } from 'react-icons/bs'
import { Header } from '../header'
import { Course } from '../course'
import { useGetCoursesQuery } from '../../slices/courseSlices/courseApiSlice'

interface PopularCoursesProps {
  id: string
  title: string
  description: string
  thumbnail: string
  price: string
  slug: string
  instructor: {
    name: string
    avatar: string
  }
  category: {
    name: string
    icon: string
  }
}

export function PopularCourses() {
  const { data: courses } = useGetCoursesQuery({})

  return (
    <div className="my-16">
      <Header header="Cursos Populares" Icon={BsCollectionFill} />
      <div className="grid sm:mt-12 mt-6 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
        {courses?.courses
          ?.slice(0, 8)
          .map((course: PopularCoursesProps) => (
            <Course key={course?.slug} course={course} />
          ))}
      </div>
    </div>
  )
}
