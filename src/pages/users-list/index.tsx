import { useGetAdminsQuery } from '../../slices/admin/apiSlice/adminsApiSlice'
import { useGetInstructorsQuery } from '../../slices/instructor/apiSlice/instructorsApiSlice'
import { AdminSideBar } from '../../layout/sidebar/admin'
import { UsersOrCategoriesTable } from '../../components/table-2'

export function AdminUsersList() {
  const { data: admins } = useGetAdminsQuery({})
  const { data: instructors } = useGetInstructorsQuery({})

  const combinedData = [
    ...(admins?.admins || []),
    ...(instructors?.instructors || []),
  ]

  const handleEdit = (id: string) => {
    console.log(id)
  }

  return (
    <AdminSideBar>
      <div className="flex flex-col text-[#c4c4cc] gap-6">
        <div className="flex-betweens gap-2">
          <h2 className="text-xl font-bold">Lista de usuários</h2>
        </div>
        <UsersOrCategoriesTable
          users={true}
          data={combinedData}
          index={0}
          key={0}
          handleEdit={handleEdit}
        />
      </div>
    </AdminSideBar>
  )
}
