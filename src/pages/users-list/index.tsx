import { useGetAdminsQuery } from '../../slices/admin/apiSlice/adminsApiSlice'
import { AdminSideBar } from '../../layout/sidebar/admin'
import { UsersOrCategoriesTable } from '../../components/table-2'
import { useEffect, useState } from 'react'

export function AdminUsersList() {
  const { data: admins } = useGetAdminsQuery({})

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
          data={admins}
          index={0}
          key={0}
          handleEdit={handleEdit}
        />
      </div>
    </AdminSideBar>
  )
}
