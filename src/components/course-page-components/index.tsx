import React from 'react'
import { BsDiscord } from 'react-icons/bs'
import { FaBook, FaImage } from 'react-icons/fa'
import { SiApachestorm } from 'react-icons/si'
import { Link } from 'react-router-dom'

interface InstructorProps {
  instructor: {
    avatar: string
    biography: string
    name: string
  }
}

const InstructorComponent: React.FC<InstructorProps> = ({ instructor }) => (
  <div className="flex items-center mt-4">
    <img
      className="rounded-full object-cover border-2 border-quinary w-14 h-14"
      src={instructor?.avatar}
      alt={instructor?.name}
    />
    <div className="flex flex-col ml-2">
      <div className="text-lg text-[#e1e1e6] font-semibold">
        {instructor?.name}
      </div>
      <div className="text-[#c4c4cc]">{instructor?.biography}</div>
    </div>
  </div>
)

const MaterialComponent: React.FC = () => (
  <div className="border-red-300 border-2 text-center rounded-lg p-4 flex flex-col justify-center items-center h-48">
    <div className="text-4xl text-red-300 mb-2">
      <FaBook />
    </div>
    <div className="text-red-300 text-xl font-bold mb-2">
      Material complementar
    </div>
    <div className="text-red-300 text-sm">
      Acesse o material complementar para acelerar o seu desenvolvimento
    </div>
  </div>
)

const WallpaperComponent: React.FC = () => (
  <div className="border-green-300 text-center border-2 rounded-lg p-4 flex flex-col justify-center items-center h-48">
    <div className="text-4xl text-green-300 mb-2">
      <FaImage />
    </div>
    <div className="text-green-300 text-xl font-bold mb-2">
      Wallpapers exclusivos
    </div>
    <div className="text-green-300 text-sm">
      Baixe wallpapers exclusivos do Ignite Lab e personalize a sua máquina
    </div>
  </div>
)

interface LessonProps {
  instructor: {
    avatar: string
    biography: string
    name: string
  }
  lesson: {
    id: string
    title: string
    description: string
    videoUrl: string
    slug: string
  }
}

const LessonDetailsComponent: React.FC<LessonProps> = ({
  instructor,
  lesson,
}) => (
  <>
    <div className="mt-4 flex flex-col md:flex-row bg-main p-6 shadow-md rounded-lg">
      <div className="w-full md:w-3/4 md:pr-4">
        <div className="text-[#e1e1e6] text-xl md:text-2xl font-bold leading-[33.60px] mt-2">
          {lesson?.title}
        </div>
        <div className="text-[#c4c4cc] text-base md:text-lg font-normal leading-relaxed mt-2">
          {lesson?.description}
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
              to={`/challenge/${lesson?.slug}`}
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
        src={instructor?.avatar}
        alt={instructor?.name}
      />
      <div className="flex flex-col ml-2">
        <div className="text-lg text-[#e1e1e6] font-semibold">
          {instructor?.name}
        </div>
        <div className="text-[#c4c4cc]">{instructor?.biography}</div>
      </div>
    </div>
  </>
)

export {
  InstructorComponent,
  MaterialComponent,
  LessonDetailsComponent,
  WallpaperComponent,
}
