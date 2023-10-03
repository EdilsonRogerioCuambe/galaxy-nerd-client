import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Cursos } from '../../data/Cursos'
import { Layout } from '../../layout'
import { BsCollectionFill } from 'react-icons/bs'
import { Header } from '../../components/header'
import { SampleLessons } from '../../components/sample-lessons'
import { CourseInfo } from '../../components/course-info'
import { RatingCourse } from '../../components/rating-course'
import { RelatedCourses } from '../../components/related-courses'

type Curso = {
  id: number
  imagem: string
  thumbnail: string
  nome: string
  slug: string
  descricao: string
  categoria: string
  linguagem: string
  duracao: string
  nivel: string
  link: string
  avaliacao: number
  avaliacoes: number
}

export function Course() {
  const { slug } = useParams()
  const [course, setCourse] = useState<Curso | undefined>(undefined)

  const cursosRelacionados = Cursos.filter(
    (filme) => filme.categoria === course?.categoria && filme.id !== course?.id,
  )

  const getCourse = useCallback(() => {
    const course = Cursos.find((course) => course.slug === slug)
    setCourse(course)
  }, [slug])

  useEffect(() => {
    getCourse()
  }, [getCourse])

  return (
    <Layout>
      {course && <CourseInfo course={course} />}
      <div className="container mx-auto min-h-screen px-2 my-6">
        {course && <SampleLessons course={course} />}
        <RatingCourse course={course as Curso} />
        <div className="my-16">
          <Header header="Cursos Relacionados" Icon={BsCollectionFill} />
          <div className="grid sm:mt-12 mt-6 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
            {cursosRelacionados.map((course, index) => (
              <RelatedCourses key={index} course={course} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}
