import { useState } from 'react'
import { Input, Select } from '../../custom'
import { CourseCategories } from '../../data/categories'
import { MainModal } from '../main-model'
import { FaEdit } from 'react-icons/fa'
import { HiPlusCircle } from 'react-icons/hi'

export function CourseModal({ open, setOpen, curso }: any) {
  const [cursoTitle, setCursoTitle] = useState(curso ? curso.title : '')
  const [cursoDescription, setCursoDescription] = useState(
    curso ? curso.description : '',
  )
  const [cursoPrice, setCursoPrice] = useState(curso ? curso.price : '')
  const [cursoSlug, setCursoSlug] = useState(curso ? curso.slug : '')
  const [selectedCategory, setSelectedCategory] = useState(
    curso && curso.category ? curso.category.id : '',
  )

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCursoTitle(event.target.value)
  }

  const handleChangeDescription = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCursoDescription(event.target.value)
  }

  const handleChangePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCursoPrice(event.target.value)
  }

  const handleChangeSlug = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCursoSlug(event.target.value)
  }

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedCategory(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Aqui você pode adicionar a lógica para criar ou atualizar o curso com os dados fornecidos.
    // Use os estados 'cursoTitle', 'cursoDescription', 'cursoPrice', 'cursoSlug' e 'selectedCategory'
    // para obter os valores dos campos.
    // Por exemplo:
    const novoCurso = {
      title: cursoTitle,
      description: cursoDescription,
      price: cursoPrice,
      slug: cursoSlug,
      categoryId: selectedCategory,
    }

    // Enviar 'novoCurso' para a API ou faça ações necessárias aqui

    // Feche o modal
    setOpen(false)
  }
  return (
    <>
      <MainModal open={open} setOpen={setOpen}>
        <div className="inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full bg-main rounded-2xl">
          <h2 className="text-3xl font-bold text-[#c4c4cc]">
            {curso ? 'Editar Curso' : 'Adicionar Curso'}
          </h2>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 text-left mt-6"
          >
            <Input
              label="Título do Curso"
              type="text"
              value={cursoTitle}
              onChange={handleChangeTitle}
              placeholder="Título do Curso"
              bg={true}
            />
            <Input
              label="Descrição do Curso"
              type="text"
              value={cursoDescription}
              onChange={handleChangeDescription}
              placeholder="Descrição do Curso"
              bg={true}
            />
            <Input
              label="Preço do Curso"
              type="text"
              value={cursoPrice}
              onChange={handleChangePrice}
              placeholder="Preço do Curso"
              bg={true}
            />
            <Input
              label="Slug do Curso"
              type="text"
              value={cursoSlug}
              onChange={handleChangeSlug}
              placeholder="Slug do Curso"
              bg={true}
            />
            <div className="text-sm w-full">
              <Select
                label="Categoria do Curso"
                value={selectedCategory}
                onChange={handleCategoryChange}
                options={CourseCategories}
                key={curso ? curso.category.id : ''}
              />
            </div>
            <button
              type="submit"
              className="w-full flex-rows gap-4 py-3 rounded hover:bg-transparent border-2 border-quinary transitions bg-quinary text-[#e1e1e6] hover:bg-senary text-lg"
            >
              {curso ? <FaEdit /> : <HiPlusCircle />}
            </button>
          </form>
        </div>
      </MainModal>
    </>
  )
}
