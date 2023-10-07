import { FaHeart } from 'react-icons/fa'
import { Link } from 'react-router-dom'

interface CoursesProps {
  id: string
  title: string
  description: string
  thumbnail: string
  price: string
  rating: number
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

export function RelatedCourses({ course }: { course: CoursesProps }) {
  return (
    <>
      <Link to={`/course/${course.slug}`} className="w-full">
        <div className="border border-border p-1 hover:scale-95 transitions relative rounded overflow-hidden">
          <Link to={`/course/${course.slug}`} className="w-full">
            <img
              src={course?.thumbnail}
              alt={course?.title}
              className="w-full h-64 object-cover"
            />
          </Link>
          <div className="absolute flex-betweens gap-2 bottom-0 right-0 left-0 bg-main bg-opacity-60 text-[#e1e1e6] px-4 py-3">
            <h3 className="font-semibold">{course?.title}</h3>
            <button
              type="button"
              title="Favoritar"
              className="h-9 w-9 text-sm flex-colo transitions hover:bg-transparent border-2 border-subMain rounded-md bg-main text-quinary hover:text-senary"
            >
              <FaHeart className="w-5 h-5 mx-2 m-auto" />
            </button>
          </div>
        </div>
      </Link>
    </>
  )
}
