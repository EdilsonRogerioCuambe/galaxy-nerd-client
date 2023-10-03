import { Link, useParams } from 'react-router-dom'
import { Layout } from '../../layout'
import { BiArrowBack } from 'react-icons/bi'
import { useEffect, useState } from 'react'
import { Cursos } from '../../data/Cursos'
import { FaHeart, FaBook, FaImage } from 'react-icons/fa'
import { faker } from '@faker-js/faker'
import ReactPlayer from 'react-player'
import { AiFillPlayCircle } from 'react-icons/ai'
import { SiApachestorm } from 'react-icons/si'
import { BsDiscord } from 'react-icons/bs'
import flutter from '../../assets/images/seguranca.jpg'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from '@chakra-ui/react'
import video from '../../assets/images/video.mp4'

export function Lessons() {
  const { slug } = useParams()
  const [course, setCourse] = useState<any>(undefined)

  const [videoPlayed, setVideoPlayed] = useState<any>({})

  useEffect(() => {
    const course = Cursos.find((course) => course.slug === slug)
    setCourse(course)
  }, [slug])

  const fakeQuestions = Array.from({ length: 10 }, () => ({
    username: faker.person.fullName(),
    avatar: faker.image.avatar(),
    questionTitle: faker.lorem.sentence(),
    createdAt: faker.date.past().toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
    answered: faker.datatype.boolean(),
  }))

  return (
    <Layout>
      <div className="container mx-auto bg-secondary rounded-md mb-6 p-6 mt-8">
        <div className="flex-betweens flex-wrap gap-2 bg-main rounded border border-gray-800 py-6 px-6">
          <Link
            to={`/course/${course?.slug}`}
            className="md:text-xl text-sm flex gap-3 items-center font-bold text-[#c4c4cc]"
          >
            <BiArrowBack className="w-6 h-6" /> {course?.nome}
          </Link>
          <div className="flex-btweens sm:w-auto w-full gap-5">
            <button
              title="favoritar"
              type="button"
              className="bg-[#c4c4cc] hover:text-quinary transitions bg-opacity-30 text-[#c4c4cc] rounded px-4 py-3 text-sm"
            >
              <FaHeart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      <div className="bg-secondary relative container mx-auto rounded-md text-[#c4c4cc] p-6 justify-between flex flex-col md:flex-row">
        <div className="w-full md:w-4/6 left-0 top-[72px] bg-opacity-40 max-w-full">
          <ReactPlayer
            url={video}
            width="100%"
            height="auto"
            light={flutter}
            controls
            style={{
              boxShadow: '0 0 10px rgba(0,0,0,0.5)',
              aspectRatio: '16/9',
              position: 'relative',
              height: '0',
              overflow: 'hidden',
            }}
          />
          <div className="mt-4 flex flex-col md:flex-row bg-main p-6 shadow-md rounded-lg">
            <div className="w-full md:w-3/4 md:pr-4">
              <div className="text-[#e1e1e6] text-xl md:text-2xl font-bold leading-[33.60px] mt-2">
                Aula 01 - Criando o projeto e realizando o setup inicial
              </div>
              <div className="text-[#c4c4cc] text-base md:text-lg font-normal leading-relaxed mt-2">
                Nessa aula vamos dar início ao projeto criando a estrutura base
                da aplicação utilizando ReactJS, Vite e TailwindCSS. Vamos
                também realizar o setup do nosso projeto no GraphCMS criando as
                entidades da aplicação e integrando a API GraphQL gerada pela
                plataforma no nosso front-end utilizando Apollo Client.
              </div>
            </div>
            <div className="w-full md:w-1/4 mt-4 md:mt-0 md:pl-4">
              <div className="md:flex flex-col">
                <div className="w-full h-14 px-6 py-4 bg-blue-500 rounded-lg flex justify-center items-center gap-2.5">
                  <BsDiscord className="w-6 h-6 text-white" />
                  <Link
                    to="/discord"
                    className="text-white text-sm font-bold uppercase leading-snug"
                  >
                    Comunidade no Discord
                  </Link>
                </div>
                <div className="w-full h-14 mt-4 md:mt-4 py-4 border-green-300 border-2 rounded-lg flex justify-center items-center gap-2.5">
                  <SiApachestorm className="w-6 h-6 text-green-300" />
                  <Link
                    to="/challenge"
                    className="text-green-300 text-sm font-bold uppercase leading-snug"
                  >
                    Acesse o desafio
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center mt-4">
            <img
              className="rounded-full object-cover border-2 border-quinary w-14 h-14"
              src={faker.image.avatar()}
              alt="Diego Fernandes"
            />
            <div className="flex flex-col ml-2">
              <div className="text-lg text-[#e1e1e6] font-semibold">
                Diego Fernandes
              </div>
              <div className="text-[#c4c4cc]">
                Co-fundador e CTO na Rocketseat
              </div>
            </div>
          </div>
          <div className="mt-4 md:flex md:flex-row md:space-x-4">
            <div className="flex-1 md:w-1/2">
              <div className="border-red-300 border-2 text-center rounded-lg p-4 flex flex-col justify-center items-center h-48">
                <div className="text-4xl text-red-300 mb-2">
                  <FaBook />
                </div>
                <div className="text-red-300 text-xl font-bold mb-2">
                  Material complementar
                </div>
                <div className="text-red-300 text-sm">
                  Acesse o material complementar para acelerar o seu
                  desenvolvimento
                </div>
              </div>
            </div>
            <div className="flex-1 md:w-1/2 mt-4 md:mt-0">
              <div className="border-green-300 text-center border-2 rounded-lg p-4 flex flex-col justify-center items-center h-48">
                <div className="text-4xl text-green-300 mb-2">
                  <FaImage />
                </div>
                <div className="text-green-300 text-xl font-bold mb-2">
                  Wallpapers exclusivos
                </div>
                <div className="text-green-300 text-sm">
                  Baixe wallpapers exclusivos do Ignite Lab e personalize a sua
                  máquina
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-2/6 right-0 top-18 mx-2 bg-opacity-40 mt-4 md:mt-0">
          <Accordion
            allowMultiple
            className="overflow-y-auto h-[calc(100vh-17rem)] bg-main rounded-md"
          >
            {course?.topicos?.map((topico: any, index: number) => (
              <AccordionItem
                key={index}
                className={`border-b border-gray-400 ${
                  topico.concluido ? 'border-green-500' : ''
                }`}
              >
                <h2 className="text-gray-400">
                  <AccordionButton className="flex justify-between items-center py-2 px-4">
                    <span className="font-extrabold text-left">
                      {topico?.titulo}
                    </span>
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} className="text-gray-400 px-4 py-2 mb-2">
                  {topico?.videos?.map((video: any, videoIndex: number) => (
                    <div
                      key={videoIndex}
                      className={`flex gap-3 items-center pl-2 py-2 ${
                        video.concluido
                          ? 'border-l-4 border-green-500 -opacity-50'
                          : 'border-l-4 border-gray-400'
                      }`}
                    >
                      <AiFillPlayCircle size={24} />
                      <Link to={video?.link} className="text-sm">
                        {video?.titulo}
                      </Link>
                    </div>
                  ))}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </Layout>
  )
}
