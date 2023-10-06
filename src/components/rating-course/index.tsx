import { useState } from 'react'
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa'
import { avaliacoesData } from '../../data/avaliacoesData'
import { Stars } from '../stars'
import { BsBookmarkStarFill } from 'react-icons/bs'
import { Header } from '../header'
import { Message, Select } from '../../custom'

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

export function RatingCourse({ course }: { course: Curso }) {
  const Pontuacoes = [
    {
      id: '0',
      titulo: 'Nenhuma',
      descricao: '0 estrelas',
      icone: <FaRegStar />,
    },
    {
      id: '1',
      titulo: 'Muito Ruim',
      descricao: '1 estrela',
      icone: <FaRegStar />,
    },
    {
      id: '2',
      titulo: 'Ruim',
      descricao: '2 estrelas',
      icone: <FaStarHalfAlt />,
    },
    {
      id: '3',
      titulo: 'Bom',
      descricao: '3 estrelas',
      icone: <FaStar />,
    },
    {
      id: '4',
      titulo: 'Muito Bom',
      descricao: '4 estrelas',
      icone: <FaStar />,
    },
    {
      id: '5',
      titulo: 'Excelente',
      descricao: '5 estrelas',
      icone: <FaStar />,
    },
  ]

  const [pontuacao, setPontuacao] = useState(0)

  return (
    <>
      <div className="my-4">
        <Header header="Pontuação" Icon={BsBookmarkStarFill} />
        <div className="mt-10 xl:grid flex-colo grid-cols-5 gap-12 bg-secondary text-[#c4c4cc] xs:p-10 py-10 px-2 sm:p-20 rounded">
          <div className="xl:col-span-2 w-full flex flex-col gap-8">
            <h3 className="text-xl text-[#e1e1e6] font-semibold">
              {course?.nome}
            </h3>
            <p className="text-sm leading-7 font-medium text-border">
              Escreva uma resenha para este curso, e ajude outros usuários a
              escolherem o melhor curso para se inscrever.
            </p>
            <div className="text-sm w-full">
              <Select
                label="Pontuação"
                options={Pontuacoes}
                onChange={(e: any) => setPontuacao(e.target.value)}
                key={course ? course.id : ''}
              />
              <div className="flex mt-4 text-lg gap-2 text-yellow-500">
                <Stars stars={pontuacao} />
              </div>
            </div>
            <Message
              label="Mensagem"
              placeholder="Escreva uma resenha para este filme, e ajude outros usuários a escolherem o melhor filme para assistir."
            />
            <button className="bg-quinary text-[#e1e1e6] py-3 w-full flex-colo rounded">
              Enviar
            </button>
          </div>
          <div className="col-span-3 flex flex-col gap-6">
            <h3 className="text-xl text-text font-semibold">
              Avaliações{' '}
              <span className="text-sm text-quinary font-normal">(56)</span>
            </h3>
            <div className="w-full flex flex-col bg-main gap-6 rounded-lg md:p-12 p-6 h-header overflow-y-scroll">
              {avaliacoesData.map((avaliacao, index) => (
                <div key={index} className="flex flex-col gap-4">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-subMain">
                      <img
                        src={avaliacao.imagem}
                        alt={avaliacao.nome}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-text font-semibold">
                        {avaliacao.nome}
                      </h3>
                      <div className="flex gap-2 text-yellow-500">
                        <Stars stars={avaliacao.nota} />
                      </div>
                    </div>
                  </div>
                  <p className="text-text text-sm leading-7 font-medium">
                    {avaliacao.comentario}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
