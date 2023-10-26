import { Link } from 'react-router-dom'
import { RiCloseCircleLine } from 'react-icons/ri'
import { TiEdit } from 'react-icons/ti'

interface Forum {
  answered: boolean
  createdAt: string
  description: string
  id: string
  lessonId: string
  slug: string
  student: {
    avatar: string
    name: string
  }
  studentId: string
  title: string
  updatedAt: string
}

export function ForumComponent({ question }: { question: Forum }) {
  return (
    <>
      <div className="p-6 my-4 bg-secondary rounded-lg">
        <div className="flex justify-between items-center">
          <div className="flex items-center mb-2">
            <img
              className="w-10 h-10 rounded-full object-cover"
              src={question.student.avatar}
              alt={question.student.name}
            />
            <div className="ml-3">
              <span className="font-extrabold text-md text-[#c4c4cc]">
                {question.student.name}
              </span>
              <span className="text-sm ml-2 font-bold text-[#c4c4cc]">
                {new Date(question.createdAt).toLocaleDateString('pt-BR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <span
              className={`text-sm ${
                question.answered ? 'text-green-300' : 'text-red-300'
              }`}
            >
              {question.answered ? 'Respondido' : 'Sem resposta'}
            </span>
            <span
              className={`text-sm ml-2 ${
                question.answered ? 'text-green-300' : 'text-red-300'
              }`}
            >
              {question.answered ? (
                <TiEdit size={24} />
              ) : (
                <RiCloseCircleLine size={24} />
              )}
            </span>
          </div>
        </div>
        <Link
          to={`/question/${question.slug}`}
          className="text-xl font-extrabold text-[#e1e1e6] transitions hover:text-quinary"
        >
          #{question.title}
        </Link>
      </div>
    </>
  )
}
