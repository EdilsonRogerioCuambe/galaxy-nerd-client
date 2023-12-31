import { BsTrash3 } from 'react-icons/bs'
import { FaEdit, FaPlay } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { TopicsModal } from '../topics-modal'
import { useState } from 'react'
import { MdTopic } from 'react-icons/md'

interface LanguageProps {
  id: string
  name: string
  icon: string
}

interface Course {
  id?: string
  thumbnail?: string
  image?: string
  title?: string
  slug?: string
  description?: string
  shortDescription?: string
  languages?: LanguageProps[]
  instructor?: {
    id?: string
    name?: string
  }
  price?: string
}

interface LinesProps {
  course: Course
  index: number
  admin: boolean
  addTopics?: boolean
}

export function Lines({ course, index, admin, addTopics }: LinesProps) {
  const Text =
    'text-sm text-[#c4c4cc] text-left leading-6 whitespace-nowrap px-5 py-2'

  const [open, setOpen] = useState<boolean>(false)
  const [courseId, setCourseId] = useState<string>('')

  function handleOpenModal() {
    setOpen(true)
    setCourseId(course.id || '')
  }

  return (
    <>
      <tr key={index} className="text-[#c4c4cc]">
        <td className={`${Text}`}>{course.id}</td>
        <td className={`${Text}`}>
          <div className="w-12 p-1 bg-main boder border h-12 rounded overflow-hidden">
            <img
              src={course?.thumbnail}
              alt={course?.title}
              className="w-full h-full object-cover"
            />
          </div>
        </td>
        <td className={`${Text} truncate`}>{course?.title}</td>
        <td className={`${Text}`}>{course?.instructor?.name}</td>
        {/** Mostrar os icones das categorias */}
        <td className={`text-sm text-[#c4c4cc] text-right leading-6 px-5 py-2`}>
          {course?.languages?.map((language, index) => (
            <img
              key={index}
              src={language.icon}
              alt={language.name}
              className="w-8 h-8 object-cover inline-block rounded-md"
            />
          ))}
        </td>
        <td className={`${Text}`}>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(Number(course?.price))}
        </td>
        <td className="text-sm text-[#c4c4cc] text-right leading-6 whitespace-nowrap px-5 py-2 flex items-center justify-end my-auto">
          {admin ? (
            <>
              <button
                type="button"
                title="Editar"
                className="border-border border flex-rows gap-2 text-[#c4c4cc] rounded py-1 px-1"
              >
                <FaEdit className="text-yellow-300 hover:text-yellow-300" />
              </button>
              <button
                type="button"
                title="Excluir"
                className="border-border border flex-rows gap-2 text-[#c4c4cc] rounded py-1 px-1"
              >
                <BsTrash3 className="text-red-300 hover:text-red-400" />
              </button>
              {addTopics && (
                <button
                  type="button"
                  title="Adicionar Tópicos"
                  className="border-border border flex-rows gap-2 text-[#c4c4cc] rounded py-1 px-1"
                  onClick={handleOpenModal}
                >
                  <MdTopic className="text-green-300 hover:text-green-500" />
                </button>
              )}
              <TopicsModal open={open} setOpen={setOpen} courseId={courseId} />
            </>
          ) : (
            <>
              <Link to={`/course/${course?.slug}`}>
                <button
                  type="button"
                  title="Reproduzir"
                  className="border-border border flex-rows gap-2 text-[#c4c4cc] rounded py-1 px-1"
                >
                  <FaPlay className="text-yellow-500 hover:text-yellow-700" />
                </button>
              </Link>
            </>
          )}
        </td>
      </tr>
    </>
  )
}

interface TableProps {
  data: Course[]
  admin: boolean
  addTopics?: boolean
}

export function Table({ data, admin, addTopics }: TableProps) {
  const Head = 'text-xs text-left font-semibold px-6 py-2 uppercase'

  return (
    <>
      <div className="overflow-x-scroll overflow-hidden relative w-full">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-dryGray">
              <th scope="col" className={`${Head}`}>
                #
              </th>
              <th scope="col" className={`${Head}`}>
                Thumbnail
              </th>
              <th scope="col" className={`${Head}`}>
                Titulo
              </th>
              <th scope="col" className={`${Head}`}>
                Instrutor
              </th>
              <th scope="col" className={`${Head} text-end`}>
                Categoria
              </th>
              <th scope="col" className={`${Head} text-end`}>
                Preço
              </th>
              <th scope="col" className={`${Head} text-end`}>
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-main divide-gray-800">
            {data?.map((Course, index) => (
              <Lines
                key={index}
                course={Course}
                index={index}
                admin={admin}
                addTopics={addTopics}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
