import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import { Link } from 'react-router-dom'
import { FaHeart } from 'react-icons/fa'
import { BsFillPlayFill } from 'react-icons/bs'
import { FlexCourseItens } from '../flex-course-itens'
import { useGetCoursesQuery } from '../../slices/courseSlices/courseApiSlice'

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

export function Banner() {
  const { data: courses } = useGetCoursesQuery({})
  return (
    <div className="relative w-full">
      <Swiper
        direction="vertical"
        spaceBetween={0}
        slidesPerView={1}
        loop
        speed={2500}
        autoplay={{ delay: 2000 }}
        modules={[Autoplay]}
        pagination={{ clickable: true }}
        className="w-full xl:h-96 bg-secondary lg:h-64 h-60"
      >
        {courses?.courses.map((course: CoursesProps, index: number) => (
          <SwiperSlide key={index} className="relative rounded overflow-hidden">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="object-fill w-full"
            />
            <div className="absolute linear-bg pl-6 top-0 bottom-0 flex flex-col justify-center right-0 left-0 lg:gap-8 md:gap-5 gap-4">
              <h1 className="xl:text-4xl truncate capitalize text-[#e1e1e6] sm:text-2xl text-xl font-extrabold">
                {(course.title.substring(0, 75) + '...').toUpperCase()}
              </h1>
              <div className="flex gap-5 items-center">
                <p className="text-[#c4c4cc] font-medium text-lg">
                  {course.shortDescription.length > 200
                    ? course.shortDescription.slice(0, 100) + '...'
                    : course.shortDescription}
                </p>
              </div>
              <div className="flex gap-5 items-center text-[#c4c4cc]">
                <FlexCourseItens course={course} />
              </div>
              <div className="flex gap-5 items-center">
                <Link
                  to={`/course/${course.slug}`}
                  className="bg-quinary text-[#e1e1e6] px-4 py-2 rounded-md font-medium hover:bg-opacity-80 transition duration-300 ease-in-out"
                >
                  Assistir <BsFillPlayFill className="inline-block w-6 h-6" />
                </Link>
                <button
                  title="Favoritar"
                  className="bg-[#00b37e] transitions text-white px-4 py-2 rounded text-sm bg-opacity-30 hover:bg-opacity-80 transition duration-300 ease-in-out"
                >
                  <FaHeart className="inline-block w-6 h-6" />
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
