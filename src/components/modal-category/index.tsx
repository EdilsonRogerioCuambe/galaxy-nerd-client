import React, { useState } from 'react'
import { MainModal } from '../main-model'
import { Input } from '../../custom'
import { FaEdit } from 'react-icons/fa'
import { HiPlusCircle } from 'react-icons/hi'
import { message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useCreateCategoryMutation } from '../../slices/categorySlices/categoryApiSlice'

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
  const [categoryIcon, setCategoryIcon] = useState<File | null>(null)
  const [categoryIconPreview, setCategoryIconPreview] = useState('')
  const [categoryDescription, setCategoryDescription] = useState('')

  const [createCategory, { isSuccess, isLoading }] = useCreateCategoryMutation()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event.target.value)
  }

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setCategoryDescription(event.target.value)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData()

    formData.append('name', categoryName)
    formData.append('description', categoryDescription)
    if (categoryIcon) {
      formData.append('icon', categoryIcon)
    }

    try {
      await createCategory(formData).unwrap()
      setOpen(false)
    } catch (error) {
      console.error(error)
      if (typeof error === 'object' && error !== null && 'data' in error) {
        const errorData = error.data as { message?: string; error?: string }
        message.error(
          errorData.message || errorData.error || 'An error occurred',
        )
      }
    }
  }

  if (isSuccess) {
    message.success('Categoria criada com sucesso!')
  }

  if (isLoading) {
    message.loading('Criando categoria...')
  }

  return (
    <>
      <MainModal open={open} setOpen={setOpen}>
        <div className="inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full bg-main rounded-2xl">
          <h2 className="text-3xl font-bold text-[#c4c4cc] mb-6">
            {category ? 'Editar' : 'Criar'} categoria
          </h2>
          <form
            className="flex flex-col gap-6 text-left mt-6"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="categoryIcon" className="text-lg text-[#c4c4cc]">
                Icone da categoria
              </label>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="categoryIcon"
                  className="flex items-center justify-center bg-main rounded-lg h-32 w-32 cursor-pointer hover:bg-transparent"
                >
                  {categoryIconPreview ? (
                    <img
                      src={categoryIconPreview}
                      alt="Category icon"
                      className="h-32 w-32 object-cover rounded-lg"
                    />
                  ) : (
                    <PlusOutlined className="text-6xl text-[#e1e1e6]" />
                  )}
                </label>
                <input
                  type="file"
                  name="categoryIcon"
                  id="categoryIcon"
                  className="hidden"
                  onChange={(event) => {
                    if (event.target.files) {
                      setCategoryIcon(event.target.files[0])
                      setCategoryIconPreview(
                        URL.createObjectURL(event.target.files[0]),
                      )
                    }
                  }}
                />
              </div>
            </div>
            <Input
              label="Nome da categoria"
              type="text"
              value={categoryName}
              placeholder="Nome da categoria"
              onChange={handleChange}
              bg={true}
              name="name"
            />
            <textarea
              placeholder="Descrição da categoria"
              value={categoryDescription}
              onChange={handleDescriptionChange}
              className="bg-secondary rounded-lg p-2 text-[#c4c4cc] w-full h-40 resize-none border-none overflow-y-auto"
            />
            <button
              type="submit"
              disabled={isLoading}
              onClick={() => setOpen(!open)}
              className="w-full flex-rows gap-4 py-3 rounded hover:bg-transparent border-2 transitions bg-secondary text-[#e1e1e6] hover:bg-main text-lg"
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
