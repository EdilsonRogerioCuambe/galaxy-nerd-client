import { BsFillGridFill } from 'react-icons/bs'
import { FaHeart, FaList, FaUsers } from 'react-icons/fa'
import { RiLockPasswordLine, RiMovie2Fill } from 'react-icons/ri'
import { HiViewGrid } from 'react-icons/hi'
import { Layout } from '..'
import { NavLink } from 'react-router-dom'
import React from 'react'

export function SideBar({ children }: { children: React.ReactNode }) {
  const links = [
    {
      title: 'Dashboard',
      link: '/dashboard',
      icon: <BsFillGridFill className="w-6 h-6" />,
    },
    {
      title: 'Cursos',
      link: '/courses-list',
      icon: <FaList className="w-6 h-6" />,
    },
    {
      title: 'Add Curso',
      link: '/add-curso',
      icon: <RiMovie2Fill className="w-6 h-6" />,
    },
    {
      title: 'Categorias',
      link: '/categories',
      icon: <HiViewGrid className="w-6 h-6" />,
    },
    {
      title: 'Usuários',
      link: '/usuarios',
      icon: <FaUsers className="w-6 h-6" />,
    },
    {
      title: 'Atualizar Perfil',
      link: '/atualizar-perfil',
      icon: <FaUsers className="w-6 h-6" />,
    },
    {
      title: 'Favoritos',
      link: '/favoritos',
      icon: <FaHeart className="w-6 h-6" />,
    },
    {
      title: 'Mudar Senha',
      link: '/mudar-senha',
      icon: <RiLockPasswordLine className="w-6 h-6" />,
    },
  ]

  const active = 'text-green-300 bg-main'
  const hover = 'hover:text-green-300'
  const inActive =
    'rounded font-medium text-sm transitions flex gap-3 items-center p-4'

  const Hover = ({ isActive }: { isActive: boolean }) => {
    return isActive ? `${active} ${inActive}` : `${inActive} ${hover}`
  }

  return (
    <>
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
    </>
  )
}
