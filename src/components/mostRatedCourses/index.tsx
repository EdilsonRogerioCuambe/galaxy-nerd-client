import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { BsBookmarkFill } from 'react-icons/bs'
import { FaChevronLeft, FaChevronRight, FaHeart, FaPlay } from 'react-icons/fa'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import { Header } from '../header'
import { Cursos } from '../../data/Cursos'
import { Stars } from '../stars'

export function MostRatedCourses() {
  const nextRef = useRef<HTMLButtonElement | null>(null)
  const previousRef = useRef<HTMLButtonElement | null>(null)
  const [viewport, setViewport] = useState(window.innerWidth)

  useEffect(() => {
    const handleWindowResize = () => setViewport(window.innerWidth)
    window.addEventListener('resize', handleWindowResize)
    return () => window.removeEventListener('resize', handleWindowResize)
  }, [])
  const slidesPerView = viewport < 768 ? 1 : viewport < 1024 ? 2 : 4

  const classNames =
    'w-12 h-12 rounded-full bg-white bg-opacity-30 text-[#c4c4cc] flex justify-center items-center cursor-pointer transition duration-200 hover:bg-quinary'
  return (
    <>
      <Header header="Cursos Mais Pontuados" Icon={BsBookmarkFill} />
      <div className="mt-10">
        <Swiper
          navigation={{
            nextEl: nextRef.current,
            prevEl: previousRef.current,
          }}
          slidesPerView={slidesPerView}
          spaceBetween={40}
          loop={true}
          speed={1000}
          modules={[Navigation, Autoplay]}
        >
          {Cursos.map((curso, index) => (
            <SwiperSlide key={index}>
              <div className="p-4 h-rate border border-border bg-dry rounded-lg overflow-hidden relative">
                <img
                  src={curso.thumbnail || curso.imagem}
                  alt={curso.nome}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="px-4 gap-2 flex flex-col justify-center items-center text-center absolute bg-black bg-opacity-70 top-0 left-0 right-0 bottom-0">
                  <div className="flex gap-2">
                    <button
                      title="Favoritar"
                      className="w-12 h-12 transitions hover:bg-subMain rounded-full bg-white bg-opacity-30 text-white"
                    >
                      <FaHeart className="w-6 h-6 m-auto" />
                    </button>
                    <Link to={`/filme/${curso.id}`}>
                      <button
                        title="Ver Curso"
                        className="w-12 h-12 transitions hover:bg-subMain rounded-full bg-white bg-opacity-30 text-white"
                      >
                        <FaPlay className="w-6 h-6 m-auto" />
                      </button>
                    </Link>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      {curso.nome}
                    </h2>
                  </div>
                  <div className="flex gap-2 text-star mt-2">
                    <Stars stars={curso.avaliacoes} />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="w-full px-1 flex-rows gap-6 pt-12">
          <button
            type="button"
            title="Anterior"
            className={classNames}
            ref={nextRef}
          >
            <FaChevronLeft className="w-6 h-6 m-auto" />
          </button>
          <button
            type="button"
            title="Proximo"
            className={classNames}
            ref={previousRef}
          >
            <FaChevronRight className="w-6 h-6 m-auto" />
          </button>
        </div>
      </div>
    </>
  )
}
