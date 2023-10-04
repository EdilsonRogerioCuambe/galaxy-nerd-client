import { ModalCategory } from '../../components/modal-category'
import { SideBar } from '../../layout/sidebar'
import { useEffect, useState } from 'react'
import { HiPlusCircle } from 'react-icons/hi'
import { UsersOrCategoriesTable } from '../../components/table-2'
import { CourseCategories } from '../../data/categories'

export function Categories() {
  const [open, setOpen] = useState(false)
  const [category, setCategory] = useState('')

  const handleEdit = (id: string) => {
    setOpen(!open)
    setCategory(id)
  }

  useEffect(() => {
    if (open === false) {
      setCategory('')
    }
  }, [open])

  return (
    <>
      <SideBar>
        <ModalCategory open={open} setOpen={setOpen} category={category} />
        <div className="flex flex-col gap-6">
          <div className="flex-betweens gap-2">
            <h2 className="text-xl font-bold">Categorias</h2>
            <button
              title="Adicionar categoria"
              type="button"
              onClick={() => setOpen(true)}
              className="flex gap-2 items-center bg-main text-white px-4 py-2 rounded border-dotted border-2 border-main hover:bg-white hover:text-main"
            >
              <HiPlusCircle className="text-xl" />
            </button>
          </div>

          <UsersOrCategoriesTable
            data={CourseCategories}
            index={0}
            users={false}
            handleEdit={handleEdit}
          />
        </div>
      </SideBar>
    </>
  )
}
