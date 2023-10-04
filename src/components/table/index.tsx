import { BsTrash3 } from 'react-icons/bs'
import { FaEdit, FaPlay } from 'react-icons/fa'
import { Link } from 'react-router-dom'

interface Curso {
  id?: number
  imagem?: string
  thumbnail?: string
  nome?: string
  slug?: string
  descricao?: string
  categoria?: string
  linguagem?: string
  duracao?: string
  nivel?: string
  link?: string
  avaliacao?: number
  avaliacoes?: number
  topicos?: Array<{
    titulo?: string
    videos?: Array<{
      titulo?: string
      link?: string
      concluido?: boolean
    }>
  }>
}

interface LinesProps {
  curso: Curso
  index: number
  admin: boolean
}

export function Lines({ curso, index, admin }: LinesProps) {
  const Text =
    'text-sm text-[#c4c4cc] text-left leading-6 whitespace-nowrap px-5 py-2'
  return (
    <>
      <tr key={index} className="text-[#c4c4cc]">
        <td className={`${Text}`}>
          <div className="w-12 p-1 bg-main boder border h-12 rounded overflow-hidden">
            <img
              src={curso.thumbnail || curso.imagem}
              alt={curso.nome}
              className="w-full h-full object-cover"
            />
          </div>
        </td>
        <td className={`${Text} truncate`}>{curso.nome}</td>
        <td className={`${Text}`}>{curso.duracao}</td>
        <td className={`${Text}`}>{curso.nivel}</td>
        <td className={`${Text}`}>{curso.categoria}</td>
        <td className={`${Text} float-right flex-rows gap-2`}>
          {admin ? (
            <>
              <button
                type="button"
                title="Editar"
                className="border-border border flex-rows gap-2 text-[#c4c4cc] rounded py-1 px-1"
              >
                <FaEdit className="text-green-500 hover:text-green-700" />
              </button>
              <button
                type="button"
                title="Remover"
                className="border-border border flex-rows gap-2 text-[#c4c4cc] rounded py-1 px-1"
              >
                <BsTrash3 className="text-red-500 hover:text-red-700" />
              </button>
            </>
          ) : (
            <>
              <Link to={`/curso/${curso.id}`}>
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
  data: Curso[]
  admin: boolean
}

export function Table({ data, admin }: TableProps) {
  const Head = 'text-xs text-left font-semibold px-6 py-2 uppercase'

  return (
    <>
      <div className="overflow-x-scroll overflow-hidden relative w-full">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-dryGray">
              <th scope="col" className={`${Head}`}>
                Imagem
              </th>
              <th scope="col" className={`${Head}`}>
                Nome
              </th>
              <th scope="col" className={`${Head}`}>
                Ano
              </th>
              <th scope="col" className={`${Head}`}>
                Duração
              </th>
              <th scope="col" className={`${Head}`}>
                Gênero
              </th>
              <th scope="col" className={`${Head} text-end`}>
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-main divide-gray-800">
            {data.map((curso, index) => (
              <Lines key={index} curso={curso} index={index} admin={admin} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
