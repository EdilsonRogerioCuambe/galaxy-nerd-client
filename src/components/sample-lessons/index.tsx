import { MdOutlinePlayLesson } from 'react-icons/md'
import { Header } from '../header'
import { Link } from 'react-router-dom'
import {
  AccordionItem,
  AccordionHeader,
  AccordionContent,
  AccordionTrigger,
} from '@radix-ui/react-accordion'
import * as Accordion from '@radix-ui/react-accordion'

export function SampleLessons({ course }: { course: any }) {
  return (
    <div className="my-12 text-[#c4c4cc]">
      <Header header="O que você vai aprender" Icon={MdOutlinePlayLesson} />
      <div className="mt-10">
        <Accordion.Root type="single">
          {course.topicos.map(
            (
              topico: {
                titulo: string
                videos: { titulo: string; link: string }[]
              },
              index: number,
            ) => (
              <AccordionItem key={index} value={index.toString()}>
                <AccordionHeader className="flex items-center justify-between w-full py-4 px-6 text-left border-b border-[#c4c4cc]">
                  <AccordionTrigger className="flex items-center justify-between w-full">
                    <span className="text-lg font-semibold">
                      {topico.titulo}
                    </span>
                    <span className="text-[#c4c4cc]">
                      {topico.videos.length} aulas
                    </span>
                  </AccordionTrigger>
                </AccordionHeader>
                <AccordionContent className="py-4 px-6">
                  <ul className="space-y-2">
                    {topico.videos.map(
                      (
                        video: { titulo: string; link: string },
                        index: number,
                      ) => (
                        <li key={index}>
                          <Link
                            to={`/course/${course.slug}/${video.link}`}
                            className="text-lg font-semibold"
                          >
                            {video.titulo}
                          </Link>
                        </li>
                      ),
                    )}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ),
          )}
        </Accordion.Root>
      </div>
    </div>
  )
}
