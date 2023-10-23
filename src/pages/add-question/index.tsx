import { Layout } from '../../layout'
import { useGetLessonBySlugQuery } from '../../slices/lessonsSlices/lessonsApiSlice'
import { useGetCourseBySlugQuery } from '../../slices/courseSlices/courseApiSlice'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
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
import { message } from 'antd'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { useCreateQuestionMutation } from '../../slices/questionSlices/questionsApiSlice'

export function StudentAddNewQuestionPage() {
  const navigate = useNavigate()
  const [title, setTitle] = useState<string>('')
  const { slug, lesson } = useParams<{
    slug: string
    lesson: string
  }>()

  const { data: lessonData } = useGetLessonBySlugQuery(lesson)
  const { data: courseData } = useGetCourseBySlugQuery(slug)
  const { student } = useSelector((state: RootState) => state.studentAuth)
  const [createQuestion, { isLoading, isSuccess }] = useCreateQuestionMutation()

  const editorRef = useRef<EditorJS | null>(null)

  const initEditor = () => {
    const editor = new EditorJS({
      holder: 'editorjs',
      minHeight: 150,
      onReady: () => {
        editorRef.current = editor
      },
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

  useEffect(() => {
    if (editorRef.current === null) {
      initEditor()
    }

    return () => {
      editorRef?.current?.destroy()
      editorRef.current = null
    }
  }, [])

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!title) {
      message.error('Título é obrigatório')
    }

    try {
      await createQuestion({
        lessonId: lessonData?.lesson?.lesson?.id,
        studentId: student?.id,
        body: {
          title,
          description: JSON.stringify(await editorRef.current?.save()),
          lessonId: lessonData?.lesson?.lesson?.id,
          studentId: student?.id,
        },
      }).unwrap()
    } catch (error) {
      console.error(error)
      if (typeof error === 'object' && error !== null && 'data' in error) {
        const errorData = error.data as { message?: string; error?: string }
        message.error(
          errorData.message || errorData.error || 'An error occurred',
        )
      }
    }
  }

  useEffect(() => {
    if (isSuccess) {
      message.success('Pergunta enviada com sucesso')
      navigate(`/course/${slug}/lesson/${lesson}`)
    }
  }, [isSuccess, navigate, slug, lesson])

  return (
    <Layout>
      <div className="bg-secondary relative container mx-auto rounded-md text-[#c4c4cc] p-6 mt-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">
            Adiconar Issue para aula {lessonData?.lesson?.lesson?.title}
          </h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mt-6">
            <label htmlFor="title" className="block text-sm font-medium">
              Título
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="title"
                id="title"
                className="shadow-sm focus:ring-quinary focus:border-quinary font-extrabold block w-full sm:text-sm border-[#c4c4cc] rounded-md bg-main py-4 px-3"
                placeholder="Digite um título"
                onChange={handleTitleChange}
              />
            </div>
          </div>
          <div className="mt-6">
            <label htmlFor="body" className="block text-sm font-medium">
              Corpo
            </label>
            <div className="mt-1">
              <div id="editorjs" className="bg-main rounded-md"></div>
            </div>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-quinary hover:bg-senary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-quinary"
            >
              {isLoading ? 'Enviando...' : 'Enviar'}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  )
}
