import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from '@chakra-ui/react'
import { AiFillPlayCircle } from 'react-icons/ai'
import { Link } from 'react-router-dom'

interface TopicsProps {
  completed: boolean
  lessons: {
    concluido: boolean
    slug: string
    title: string
  }[]
  title: string
}

interface CourseAccordionProps {
  course: {
    course: {
      course: {
        topics: TopicsProps[]
      }
    }
  }
  slug: string
}

interface LessonProps {
  concluido: boolean
  slug: string
  title: string
}

export function CourseAccordionProps({ course, slug }: CourseAccordionProps) {
  return (
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
              <AccordionPanel pb={4} className="text-gray-400 px-4 py-2 mb-2">
                {topic?.lessons?.map((video: LessonProps, videoIndex) => (
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
  )
}
