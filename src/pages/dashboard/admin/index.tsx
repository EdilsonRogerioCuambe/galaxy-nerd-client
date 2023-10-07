import { FaRegListAlt, FaUsers } from 'react-icons/fa'
import { HiViewGrid } from 'react-icons/hi'
import { Table } from '../../../components/table'
import { AdminSideBar } from '../../../layout/sidebar/admin'
import { useGetCategoriesQuery } from '../../../slices/categorySlices/categoryApiSlice'
import { useGetCoursesQuery } from '../../../slices/courseSlices/courseApiSlice'
import { useGetAdminsQuery } from '../../../slices/admin/apiSlice/adminsApiSlice'
import { useGetInstructorsQuery } from '../../../slices/instructor/apiSlice/instructorsApiSlice'

export function AdminDashboard() {
  const { data: categories } = useGetCategoriesQuery({})
  const { data: courses } = useGetCoursesQuery({})

  const { data: admins } = useGetAdminsQuery({})
  const { data: instructors } = useGetInstructorsQuery({})

  const combinedData = [
    ...(admins?.admins || []),
    ...(instructors?.instructors || []),
  ]

  const data = [
    {
      bg: 'bg-purple-300',
      icon: <FaRegListAlt className="text-2xl" />,
      titulo: 'Total de Cursos',
      total: courses?.courses.length || 0,
    },
    {
      bg: 'bg-green-300',
      icon: <HiViewGrid className="text-2xl" />,
      titulo: 'Total de Categorias',
      total: categories?.categories.length || 0,
    },
    {
      bg: 'bg-yellow-300',
      icon: <FaUsers className="text-2xl" />,
      titulo: 'Total de Usuários',
      total: combinedData.length || 0,
    },
  ]

  return (
    <>
      <AdminSideBar>
        <div className="flex-betweens gap-2">
          <h2 className="text-xl font-bold">Dashboard</h2>
        </div>
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
        <Table data={courses?.courses} admin={true} />
      </AdminSideBar>
    </>
  )
}
