import { Table } from '../../../components/table'
import { AdminSideBar } from '../../../layout/sidebar/admin'
import { useGetCoursesQuery } from '../../../slices/courseSlices/courseApiSlice'

export function AdminCoursesLists() {
  const { data: courses } = useGetCoursesQuery({})

  return (
    <>
      <AdminSideBar>
        <div className="flex flex-col text-[#c4c4cc] gap-6">
          <div className="flex-betweens gap-2">
            <h2 className="text-xl font-bold">Lista de Cursos</h2>
            <button
              type="button"
              title="Deletar Curso"
              className="bg-main font-medium transitions hover:bg-quinary py-3 px-6 rounded"
            >
              Deletar Selecionados
            </button>
          </div>

          <Table data={courses?.courses} admin={false} />
        </div>
      </AdminSideBar>
    </>
  )
}
