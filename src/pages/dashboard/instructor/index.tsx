import { FaRegListAlt, FaUsers } from 'react-icons/fa'
import { InstructorSideBar } from '../../../layout/sidebar/instructor'
import { HiViewGrid } from 'react-icons/hi'
import { useGetCategoriesQuery } from '../../../slices/categorySlices/categoryApiSlice'
import { useGetCoursesQuery } from '../../../slices/courseSlices/courseApiSlice'

export function InstructorDashboard() {
  const { data: categories } = useGetCategoriesQuery({})
  const { data: courses } = useGetCoursesQuery({})

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
      total: 0,
    },
  ]

  return (
    <InstructorSideBar>
      <div className="flex-betweens gap-2">
        <h2 className="text-xl font-bold">Dashboard</h2>
      </div>
    </InstructorSideBar>
  )
}
