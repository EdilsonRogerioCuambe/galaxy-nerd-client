import {
  FaChartLine,
  FaCode,
  FaCog,
  FaGraduationCap,
  FaHtml5,
  FaMobileAlt,
  FaRobot,
  FaSignOutAlt,
  FaUser,
  FaUserCircle,
  FaCertificate,
} from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import logo from '../../assets/images/logo.png'

export function Footer() {
  const Links = [
    {
      title: 'Categorias de Programação',
      links: [
        {
          name: 'Todos os Cursos',
          path: '/todos-os-cursos',
          icon: <FaCode className="w-6 h-6" />,
        },
        {
          name: 'Desenvolvimento Web',
          path: '/desenvolvimento-web',
          icon: <FaHtml5 className="w-6 h-6" />,
        },
        {
          name: 'Ciência de Dados',
          path: '/ciencia-de-dados',
          icon: <FaChartLine className="w-6 h-6" />,
        },
        {
          name: 'Programação Mobile',
          path: '/programacao-mobile',
          icon: <FaMobileAlt className="w-6 h-6" />,
        },
        {
          name: 'Inteligência Artificial',
          path: '/inteligencia-artificial',
          icon: <FaRobot className="w-6 h-6" />,
        },
      ],
    },
    {
      title: 'Meus Cursos',
      links: [
        {
          name: 'Meus Cursos',
          path: '/meus-cursos',
          icon: <FaGraduationCap className="w-6 h-6" />,
        },
        {
          name: 'Progresso',
          path: '/progresso',
          icon: <FaChartLine className="w-6 h-6" />,
        },
        {
          name: 'Certificados',
          path: '/certificados',
          icon: <FaCertificate className="w-6 h-6" />,
        },
      ],
    },
    {
      title: 'Minha Conta',
      links: [
        {
          name: 'Dashboard',
          path: '/dashboard',
          icon: <FaUserCircle className="w-6 h-6" />,
        },
        {
          name: 'Perfil',
          path: '/perfil',
          icon: <FaUser className="w-6 h-6" />,
        },
        {
          name: 'Configurações',
          path: '/configuracoes',
          icon: <FaCog className="w-6 h-6" />,
        },
        {
          name: 'Sair',
          path: '/sair',
          icon: <FaSignOutAlt className="w-6 h-6" />,
        },
      ],
    },
  ]

  return (
    <>
      <div className="bg-secondary py-4 border-t-2 border-[#c4c4cc] mt-6 text-[#c4c4cc]">
        <div className="container mx-auto px-2">
          <div className="grid grid-cols-2 md:grid-cols-7 xl:grid-cols-12 gap-5 sm:gap-9 lg:gap-11 xl:gap-7 py-10 justify-between">
            {Links.map((link, index) => (
              <div
                key={index}
                className="col-span-1 md:col-span-2 lg:col-span-3 pb-3.5 sm:pb-0"
              >
                <h1 className="text-md lg:leading-7 font-medium mb-4 sm:mb-5 pb-0.5">
                  {link.title}
                </h1>
                <ul className="text-sm flex flex-col space-y-3">
                  {link.links.map((item, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <NavLink
                        to={item.path}
                        className="inline-flex items-center w-full hover:text-subMain transitions"
                      >
                        <span className="w-6 h-6">{item.icon}</span>
                        <span className="px-1.5 py-1.5 rounded-md">
                          {item.name}
                        </span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="pb-3.5 sm:pb-0 col-span-1 md:col-span-2 lg:col-span-3">
              <NavLink to="/">
                <img
                  src={logo}
                  alt="Logo Galaxy Nerd"
                  className="w-2/4 object-cover pb-2"
                />
              </NavLink>
              <p className="leading-7 text-sm text-border">
                <span>
                  © 2023 Galaxy Nerd, Inc. Todos os direitos reservados.
                </span>
                <br />
                <span>Rua Eddy Rogerio Yuran, 1234 - São Paulo - SP</span>
                <br />
                <span>Tell: +55 11 1234-5678</span>
                <br />
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
