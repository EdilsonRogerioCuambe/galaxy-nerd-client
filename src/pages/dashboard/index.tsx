import { SideBar } from '../../layout/sidebar'
import { FaRegListAlt, FaUsers } from 'react-icons/fa'
import { HiViewGrid } from 'react-icons/hi'

export function Dashboard() {
  const data = [
    {
      bg: 'bg-purple-300',
      icon: <FaRegListAlt className="text-2xl" />,
      titulo: 'Total de Filmes',
      total: 90,
    },
    {
      bg: 'bg-green-300',
      icon: <HiViewGrid className="text-2xl" />,
      titulo: 'Total de Categorias',
      total: 10,
    },
    {
      bg: 'bg-yellow-300',
      icon: <FaUsers className="text-2xl" />,
      titulo: 'Total de Usuários',
      total: 100,
    },
  ]
  return (
    <>
      <SideBar>
        <h2>Dashboard</h2>
        <div className="grid sm:grid-cols-2 lg:grid-col-3 gap-6 mt-4">
          {data.map((item, index) => (
            <div
              key={index}
              className={`p-4 rounded bg-main border-border grid grid-cols-4 gap-2`}
            >
              <div
                className={`col-span-1 rounded-full h-12 w-12 flex-colo text-main ${item.bg}`}
              >
                {item.icon}
              </div>
              <div className="col-span-3">
                <h2 className="text-[#e1e1e6]">{item.titulo}</h2>
                <p className="text-xs mt-2 font-bold">{item.total}</p>
              </div>
            </div>
          ))}
        </div>
        <h3 className="text-md font-medium italic my-6 text-[#e1e1e6]">
          Últimos Cursos
        </h3>
        {/* <Table data={Cursos.slice(0, 5)} admin={true} /> */}
      </SideBar>
    </>
  )
}
