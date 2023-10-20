import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Layout } from '../../layout'
import { BsCollectionFill } from 'react-icons/bs'
import { Header } from '../../components/header'
import { SampleLessons } from '../../components/sample-lessons'
import { CourseInfo } from '../../components/course-info'
import { RatingCourse } from '../../components/rating-course'
import { RelatedCourses } from '../../components/related-courses'
import {
  useGetCoursesQuery,
  useGetCourseBySlugQuery,
} from '../../slices/courseSlices/courseApiSlice'

interface LanguageProps {
  id: string
  name: string
  icon: string
}

interface CoursesProps {
  id: string
  title: string
  duration: string
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
}

export function Course() {
  const { slug } = useParams()
  const { data: courses } = useGetCoursesQuery({})
  const { data: course } = useGetCourseBySlugQuery(slug)

  const [cursosRelacionados, setCursosRelacionados] = useState<CoursesProps[]>(
    [],
  )

  const getCursosRelacionados = useCallback(() => {
    const cursos = courses?.courses.filter(
      (course: CoursesProps) => course?.languages[0]?.name === 'Javascript',
    )
    setCursosRelacionados(cursos)
  }, [courses])

  useEffect(() => {
    getCursosRelacionados()
  }, [getCursosRelacionados])

  console.log(course)

  return (
    <Layout>
      {course && <CourseInfo course={course?.course?.course as CoursesProps} />}
      <div className="container mx-auto min-h-screen px-2 my-6">
        {course && <SampleLessons course={course} />}
        <RatingCourse course={course?.course?.course as CoursesProps} />
        <div className="my-16">
          <Header header="Cursos Relacionados" Icon={BsCollectionFill} />
          <div className="grid sm:mt-12 mt-6 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
            {cursosRelacionados?.map((course: CoursesProps, index: number) => (
              <RelatedCourses key={index} course={course} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}
