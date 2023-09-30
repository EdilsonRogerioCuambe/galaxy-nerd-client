import { FiUser } from 'react-icons/fi'
import banner1 from '../../assets/images/banner_1.png'

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
              <div className="flex-colo text-[#c4c4cc] bg-quinary px-6 py-3 rounded font-bold">
                HD 4K
              </div>
              <div className="flex-rows text-[#c4c4cc] bg-quinary px-6 py-3 rounded font-bold">
                <FiUser className="w-5 h-5 m-auto" />4 Telas
              </div>
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
