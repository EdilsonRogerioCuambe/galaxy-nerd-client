import { BsFillGridFill } from 'react-icons/bs'
import { FaList, FaUsers } from 'react-icons/fa'
import { RiLockPasswordLine, RiMovie2Fill } from 'react-icons/ri'
import { Layout } from '../..'
import { NavLink } from 'react-router-dom'
import { MdTopic, MdOutlineClass, MdQuiz } from 'react-icons/md'
import { CiSquareQuestion } from 'react-icons/ci'

export function InstructorSideBar({ children }: { children: React.ReactNode }) {
  const links = [
    {
      title: 'Dashboard',
      link: '/instructor-dashboard',
      icon: <BsFillGridFill className="w-6 h-6" />,
    },
    {
      title: 'Cursos',
      link: '/instructor-courses-list',
      icon: <FaList className="w-6 h-6" />,
    },
    {
      title: 'Add Curso',
      link: '/instructor-add-course',
      icon: <RiMovie2Fill className="w-6 h-6" />,
    },
    {
      title: 'Add Topicos',
      link: '/instructor-add-topics-to-course',
      icon: <MdTopic className="w-6 h-6" />,
    },
    {
      title: 'Add Aulas',
      link: '/instructor-add-lessons-to-course',
      icon: <MdOutlineClass className="w-6 h-6" />,
    },
    {
      title: 'Add Quiz',
      link: '/instructor-add-quiz',
      icon: <MdQuiz className="w-6 h-6" />,
    },
    {
      title: 'Add Problemas',
      link: '/instructor-add-problem-set',
      icon: <CiSquareQuestion className="w-6 h-6" />,
    },
    {
      title: 'Usuários',
      link: '/admin-users',
      icon: <FaUsers className="w-6 h-6" />,
    },
    {
      title: 'Atualizar Perfil',
      link: '/admin-update-profile',
      icon: <FaUsers className="w-6 h-6" />,
    },
    // {
    //   title: 'Favoritos',
    //   link: '/admin-favoritos',
    //   icon: <FaHeart className="w-6 h-6" />,
    // },
    {
      title: 'Mudar Senha',
      link: '/admin-update-password',
      icon: <RiLockPasswordLine className="w-6 h-6" />,
    },
  ]

  const active = 'text-purple-300 bg-main'
  const hover = 'hover:text-green-300'
  const inActive =
    'rounded font-medium text-sm transitions flex gap-3 items-center p-4'

  const Hover = ({ isActive }: { isActive: boolean }) => {
    return isActive ? `${active} ${inActive}` : `${inActive} ${hover}`
  }

  return (
    <Layout>
      <div className="min-height-screen text-[#c4c4cc] container mx-auto px-2">
        <div className="xl:grid grid-cols-8 gap-10 items-start md:-py12 py-6">
          <div className="col-span-2 sticky bg-secondary text-white p-6 rounded-md xl:mb-0 mb-5">
            {links.map((link, index) => (
              <NavLink
                key={index}
                to={link.link}
                className={Hover({
                  isActive: link.link === window.location.pathname,
                })}
              >
                <span className="text-2xl mr-3">{link.icon}</span>
                {link.title}
              </NavLink>
            ))}
          </div>
          <div
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="10"
            data-aos-offset="200"
            className="col-span-6 rounded-md bg-secondary p-6"
          >
            {children}
          </div>
        </div>
      </div>
    </Layout>
  )
}
