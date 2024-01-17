import { Link } from 'react-router-dom'
import { FaHeart } from 'react-icons/fa'

interface CoursesProps {
  id: string
  title: string
  description: string
  thumbnail: string
  image: string
  price: string
  slug: string
  instructor: {
    name: string
    avatar: string
  }
}

export function Course({ course }: { course: CoursesProps }) {
  return (
    <>
      <Link to={`/course/${course?.slug}`} className="w-full">
        <div className="border border-border p-1 hover:scale-95 transitions relative rounded-3xl overflow-hidden">
          <img
            src={course?.image}
            alt={course?.title}
            className="w-4/5 h-4/5
             object-cover"
          />
          <div className="absolute flex-betweens gap-2 bottom-0 right-0 left-0 bg-secondary bg-opacity-60 text-[#e1e1e6] px-4 py-3">
            <h3 className="font-semibold">{course?.title}</h3>
          </div>
        </div>
      </Link>
    </>
  )
}
