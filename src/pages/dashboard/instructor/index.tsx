import { FaRegListAlt, FaUsers } from 'react-icons/fa'
import { InstructorSideBar } from '../../../layout/sidebar/instructor'
import { HiViewGrid } from 'react-icons/hi'
import { useGetCategoriesQuery } from '../../../slices/categorySlices/categoryApiSlice'
import { useGetCoursesQuery } from '../../../slices/courseSlices/courseApiSlice'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { useGetInstructorQuery } from '../../../slices/instructor/apiSlice/instructorsApiSlice'
import { Table } from '../../../components/table'

interface ICourse {
  id: string
  title: string
  description: string
  price: string
  shortDescription: string
  duration: string
  slug: string
  level: string
  thumbnail: string
  image: string
  enrollments: string[]
}

export function InstructorDashboard() {
  const { data: categories } = useGetCategoriesQuery({})
  const { data: courses } = useGetCoursesQuery({})
  const { instructor } = useSelector((state: RootState) => state.instructorAuth)
  const { data: instructorData } = useGetInstructorQuery(instructor?.id || '')
  console.log(instructorData)

  const data = [
    {
      bg: 'bg-purple-300',
      icon: <FaRegListAlt className="text-2xl" />,
      titulo: 'Meus cursos',
      total: instructorData?.instructor.courses.length || 0,
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
      total:
        instructorData?.instructor.courses.reduce(
          ({ total }: { total: number }, course: ICourse) =>
            total + course.enrollments.length,
          0,
        ) || 0,
    },
  ]

  return (
    <InstructorSideBar>
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
        Meus Últimos Cursos
      </h3>
      <Table data={instructorData?.instructor.courses || []} admin={false} />
    </InstructorSideBar>
  )
}
