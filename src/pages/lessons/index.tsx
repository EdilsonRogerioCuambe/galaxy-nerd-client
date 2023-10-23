import { Link, useParams } from 'react-router-dom'
import { Layout } from '../../layout'
import { BiArrowBack } from 'react-icons/bi'
import { FaHeart, FaBook, FaImage } from 'react-icons/fa'
import { faker } from '@faker-js/faker'
import { AiFillPlayCircle } from 'react-icons/ai'
import { SiApachestorm } from 'react-icons/si'
import { BsDiscord } from 'react-icons/bs'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  List,
  ListItem,
} from '@chakra-ui/react'
import { MdCheckCircle, MdRadioButtonUnchecked } from 'react-icons/md'
import { useGetCourseBySlugQuery } from '../../slices/courseSlices/courseApiSlice'
import { useGetLessonBySlugQuery } from '../../slices/lessonsSlices/lessonsApiSlice'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import { useRef, useEffect } from 'react'
import { ForumComponent } from '../../components/forum-component'

interface TopicsProps {
  id: string
  title: string
  order: string
  completed: boolean
  description: string
  lessons: {
    id: string
    title: string
    order: string
    duration: string
    videoUrl: string
    slug: string
  }[]
}

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

export function Lessons() {
  const { slug, lesson } = useParams()
  const { data: course } = useGetCourseBySlugQuery(slug)
  const { data: lessonData } = useGetLessonBySlugQuery(lesson)
  const videoRef = useRef<HTMLDivElement | null>(null)
  const playerRef = useRef<videojs.Player | null>(null)

  console.log(lessonData?.lesson?.lesson)

  useEffect(() => {
    const options = {
      autoplay: true,
      aspectRatio: '16:9',
      controls: true,
      fluid: true,
      sources: [
        {
          src: lessonData?.lesson?.lesson?.videoUrl,
          type: 'video/mp4',
        },
      ],
    }

    if (!playerRef.current) {
      const videoElement = document.createElement('video-js')
      videoElement.classList.add('vjs-big-play-centered')
      videoElement.classList.add('vjs-16-9')
      videoElement.classList.add('vjs-playeflix')
      videoElement.classList.add('vjs-playeflix-skin')

      if (videoRef.current) {
        videoRef.current.appendChild(videoElement)
        playerRef.current = videojs(videoElement, options, () => {
          videojs.log('player is ready')
        })

        playerRef.current.on('ended', () => {
          console.log('video ended')
        })
      }
    } else {
      const player = playerRef.current
      if (player) {
        player.autoplay(options.autoplay)
        player.aspectRatio(options.aspectRatio)
      }
    }
  }, [lessonData?.lesson?.lesson?.videoUrl])

  useEffect(() => {
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose()
        playerRef.current = null
      }
    }
  }, [playerRef])

  return (
    <Layout>
      <div className="container mx-auto bg-secondary rounded-md mb-6 p-6 mt-8">
        <div className="flex-betweens flex-wrap gap-2 bg-main rounded border border-gray-800 py-6 px-6">
          <Link
            to={`/course/${course?.course?.course?.slug}`}
            className="md:text-xl text-sm flex gap-3 items-center font-bold text-[#c4c4cc]"
          >
            <BiArrowBack className="w-6 h-6" /> {course?.course?.course?.title}
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
          <div
            key={lessonData?.lesson?.lesson?.id}
            className="bg-main rounded-md overflow-hidden relative"
          >
            <div className="aspect-w-16 aspect-h-9">
              {lessonData?.lesson?.lesson?.videoUrl && (
                <div
                  data-vjs-playefa-rotate-180
                  className="vjs-playeflix vjs-playeflix-skin vjs-16-9 vjs-big-play-centered"
                  ref={videoRef}
                  key={lessonData?.lesson?.lesson?.id}
                  data-setup='{ "controls": true, "autoplay": false, "preload": "auto", "playbackRates": [1, 1.5, 2], "fluid": true, "plugins": { "playbackrate": { "clickable": true } } }'
                />
              )}
            </div>
          </div>
          <div className="mt-4 flex flex-col md:flex-row bg-main p-6 shadow-md rounded-lg">
            <div className="w-full md:w-3/4 md:pr-4">
              <div className="text-[#e1e1e6] text-xl md:text-2xl font-bold leading-[33.60px] mt-2">
                {lessonData?.lesson?.lesson?.title}
              </div>
              <div className="text-[#c4c4cc] text-base md:text-lg font-normal leading-relaxed mt-2">
                {lessonData?.lesson?.lesson?.description}
              </div>
            </div>
            <div className="w-full md:w-1/4 mt-4 md:mt-0 md:pl-4">
              <div className="md:flex flex-col">
                <div className="w-full h-14 px-6 py-4 bg-purple-800 rounded-lg flex justify-center items-center gap-2.5">
                  <BsDiscord className="w-6 h-6 text-[#e1e1e6]" />
                  <Link
                    to="/discord"
                    className="text-[#c4c4cc] text-sm font-bold uppercase leading-snug"
                  >
                    Comunidade no Discord
                  </Link>
                </div>
                <div className="w-full h-14 mt-4 md:mt-4 py-4 px-2 border-green-300 border-2 rounded-lg flex justify-center items-center gap-2.5">
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
              src={course?.course?.course?.instructor?.avatar}
              alt={course?.course?.course?.instructor?.name}
            />
            <div className="flex flex-col ml-2">
              <div className="text-lg text-[#e1e1e6] font-semibold">
                {course?.course?.course?.instructor?.name}
              </div>
              <div className="text-[#c4c4cc]">
                {course?.course?.course?.instructor?.biography}
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
            className="overflow-y-auto h-[calc(100vh-1rem)] bg-main rounded-md"
          >
            {course?.course?.course?.topics?.map(
              (topic: TopicsProps, index: number) => (
                <AccordionItem
                  key={index}
                  className={`border-b border-gray-400 ${
                    topic?.completed ? 'border-green-500' : ''
                  }`}
                >
                  <h2 className="text-gray-400">
                    <AccordionButton className="flex justify-between items-center py-2 px-4">
                      <span className="font-extrabold text-left">
                        {topic?.title}
                      </span>
                    </AccordionButton>
                  </h2>
                  <AccordionPanel
                    pb={4}
                    className="text-gray-400 px-4 py-2 mb-2"
                  >
                    {topic?.lessons?.map((video: any, videoIndex: number) => (
                      <div
                        key={videoIndex}
                        className={`flex gap-3 items-center pl-2 py-2 ${
                          video.concluido
                            ? 'border-l-4 border-green-500 -opacity-50'
                            : 'border-l-4 border-gray-400'
                        }`}
                      >
                        <AiFillPlayCircle size={24} />
                        <Link to={`/course/${slug}/lesson/${video?.slug}`}>
                          {video?.title}
                        </Link>
                      </div>
                    ))}
                  </AccordionPanel>
                </AccordionItem>
              ),
            )}
          </Accordion>
        </div>
      </div>

      {/** PERGUNTAS */}
      <div className="bg-[#202024] container mx-auto p-6 mt-8 rounded-md h-[calc(100vh-17rem)] overflow-y-auto">
        <Link
          to={`/course/${course?.course?.course?.slug}/lesson/${lessonData?.lesson?.lesson?.slug}/add-question`}
          className="bg-quinary text-white font-semibold py-2 px-4 rounded hover:bg-senary mt-4 mb-4"
        >
          Nova Issue
        </Link>
        <div className="mt-4">
          {lessonData?.lesson?.lesson?.forum?.map(
            (question: Forum, index: number) => (
              <ForumComponent key={index} question={question} />
            ),
          )}
        </div>
      </div>
    </Layout>
  )
}
