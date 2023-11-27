import { InstructorSideBar } from '../../../layout/sidebar/instructor'
import { useGetInstructorQuery } from '../../../slices/instructor/apiSlice/instructorsApiSlice'
import { Table } from '../../../components/table'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'

export function InstructorCoursesLists() {
  const { instructor } = useSelector((state: RootState) => state.instructorAuth)
  const { data: instructorData } = useGetInstructorQuery(instructor?.id)

  console.log(instructorData?.instructor?.courses)

  return (
    <>
      <InstructorSideBar>
        <div className="flex flex-col text-[#c4c4cc] gap-6">
          <div className="flex-betweens gap-2">
            <h2 className="text-xl font-bold">Meus Cursos</h2>
            <button
              type="button"
              title="Deletar Curso"
              className="bg-main font-medium transitions hover:bg-quinary py-3 px-6 rounded"
            >
              Deletar Selecionados
            </button>
          </div>

          <Table data={instructorData?.instructor?.courses} admin={true} />
        </div>
      </InstructorSideBar>
    </>
  )
}
