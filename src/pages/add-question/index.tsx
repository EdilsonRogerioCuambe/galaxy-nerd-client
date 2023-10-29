import { Layout } from '../../layout'
import { useGetLessonBySlugQuery } from '../../slices/lessonsSlices/lessonsApiSlice'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { message } from 'antd'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useCreateQuestionMutation } from '../../slices/questionSlices/questionsApiSlice'
import MDEditor from '@uiw/react-md-editor'

export function StudentAddNewQuestionPage() {
  const navigate = useNavigate()
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string | undefined>('')
  const { slug, lesson } = useParams<{
    slug: string
    lesson: string
  }>()

  const { data: lessonData } = useGetLessonBySlugQuery(lesson)
  const { student } = useSelector((state: RootState) => state.studentAuth)
  const [createQuestion, { isLoading, isSuccess }] = useCreateQuestionMutation()

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleContentChange = (value: string | undefined) => {
    if (value) {
      setContent(value)
    }
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
          description: content,
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
            <div className="mt-1 font-mono max-w-none">
              <MDEditor
                id="editor-container"
                value={content}
                onChange={handleContentChange}
                height={400}
                preview="edit"
                className="rounded-lg p-4 text-[#c4c4cc] font-mono"
                style={{ backgroundColor: '#121214' }}
              />
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
