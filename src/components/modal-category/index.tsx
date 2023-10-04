import React, { useState } from 'react'
import { MainModal } from '../main-model'
import { Input } from '../../custom'
import { FaEdit } from 'react-icons/fa'
import { HiPlusCircle } from 'react-icons/hi'

interface IModalCategoryProps {
  open: boolean
  setOpen: (open: boolean) => void
  category: string
}

export function ModalCategory({
  open,
  setOpen,
  category,
}: IModalCategoryProps) {
  const [categoryName, setCategoryName] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event.target.value)
  }

  return (
    <>
      <MainModal open={open} setOpen={setOpen}>
        <div className="inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full bg-main rounded-2xl">
          <h2 className="text-3xl font-bold text-white">
            {category ? 'Editar' : 'Criar'} categoria
          </h2>
          <form action="" className="flex flex-col gap-6 text-left mt-6">
            <Input
              label="Nome da categoria"
              type="text"
              value={categoryName}
              placeholder="Nome da categoria"
              onChange={handleChange}
              bg={true}
            />
            <button
              type="submit"
              onClick={() => setOpen(!open)}
              className="w-full flex-rows gap-4 py-3 rounded hover:bg-transparent border-2 border-subMain transitions bg-subMain text-white hover:bg-dry text-lg"
            >
              {category ? (
                <>
                  <FaEdit />
                  Editar
                </>
              ) : (
                <>
                  <HiPlusCircle />
                  Criar
                </>
              )}
            </button>
          </form>
        </div>
      </MainModal>
    </>
  )
}
