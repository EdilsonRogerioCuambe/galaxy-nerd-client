import { Link } from 'react-router-dom'
import banner1 from '../../assets/images/banner_1.png'
import { AiOutlineUserAdd } from 'react-icons/ai'
import { MdLogin } from 'react-icons/md'

export function Promos() {
  return (
    <>
      <div className="my-20 py-10 md:px-20 px-8 bg-[#202024] rounded-md shadow-lg">
        <div className="lg:grid lg:grid-cols-2 lg:gap-10 items-center">
          <div className="flex lg:gap-10 gap-6 flex-col">
            <h1 className="xl:text-3xl text-[#e1e1e6] text-xl capitalize font-medium xl:leading-relaxed">
              Aprenda os tópicos mais recentes e avançados em nossos cursos.
            </h1>
            <p className="text-[#c4c4cc] text-sm xl:text-base leading-6 xl:leading-8">
              Invista em seu conhecimento agora e tenha acesso a uma ampla
              variedade de cursos. A partir de apenas R$ 9,90 por mês.
              Compatível com qualquer dispositivo. Experimente gratuitamente por
              30 dias.
            </p>
            <div className="flex gap-4 md:text-lg text-sm">
              <Link
                to="/register"
                className="bg-quinary text-white rounded-lg px-4 py-2 mt-4 text-lg font-semibold transitions hover:bg-opacity-80"
              >
                <AiOutlineUserAdd size={20} className="mr-2 inline-block" />
                Cadastre-se
              </Link>
              <Link
                to="/login"
                className="bg-tertiary text-white rounded-lg px-4 py-2 mt-4 text-lg font-semibold transitions hover:bg-opacity-80"
              >
                <MdLogin size={20} className="mr-2 inline-block" />
                Login
              </Link>
            </div>
          </div>
          <div className="">
            <img
              src={banner1}
              alt="Banner"
              className="w-full object-contain mt-10 rounded-md"
            />
          </div>
        </div>
      </div>
    </>
  )
}
