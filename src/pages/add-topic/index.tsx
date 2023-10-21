import { InstructorSideBar } from '../../layout/sidebar/instructor'
import { useGetInstructorQuery } from '../../slices/instructor/apiSlice/instructorsApiSlice'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { Table } from '../../components/table'

export function InstructorAddTopicsToCourse() {
  const { instructor } = useSelector((state: RootState) => state.instructorAuth)
  const { data: instructorData } = useGetInstructorQuery(instructor?.id)

  return (
    <InstructorSideBar>
      <div className="flex flex-col gap-6">
        <div className="flex-betweens gap-2">
          <h2 className="text-xl font-bold">Adicionar Topicos</h2>
        </div>

        <Table
          data={instructorData?.instructor.courses || []}
          admin={true}
          addTopics={true}
        />
      </div>
    </InstructorSideBar>
  )
}
