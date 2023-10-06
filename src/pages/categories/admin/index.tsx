import { ModalCategory } from '../../../components/modal-category'
import { useEffect, useState, useCallback } from 'react'
import { HiPlusCircle } from 'react-icons/hi'
import { UsersOrCategoriesTable } from '../../../components/table-2'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../../../store'
import { useSelector } from 'react-redux'
import { useGetCategoriesQuery } from '../../../slices/categorySlices/categoryApiSlice'
import { AdminSideBar } from '../../../layout/sidebar/admin'

export function AdminCategories() {
  const { user } = useSelector((state: RootState) => state.adminAuth)
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [category, setCategory] = useState('')
  const { data: categories } = useGetCategoriesQuery({})

  const handleEdit = useCallback(
    (id: string) => {
      setOpen(!open)
      setCategory(id)
    },
    [open],
  )

  useEffect(() => {
    if (open === false) {
      setCategory('')
    }
  }, [open])

  useEffect(() => {
    if (!user) {
      navigate('/admin')
    }
  }, [user, navigate])

  return (
    <>
      <AdminSideBar>
        <ModalCategory open={open} setOpen={setOpen} category={category} />
        <div className="flex flex-col gap-6">
          <div className="flex-betweens gap-2">
            <h2 className="text-xl font-bold">Admin Categorias</h2>
            <button
              title="Adicionar categoria"
              type="button"
              onClick={() => setOpen(true)}
              className="flex gap-2 items-center bg-main text-[#c4c4cc] px-4 py-2 rounded border-dotted border-2 border-main hover:bg-white hover:text-main"
            >
              <HiPlusCircle className="text-xl" />
            </button>
          </div>

          <UsersOrCategoriesTable
            data={categories?.categories || []}
            index={0}
            users={false}
            handleEdit={handleEdit}
          />
        </div>
      </AdminSideBar>
    </>
  )
}
