import { InstructorSideBar } from '../../layout/sidebar/instructor'
import { RootState } from '../../store'
import { useEffect, useState } from 'react'
import { useGetInstructorQuery } from '../../slices/instructor/apiSlice/instructorsApiSlice'
import { useGetCourseQuery } from '../../slices/courseSlices/courseApiSlice'
import { useSelector } from 'react-redux'
import MDEditor from '@uiw/react-md-editor'
import { message } from 'antd'
import { useCreateProblemMutation } from '../../slices/problemsApiSlices/problemLessonsApiSlice'

interface Lesson {
  id: string
  title: string
  description: string
  order: string
  topicId: string
  duration: string
  video: File | null
}

interface Language {
  id: string
  name: string
  icon: string
}

interface Topic {
  id: string
  title: string
  description: string
  order: string
  courseId: string
  icon: string
  lessons: Lesson[]
}

interface Courses {
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
  topics: Topic[]
  instructor: {
    name: string
    avatar: string
  }
  languages: Language[]
}

interface Example {
  id: number
  inputText: string
  outputText: string
  explanation: string
}

export function InstructorAddProblemSet() {
  const { instructor } = useSelector((state: RootState) => state.instructorAuth)
  const [selectedLesson, setSelectedLesson] = useState<string>('')
  const [selectedCourse, setSelectedCourse] = useState<string>('')
  const [selectedTopic, setSelectedTopic] = useState<string>('')
  const { data: instructorData } = useGetInstructorQuery(instructor?.id || '')
  const { data: course } = useGetCourseQuery(selectedCourse)
  const [title, setTitle] = useState<string>('')
  const [problemStatement, setProblemStatement] = useState<string>('')
  const [examples, setExamples] = useState<Example[]>([])
  const [constraints, setConstraints] = useState<string>('')
  const [starterCode, setStarterCode] = useState<string>('')
  const [handlerFunction, setHandlerFunction] = useState<string>('')
  const [starterFunctionName, setStarterFunctionName] = useState<string>('')
  const [order, setOrder] = useState<string>('')
  const [newExample, setNewExample] = useState<string>('')

  const [createProblem, { isSuccess }] = useCreateProblemMutation()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const response = await createProblem({
        lessonId: selectedLesson,
        title,
        problemStatement,
        examples: examples.map((example: Example) => ({
          inputText: example.inputText,
          outputText: example.outputText,
          explanation: example.explanation,
        })),
        constraints,
        starterCode,
        handlerFunction,
        starterFunctionName,
        order,
      }).unwrap()

      console.log(response)

      if (response) {
        message.success('Problema adicionado com sucesso!')
      }
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

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleHandlerFunctionNameChange = (
    value: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setStarterFunctionName(value.target.value)
  }

  const handleOrderChange = (value: React.ChangeEvent<HTMLInputElement>) => {
    setOrder(value.target.value)
  }

  const handleAddNewExample = () => {
    if (newExample.trim() !== '') {
      setExamples([
        ...examples,
        {
          id: examples.length + 1,
          inputText: '',
          outputText: '',
          explanation: '',
        },
      ])
      setNewExample('')
    }
  }

  useEffect(() => {
    if (isSuccess) {
      message.success('Problema adicionado com sucesso')
    }
  }, [isSuccess])

  return (
    <InstructorSideBar>
      <div className="flex flex-col gap-6">
        <div className="flex-betweens gap-2">
          <h2 className="text-xl font-bold">Adicionar Problema</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="course">Curso</label>
              <select
                name="course"
                id="course"
                className="border border-border rounded-lg px-4 py-2 bg-main text-[#c4c4cc]"
                onChange={(event) => setSelectedCourse(event.target.value)}
                value={selectedCourse}
              >
                <option value="">Selecione um curso</option>
                {instructorData?.instructor?.courses?.map((course: Courses) => (
                  <option key={course?.id} value={course?.id}>
                    {course?.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="topic">Tópico</label>
              <select
                name="topic"
                id="topic"
                className="border border-border rounded-lg px-4 py-2 bg-main text-[#c4c4cc]"
                onChange={(event) => setSelectedTopic(event.target.value)}
              >
                <option value="">Selecione um tópico</option>
                {course?.course?.course?.topics?.map((topic: Topic) => (
                  <option key={topic?.id} value={topic?.id}>
                    {topic?.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="lesson">Aula</label>
              <select
                name="lesson"
                id="lesson"
                className="border border-border rounded-lg px-4 py-2 bg-main text-[#c4c4cc]"
                onChange={(event) => setSelectedLesson(event.target.value)}
              >
                <option value="">Selecione uma aula</option>
                {course?.course?.course?.topics
                  ?.find((topic: Topic) => topic.id === selectedTopic)
                  ?.lessons?.map((lesson: Lesson) => (
                    <option key={lesson?.id} value={lesson?.id}>
                      {lesson?.title}
                    </option>
                  ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="title">Título</label>
              <input
                type="text"
                name="title"
                id="title"
                className="shadow-sm focus:ring-quinary focus:border-quinary font-extrabold block w-full sm:text-sm border-[#c4c4cc] rounded-md bg-main py-4 px-3"
                onChange={handleTitleChange}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="order">Ordem</label>
              <input
                type="text"
                name="order"
                id="order"
                className="shadow-sm focus:ring-quinary focus:border-quinary font-extrabold block w-full sm:text-sm border-[#c4c4cc] rounded-md bg-main py-4 px-3"
                onChange={handleOrderChange}
              />

              <label htmlFor="problemStatement">Enunciado do Problema</label>
              <textarea
                name="problemStatement"
                id="problemStatement"
                className="shadow-sm focus:ring-quinary focus:border-quinary font-extrabold block w-full sm:text-sm border-[#c4c4cc] rounded-md bg-main p-4"
                onChange={(event) => setProblemStatement(event.target.value)}
              />

              <label htmlFor="starterCode">Código Inicial</label>
              <textarea
                name="starterCode"
                id="starterCode"
                className="shadow-sm focus:ring-quinary focus:border-quinary font-extrabold block w-full sm:text-sm border-[#c4c4cc] rounded-md bg-main p-4"
                onChange={(event) => setStarterCode(event.target.value)}
              />

              <label htmlFor="handlerFunction">Função Handler</label>
              <textarea
                name="handlerFunction"
                id="handlerFunction"
                className="shadow-sm focus:ring-quinary focus:border-quinary font-extrabold block w-full sm:text-sm border-[#c4c4cc] rounded-md bg-main p-4"
                onChange={(event) => setHandlerFunction(event.target.value)}
              />

              <label htmlFor="handlerFunctionName">
                Nome da Função Handler
              </label>
              <input
                type="text"
                name="handlerFunctionName"
                id="handlerFunctionName"
                className="shadow-sm focus:ring-quinary focus:border-quinary font-extrabold block w-full sm:text-sm border-[#c4c4cc] rounded-md bg-main py-4 px-3"
                onChange={handleHandlerFunctionNameChange}
              />

              <label htmlFor="constraints">Restrições</label>
              <textarea
                name="constraints"
                id="constraints"
                className="shadow-sm focus:ring-quinary focus:border-quinary font-extrabold block w-full sm:text-sm border-[#c4c4cc] rounded-md bg-main p-4"
                onChange={(event) => setConstraints(event.target.value)}
              />

              <label htmlFor="examples">Exemplos</label>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  <textarea
                    title="Adicionar Exemplo"
                    name="newExample"
                    id="newExample"
                    className="shadow-sm focus:ring-quinary focus:border-quinary font-extrabold block w-full sm:text-sm border-[#c4c4cc] rounded-md bg-main p-4"
                    onChange={(event) => setNewExample(event.target.value)}
                  />
                  <button
                    type="button"
                    className="bg-quinary text-white font-bold text-lg rounded-md py-4 px-6"
                    onClick={handleAddNewExample}
                  >
                    Adicionar Exemplo
                  </button>
                </div>
                <div className="flex flex-col gap-2">
                  {examples.map((example: Example) => (
                    <div
                      key={example.id}
                      className="flex flex-col gap-2 border border-border rounded-md p-4"
                    >
                      <label htmlFor="inputText">Entrada</label>
                      <textarea
                        name="inputText"
                        id="inputText"
                        className="shadow-sm focus:ring-quinary focus:border-quinary font-extrabold block w-full sm:text-sm border-[#c4c4cc] rounded-md bg-main p-4"
                        onChange={(event) =>
                          setExamples(
                            examples.map((item: Example) =>
                              item.id === example.id
                                ? { ...item, inputText: event.target.value }
                                : item,
                            ),
                          )
                        }
                      />

                      <label htmlFor="outputText">Saída</label>
                      <textarea
                        name="outputText"
                        id="outputText"
                        className="shadow-sm focus:ring-quinary focus:border-quinary font-extrabold block w-full sm:text-sm border-[#c4c4cc] rounded-md bg-main p-4"
                        onChange={(event) =>
                          setExamples(
                            examples.map((item: Example) =>
                              item.id === example.id
                                ? { ...item, outputText: event.target.value }
                                : item,
                            ),
                          )
                        }
                      />

                      <label htmlFor="explanation">Explicação</label>
                      <textarea
                        name="explanation"
                        id="explanation"
                        className="shadow-sm focus:ring-quinary focus:border-quinary font-extrabold block w-full sm:text-sm border-[#c4c4cc] rounded-md bg-main p-4"
                        onChange={(event) =>
                          setExamples(
                            examples.map((item: Example) =>
                              item.id === example.id
                                ? { ...item, explanation: event.target.value }
                                : item,
                            ),
                          )
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  type="submit"
                  className="bg-quinary text-white font-bold text-lg rounded-md py-4 px-6"
                >
                  Adicionar Problema
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </InstructorSideBar>
  )
}
