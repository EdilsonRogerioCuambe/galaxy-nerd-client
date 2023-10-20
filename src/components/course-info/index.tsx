import { FaPlay, FaShareAlt } from 'react-icons/fa'
import { FlexCourseItens } from '../flex-course-itens'
import { Stars } from '../stars'
import { Link } from 'react-router-dom'

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
  duration: string
  slug: string
  instructor: {
    name: string
    avatar: string
  }
  languages: LanguageProps[]
}

export function CourseInfo({ course }: { course: CoursesProps }) {
  return (
    <div className="w-full xl:h-screen relative text-[#e1e1e6]">
      <img
        src={course?.thumbnail}
        alt={course.title}
        className="w-full hidden xl:inline-block h-full object-cover"
      />
      <div className="xl:bg-main bg-secondary flex-colo xl:bg-opacity-90 xl:absolute top-0 left-0 right-0 bottom-0">
        <div className="container px-3 mx-auto 2xl:px-32 xl:grid grid-cols-3 flex-colo py-10 lg:py-20 gap-8">
          <div className="xl:col-span-1 w-full xl:order-none order-last h-header bg-secondary border-gray-800 rounded-lg overflow-hidden">
            <img
              src={course?.thumbnail}
              alt={course?.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="col-span-2 md:grid grid-cols-5 gap-4 items-center">
            <div className="col-span-4 flex flex-col gap-10">
              <h1 className="xl:text-4xl capitalize text-2xl font-extrabold">
                {course?.title}
              </h1>

              <div className="flex items-center gap-4 font-medium text-[#e1e1e6]">
                <FlexCourseItens course={course} />
              </div>
              <p className="text-[#c4c4cc] text-md leading-7">
                {course?.shortDescription.slice(0, 350)}...
              </p>

              <div className="grid sm:grid-cols-3 grid-cols-3 gap-4 p-6 bg-main border border-gray-900 rounded-lg">
                <div className="col-span-1 flex-col border-r border-[#c4c4cc]">
                  <button
                    type="button"
                    title="Compartilhar"
                    className="w-10 h-10 flex-colo rounded-lg bg-[#e1e1e6] bg-opacity-20"
                  >
                    <FaShareAlt className="w-6 h-6 m-auto" />
                  </button>
                </div>
                <div className="col-span-2 flex flex-col gap-2">
                  <h2 className="text-xl font-semibold">Avaliações</h2>
                  <div className="flex items-center gap-2">
                    <Stars stars={course?.rating} />
                    <span className="text-[#c4c4cc] text-sm">
                      {course?.rating}
                    </span>
                  </div>
                </div>
                <div className="col-span-3 flex justify-end font-medium text-sm">
                  <Link
                    to={`/course/${course.slug}/lessons`}
                    className="bg-dry py-3 hover:bg-quinary transitions border-2 border-quinary rounded-full flex-rows gap-4 w-full sm:py-3"
                  >
                    <FaPlay className="w-6 h-6" />
                    Assistir
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
