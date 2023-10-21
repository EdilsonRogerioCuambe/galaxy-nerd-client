import { MdOutlinePlayLesson } from 'react-icons/md'
import { Header } from '../header'
import { Link } from 'react-router-dom'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  List,
  ListItem,
} from '@chakra-ui/react'

interface LanguageProps {
  id: string
  name: string
  icon: string
}

interface TopicsProps {
  id: string
  title: string
  order: string
  description: string
  lessons: {
    id: string
    title: string
    order: string
    duration: string
    videoUrl: string
  }[]
}

interface CoursesProps {
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
  instructor: {
    name: string
    avatar: string
  }
  topics: TopicsProps[]
  languages: LanguageProps[]
}

export function SampleLessons({ course }: { course: CoursesProps }) {
  return (
    <div className="my-12 text-[#c4c4cc]">
      <Header header="O que você vai aprender" Icon={MdOutlinePlayLesson} />
      <div className="mt-10 h-96 overflow-y-auto bg-secondary">
        {course?.topics?.map((topic: TopicsProps, index: number) => (
          <Accordion
            key={index}
            allowToggle
            border="none"
            defaultIndex={[0]}
            className=""
          >
            <AccordionItem border="none">
              <h2>
                <AccordionButton
                  _expanded={{
                    bg: 'transparent',
                    color: '#c4c4cc',
                    borderRadius: '0.5rem',
                  }}
                  _focus={{
                    boxShadow: 'none',
                  }}
                  className="flex justify-between items-center text-[#c4c4cc] px-4 py-2 rounded-md"
                >
                  <span className="text-lg">{topic?.title}</span>

                  <span className="text-sm text-[#c4c4cc]">
                    {topic?.lessons?.length === undefined
                      ? '0 aulas'
                      : `${topic?.lessons?.length} aulas`}
                  </span>
                </AccordionButton>
              </h2>
              <AccordionPanel
                className="bg-[#c4c4cc] text-[#c4c4cc] rounded-md"
                pb={4}
              >
                <List spacing={3}>
                  {topic?.lessons?.map((lesson, index) => (
                    <ListItem key={index} className="flex items-center">
                      <Link
                        to={`/course/${course?.slug}/${lesson?.order}`}
                        className="flex items-center"
                      >
                        <span className="text-lg mr-2">{lesson?.title}</span>
                      </Link>
                    </ListItem>
                  ))}
                </List>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </div>
  )
}
