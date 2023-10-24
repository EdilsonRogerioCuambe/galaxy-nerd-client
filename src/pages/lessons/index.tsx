import { Link, useParams } from 'react-router-dom'
import { Layout } from '../../layout'
import { BiArrowBack } from 'react-icons/bi'
import { FaHeart } from 'react-icons/fa'
import { useGetCourseBySlugQuery } from '../../slices/courseSlices/courseApiSlice'
import { useGetLessonBySlugQuery } from '../../slices/lessonsSlices/lessonsApiSlice'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import { useRef, useEffect } from 'react'
import { ForumComponent } from '../../components/forum-component'
import { CourseAccordionProps } from '../../components/course-accordion'
import {
  MaterialComponent,
  WallpaperComponent,
  LessonDetailsComponent,
} from '../../components/course-page-components'

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

    if (videoRef.current && lessonData?.lesson?.lesson?.videoUrl) {
      const videoElement = document.createElement('video-js')
      videoElement.classList.add('vjs-big-play-centered')
      videoElement.classList.add('vjs-16-9')
      videoElement.classList.add('vjs-playeflix')
      videoElement.classList.add('vjs-playeflix-skin')

      videoRef.current.appendChild(videoElement)
      playerRef.current = videojs(videoElement, options, () => {
        videojs.log('player is ready')
      })

      playerRef.current.on('ended', () => {
        console.log('video ended')
      })
    }
  }, [lessonData?.lesson?.lesson?.videoUrl])

  useEffect(() => {
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose()
        playerRef.current = null
      }
    }
  }, [])

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
          <LessonDetailsComponent
            instructor={course?.course?.course?.instructor}
            lesson={lessonData?.lesson?.lesson}
          />
          <div className="mt-4 md:flex md:flex-row md:space-x-4">
            <MaterialComponent />
            <WallpaperComponent />
          </div>
        </div>
        <CourseAccordionProps course={course} slug={slug || ''} />
      </div>

      <div className="bg-[#202024] container mx-auto p-6 mt-8 rounded-md h-[calc(100vh-17rem)] overflow-y-auto">
        <Link
          to={`/course/${course?.course?.course?.slug}/lesson/${lessonData?.lesson?.lesson?.slug}/add-question`}
          className="bg-quinary text-white font-semibold py-2 px-4 rounded hover:bg-senary mt-4 mb-4"
        >
          Nova pergunta
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
