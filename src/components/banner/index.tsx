import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import { Cursos } from '../../data/Cursos'
import { Link } from 'react-router-dom'
import { FaHeart } from 'react-icons/fa'
import { BsFillPlayFill } from 'react-icons/bs'
import { FlexCourseItens } from '../flexCourseItens'

export function Banner() {
  return (
    <div className="relative w-full">
      <Swiper
        direction="vertical"
        spaceBetween={0}
        slidesPerView={1}
        loop
        speed={2500}
        autoplay={{ delay: 4000 }}
        modules={[Autoplay]}
        pagination={{ clickable: true }}
        className="w-full xl:h-96 bg-secondary lg:h-64 h-60"
      >
        {Cursos.slice(0, 9).map((curso, index) => (
          <SwiperSlide key={index} className="relative rounded overflow-hidden">
            <img
              src={curso.imagem}
              alt={curso.nome}
              className="object-fill w-full"
            />
            <div className="absolute linear-bg xl:pl-52 pl-8 top-0 bottom-0 flex flex-col justify-center right-0 left-0 lg:gap-8 md:gap-5 gap-4">
              <h1 className="xl:text-4xl truncate capitalize text-[#e1e1e6] sm:text-2xl text-xl font-extrabold">
                {curso.nome}
              </h1>
              <div className="flex gap-5 items-center">
                <p className="text-[#c4c4cc] font-medium text-lg">
                  {curso.descricao.length > 200
                    ? curso.descricao.slice(0, 50) + '...'
                    : curso.descricao}
                </p>
              </div>
              <div className="flex gap-5 items-center text-[#c4c4cc]">
                <FlexCourseItens course={curso} />
              </div>
              <div className="flex gap-5 items-center">
                <Link
                  to={`/curso/${curso.id}`}
                  className="bg-quinary text-[#e1e1e6] px-4 py-2 rounded-md font-medium hover:bg-opacity-80 transition duration-300 ease-in-out"
                >
                  Assistir <BsFillPlayFill className="inline-block w-6 h-6" />
                </Link>
                <button
                  title="Favoritar"
                  className="bg-[#00b37e] transitions text-white px-4 py-2 rounded text-sm bg-opacity-30 hover:bg-opacity-80 transition duration-300 ease-in-out"
                >
                  <FaHeart className="inline-block w-6 h-6" />
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
