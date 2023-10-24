import { useCallback, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Layout } from '../../layout'
import { BsCollectionFill } from 'react-icons/bs'
import { Header as HeaderCourse } from '../../components/header'
import { SampleLessons } from '../../components/sample-lessons'
import { CourseInfo } from '../../components/course-info'
import { RatingCourse } from '../../components/rating-course'
import { RelatedCourses } from '../../components/related-courses'
import {
  useGetCoursesQuery,
  useGetCourseBySlugQuery,
} from '../../slices/courseSlices/courseApiSlice'
import EditorJS from '@editorjs/editorjs'
import Header from '@editorjs/header'
import List from '@editorjs/list'
import Embed from '@editorjs/embed'
import Image from '@editorjs/image'
import Table from '@editorjs/table'
import SimpleImage from '@editorjs/simple-image'
import Quote from '@editorjs/quote'
import Warning from '@editorjs/warning'
import Code from '@editorjs/code'
import LinkTool from '@editorjs/link'
import Raw from '@editorjs/raw'
import Marker from '@editorjs/marker'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import Paragraph from '@editorjs/paragraph'

interface LanguageProps {
  id: string
  name: string
  icon: string
}

interface CoursesProps {
  id: string
  title: string
  duration: string
  image: string
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
  topics: {
    id: string
    title: string
    slug: string
    lessons: {
      id: string
      title: string
      slug: string
      duration: string
    }[]
  }[]
}

export function Course() {
  const { slug } = useParams()
  const { data: courses } = useGetCoursesQuery({})
  const { data: course, isLoading } = useGetCourseBySlugQuery(slug)
  const editorRef = useRef<EditorJS | null>(null)

  const parseDescription = JSON.parse(
    course?.course?.course?.description || '{}',
  )

  const [cursosRelacionados, setCursosRelacionados] = useState<CoursesProps[]>(
    [],
  )

  useEffect(() => {
    const initEditor = () => {
      const editor = new EditorJS({
        holder: 'editorjs',
        onReady() {
          editorRef.current = editor
        },
        minHeight: 1,
        readOnly: true,
        data: parseDescription,
        tools: {
          header: {
            class: Header,
            config: {
              placeholder: 'Digite um título',
              levels: [1, 2, 3, 4, 5, 6],
              defaultLevel: 3,
            },
          },
          list: {
            class: List,
            inlineToolbar: true,
          },
          embed: {
            class: Embed,
            inlineToolbar: true,
            config: {
              services: {
                youtube: true,
                coub: true,
              },
            },
          },
          image: {
            class: Image,
            config: {
              endpoints: {
                byFile: 'http://localhost:3333/images',
                byUrl: 'http://localhost:3333/images',
              },
            },
          },
          table: {
            class: Table,
            inlineToolbar: true,
          },
          simpleImage: {
            class: SimpleImage,
            inlineToolbar: true,
          },
          quote: {
            class: Quote,
            inlineToolbar: true,
            config: {
              quotePlaceholder: 'Digite uma citação',
              captionPlaceholder: 'Autor da citação',
            },
          },
          warning: {
            class: Warning,
            inlineToolbar: true,
            shortcut: 'CMD+SHIFT+W',
            config: {
              titlePlaceholder: 'Digite um título',
              messagePlaceholder: 'Digite uma mensagem',
            },
          },
          code: {
            class: Code,
            inlineToolbar: true,
          },
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: 'http://localhost:3333/images',
            },
          },
          raw: {
            class: Raw,
            inlineToolbar: true,
          },
          marker: {
            class: Marker,
            shortcut: 'CMD+SHIFT+M',
          },
          delimiter: {
            class: Delimiter,
            shortcut: 'CMD+SHIFT+M',
          },
          inlineCode: {
            class: InlineCode,
            shortcut: 'CMD+SHIFT+M',
          },
          paragraph: {
            class: Paragraph,
            inlineToolbar: true,
          },
        },
      })
    }

    if (course?.course?.course?.description) {
      initEditor()
    }

    return () => {
      editorRef?.current?.destroy()
      editorRef.current = null
    }
  }, [course?.course?.course?.description, parseDescription])

  const getCursosRelacionados = useCallback(() => {
    const cursos = courses?.courses.filter(
      (course: CoursesProps) => course?.languages[0]?.name === 'Javascript',
    )
    setCursosRelacionados(cursos)
  }, [courses])

  useEffect(() => {
    getCursosRelacionados()
  }, [getCursosRelacionados])

  return (
    <Layout>
      <CourseInfo
        course={course?.course?.course as CoursesProps}
        isLoading={isLoading}
      />
      <div className="container mx-auto min-h-screen px-2 my-6">
        <div className="max-w-7xl bg-secondary rounded-lg p-4 text-[#c4c4cc] overflow-y-auto h-[calc(100vh-4rem)]">
          <div id="editorjs"></div>
        </div>
        {course && <SampleLessons course={course?.course?.course} />}
        <RatingCourse course={course?.course?.course as CoursesProps} />
        <div className="my-16">
          <HeaderCourse header="Cursos Relacionados" Icon={BsCollectionFill} />
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
