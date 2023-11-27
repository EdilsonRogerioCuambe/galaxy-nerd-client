import React, { useEffect, useState } from 'react'
import { MainModal } from '../main-model'
import { Input } from '../../custom'
import { FaEdit } from 'react-icons/fa'
import { HiPlusCircle } from 'react-icons/hi'
import { message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useGetCategoryQuery,
} from '../../slices/categorySlices/categoryApiSlice'

interface IModalCategoryProps {
  open: boolean
  setOpen: (open: boolean) => void
  categoryId: string
}

export function ModalCategory({
  open,
  setOpen,
  categoryId,
}: IModalCategoryProps) {
  const [categoryName, setCategoryName] = useState('')
  const [categoryIcon, setCategoryIcon] = useState<string | null>(null)
  const [categoryIconPreview, setCategoryIconPreview] = useState('')
  const [categoryDescription, setCategoryDescription] = useState('')
  const [
    createCategory,
    { isSuccess: createSuccess, isLoading: createLoading },
  ] = useCreateCategoryMutation()
  const [
    updateCategory,
    { isSuccess: updateSuccess, isLoading: updateLoading },
  ] = useUpdateCategoryMutation()
  const { data: categoryData } = useGetCategoryQuery(categoryId)

  console.log(categoryData)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event.target.value)
  }

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setCategoryDescription(event.target.value)
  }

  useEffect(() => {
    if (categoryData) {
      setCategoryName(categoryData.name)
      setCategoryIcon(categoryData.icon)
      setCategoryIconPreview(categoryData.icon || '')
      setCategoryDescription(categoryData.description || '')
    }
  }, [categoryData, categoryId])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      await createCategory({
        name: categoryName,
        description: categoryDescription,
        icon: categoryIcon,
      }).unwrap()

      resetFormAndCloseModal()
    } catch (error) {
      handleSubmissionError(error)
    }
  }

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      await updateCategory(
        // id and body
        {
          id: categoryId,
          body: {
            categoryId,
            name: categoryName,
            icon: categoryIcon,
            description: categoryDescription,
          },
        },
      ).unwrap()

      resetFormAndCloseModal()
    } catch (error) {
      handleSubmissionError(error)
    }
  }

  const resetFormAndCloseModal = () => {
    setCategoryName('')
    setCategoryDescription('')
    setCategoryIcon(null)
    setOpen(false)
  }

  const handleSubmissionError = (error: any) => {
    console.error(error)
    if (typeof error === 'object' && error !== null && 'data' in error) {
      const errorData = error.data as { message?: string; error?: string }
      message.error(errorData.message || errorData.error || 'An error occurred')
    }
  }

  useEffect(() => {
    if (createSuccess || updateSuccess) {
      message.success('Categoria salva com sucesso!')
    }
  }, [createSuccess, updateSuccess])

  useEffect(() => {
    if (createLoading || updateLoading) {
      message.loading('Salvando categoria...')
    }
  }, [createLoading, updateLoading])

  return (
    <>
      <MainModal open={open} setOpen={setOpen}>
        <div className="inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full bg-main rounded-2xl">
          <h2 className="text-3xl font-bold text-[#c4c4cc] mb-6">
            {categoryId ? 'Editar' : 'Criar'} categoria
          </h2>
          <form
            className="flex flex-col gap-6 text-left mt-6"
            onSubmit={categoryId ? handleUpdate : handleSubmit}
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
                      setCategoryIconPreview(
                        URL.createObjectURL(event.target.files[0]),
                      )
                      const reader = new FileReader()
                      reader.readAsDataURL(event.target.files[0])
                      reader.onload = () => {
                        setCategoryIcon(reader.result as string)
                      }
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
              className="w-full flex-rows gap-4 py-3 rounded hover:bg-transparent border-2 transitions bg-secondary text-[#e1e1e6] hover:bg-main text-lg"
            >
              {categoryId ? (
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
