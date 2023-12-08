import { useEffect, useRef, useState } from 'react'
import { InstructorSideBar } from '../../layout/sidebar/instructor'
import { Input } from '../../custom'
import { PlusOutlined } from '@ant-design/icons'
import { useGetCategoriesQuery } from '../../slices/categorySlices/categoryApiSlice'
import { useCreateCourseMutation } from '../../slices/courseSlices/courseApiSlice'
import wall from '../../assets/images/wall.jpg'
import EditorJS from '@editorjs/editorjs'
import Header from '@editorjs/header'
import List from '@editorjs/list'
import Embed from '@editorjs/embed'
import Image from '@editorjs/image'
import Table from '@editorjs/table'
import SimpleImage from '@editorjs/simple-image'
import Quote from '@editorjs/quote'
import Warning from '@editorjs/warning'
import Code from '@editorjs/code'
import LinkTool from '@editorjs/link'
import Raw from '@editorjs/raw'
import Marker from '@editorjs/marker'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import Paragraph from '@editorjs/paragraph'
import Select from 'react-select'
import { message } from 'antd'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import axios from 'axios'

interface ICategories {
  id: string
  icon: string
  name: string
}

const GOOGLE_CLIENT_ID =
  '652659912678-el8asn8a25nrggdas194phv9710o9b43.apps.googleusercontent.com'
const GOOGLE_CLIENT_SECRET = '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'

export function AddCourse() {
  const { instructor, instructorToken, googleToken } = useSelector(
    (state: RootState) => state.instructorAuth,
  )
  // const [imagePreview, setImagePreview] = useState<string | null>(null)
  // const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null)
  // const { data: categories } = useGetCategoriesQuery({})
  // const [createCourse, { isLoading, isSuccess }] = useCreateCourseMutation({})
  // const [title, setTitle] = useState<string>('')
  // const [shortDescription, setShortDescription] = useState<string>('')
  // const [languages, setLanguages] = useState<string[]>([])
  // const [price, setPrice] = useState<string>('')
  // const [image, setImage] = useState<string | null>(null)
  // const [thumbnail, setThumbnail] = useState<string | null>(null)
  // const [level, setLevel] = useState<'Básico' | 'Intermediário' | 'Avançado'>(
  //   'Básico',
  // )
  // const [duration, setDuration] = useState<string>('')
  // const editorRef = useRef<EditorJS | null>(null)

  const [description, setDescription] = useState<string>('')
  const [descriptionHeading, setDescriptionHeading] = useState<string>('')
  const [room, setRoom] = useState<string>('')
  const [ownerId, setOwnerId] = useState<string>(instructor?.id)
  const [courseState, setCourseState] = useState<string>('')
  const [name, setName] = useState<string>('')

  // name: z.string(),
  //   section: z.string(),
  //   descriptionHeading: z.string(),
  //   description: z.string(),
  //   room: z.string(),
  //   ownerId: z.string(),
  //   courseState: z.string(),

  // const initEditor = () => {
  //   const editor = new EditorJS({
  //     holder: 'editorjs',
  //     minHeight: 150,
  //     onReady: () => {
  //       editorRef.current = editor
  //     },
  //     tools: {
  //       header: {
  //         class: Header,
  //         config: {
  //           placeholder: 'Digite um título',
  //           levels: [1, 2, 3, 4, 5, 6],
  //           defaultLevel: 3,
  //         },
  //       },
  //       list: {
  //         class: List,
  //         inlineToolbar: true,
  //       },
  //       embed: {
  //         class: Embed,
  //         inlineToolbar: true,
  //         config: {
  //           services: {
  //             youtube: true,
  //             coub: true,
  //           },
  //         },
  //       },
  //       image: {
  //         class: Image,
  //         config: {
  //           endpoints: {
  //             byFile: 'http://localhost:3333/images',
  //             byUrl: 'http://localhost:3333/images',
  //           },
  //         },
  //       },
  //       table: {
  //         class: Table,
  //         inlineToolbar: true,
  //       },
  //       simpleImage: {
  //         class: SimpleImage,
  //         inlineToolbar: true,
  //       },
  //       quote: {
  //         class: Quote,
  //         inlineToolbar: true,
  //         config: {
  //           quotePlaceholder: 'Digite uma citação',
  //           captionPlaceholder: 'Autor da citação',
  //         },
  //       },
  //       warning: {
  //         class: Warning,
  //         inlineToolbar: true,
  //         shortcut: 'CMD+SHIFT+W',
  //         config: {
  //           titlePlaceholder: 'Digite um título',
  //           messagePlaceholder: 'Digite uma mensagem',
  //         },
  //       },
  //       code: {
  //         class: Code,
  //         inlineToolbar: true,
  //       },
  //       linkTool: {
  //         class: LinkTool,
  //         config: {
  //           endpoint: 'http://localhost:3333/images',
  //         },
  //       },
  //       raw: {
  //         class: Raw,
  //         inlineToolbar: true,
  //       },
  //       marker: {
  //         class: Marker,
  //         shortcut: 'CMD+SHIFT+M',
  //       },
  //       delimiter: {
  //         class: Delimiter,
  //         shortcut: 'CMD+SHIFT+M',
  //       },
  //       inlineCode: {
  //         class: InlineCode,
  //         shortcut: 'CMD+SHIFT+M',
  //       },
  //       paragraph: {
  //         class: Paragraph,
  //         inlineToolbar: true,
  //       },
  //     },
  //   })
  // }

  // useEffect(() => {
  //   if (editorRef.current === null) {
  //     initEditor()
  //   }

  //   return () => {
  //     editorRef?.current?.destroy()
  //     editorRef.current = null
  //   }
  // }, [])

  // const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setTitle(event.target.value)
  // }

  // const handleShortDescriptionChange = (
  //   event: React.ChangeEvent<HTMLTextAreaElement>,
  // ) => {
  //   setShortDescription(event.target.value)
  // }

  // const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setPrice(event.target.value)
  // }

  // const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setDuration(event.target.value)
  // }

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault()

  //   try {
  //     // await createCourse({
  //     //   instructorId: instructor?.id,
  //     //   title,
  //     //   shortDescription,
  //     //   description: JSON.stringify(await editorRef.current?.save()),
  //     //   price,
  //     //   duration,
  //     //   level,
  //     //   languages,
  //     //   image,
  //     //   thumbnail,
  //     // }).unwrap()
  //     // window.location.href = 'instructor-add-topics-to-course'
  //     // get google token from local storage
  //     // console.log(res)
  //   } catch (error) {
  //     console.error(error)
  //     if (typeof error === 'object' && error !== null && 'data' in error) {
  //       const errorData = error.data as { message?: string; error?: string }
  //       message.error(
  //         errorData.message || errorData.error || 'An error occurred',
  //       )
  //     }
  //   }
  // }

  // if (isLoading) {
  //   message.loading('Carregando...')
  // }

  // if (isSuccess) {
  //   message.success('Curso criado com sucesso!')
  // }

  // create course in classroom

  const handleCreateCourse = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()

    try {
      const res = await axios.post(
        'http://localhost:3333/classroom/create-course',
        {
          name,
          section: '2021.2',
          descriptionHeading,
          description,
          room,
          ownerId,
          courseState,
          googleToken,
        },
      )
      console.log(res)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <InstructorSideBar>
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold">
            {instructor?.name} adicionar curso
          </h2>
          <div className="w-full grid md:grid-cols-1 gap-6">
            <form className="flex flex-col gap-4" onSubmit={handleCreateCourse}>
              {/** <div className="flex flex-row gap-4 my-2">
                <input
                  type="file"
                  title="Imagem"
                  accept="image/*"
                  name="image"
                  id="image"
                  className="hidden"
                  onChange={(event) => {
                    if (event.target.files) {
                      setImagePreview(
                        URL.createObjectURL(event.target.files[0]),
                      )
                      const reader = new FileReader()
                      reader.readAsDataURL(event.target.files[0])
                      reader.onload = () => {
                        setImage(reader.result as string)
                      }
                    }
                  }}
                />
                <label
                  htmlFor="image"
                  className="flex flex-col items-center justify-center gap-2 w-32 h-32 bg-main rounded-lg cursor-pointer"
                >
                  <PlusOutlined />
                  <span>Imagem</span>
                </label>
                <img
                  className="w-32 h-32 bg-main rounded-lg object-cover"
                  src={imagePreview || wall}
                  alt="Imagem"
                />
              </div>
              <div className="flex flex-row gap-4 my-2">
                <input
                  type="file"
                  title="Thumbnail"
                  accept="image/*"
                  name="thumbnail"
                  id="thumbnail"
                  className="hidden"
                  onChange={(event) => {
                    if (event.target.files) {
                      setThumbnailPreview(
                        URL.createObjectURL(event.target.files[0]),
                      )
                      const reader = new FileReader()
                      reader.readAsDataURL(event.target.files[0])
                      reader.onload = () => {
                        setThumbnail(reader.result as string)
                      }
                    }
                  }}
                />
                <label
                  htmlFor="thumbnail"
                  className="flex flex-col items-center justify-center gap-2 w-32 h-32 bg-main rounded-lg cursor-pointer"
                >
                  <PlusOutlined />
                  <span>Thumbnail</span>
                </label>
                <img
                  className="w-32 h-32 bg-main rounded-lg object-cover"
                  src={thumbnailPreview || wall}
                  alt="Thumbnail"
                />
              </div>
              <Input
                type="text"
                placeholder="Título do curso"
                value={title}
                onChange={handleTitleChange}
                bg
                label="Título do curso"
                name="title"
              />
              <label htmlFor="shortDescription" className="text-[#c4c4cc]">
                Descrição curta
              </label>
              <textarea
                className="w-full mt-2 px-6 py-4 border bg-main border-none rounded text-text resize-none h-32"
                placeholder="Descrição curta"
                value={shortDescription}
                onChange={handleShortDescriptionChange}
                name="shortDescription"
                id="shortDescription"
              />
              <label htmlFor="description" className="text-[#c4c4cc]">
                Descrição
              </label>
              <div
                id="editorjs"
                className="text-[#c4c4cc] h-96 overflow-y-auto bg-main border border-border rounded p-4"
              />
              <Input
                type="text"
                placeholder="Preço"
                value={price}
                onChange={handlePriceChange}
                bg
                label="Preço"
                name="price"
              />
              <Input
                type="text"
                placeholder="Duração"
                value={duration}
                onChange={handleDurationChange}
                bg
                label="Duração"
                name="duration"
              />
              <label htmlFor="level" className="text-[#c4c4cc] my-2">
                Nível
              </label>
              <select
                className="w-full mt-2 px-6 py-4 border bg-main border-border rounded text-text"
                onChange={(event) => {
                  const value = event.target.value
                  if (
                    value === 'Básico' ||
                    value === 'Intermediário' ||
                    value === 'Avançado'
                  ) {
                    setLevel(value)
                  }
                }}
                name="level"
                id="level"
              >
                <option value="Básico">Básico</option>
                <option value="Intermediário">Intermediário</option>
                <option value="Avançado">Avançado</option>
              </select>
              <label htmlFor="languages" className="text-[#c4c4cc] py-2 mt-4">
                Línguagens do curso
              </label>
              <Select
                isMulti
                name="languages"
                placeholder="Selecione as línguagens"
                options={
                  categories?.categories?.map((category: ICategories) => ({
                    value: category.id,
                    label: category.name,
                  })) || []
                }
                styles={{
                  control: (base) => ({
                    ...base,
                    backgroundColor: 'transparent',
                    color: '#C4C4CC',
                    border: '1px solid #3C3C3C',
                    marginTop: '0.5rem',
                    borderRadius: '0.5rem',
                    minHeight: '3rem',
                  }),
                  menu: (base) => ({
                    ...base,
                    backgroundColor: '#1E1E1E',
                    color: '#C4C4CC',
                  }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isFocused ? '#3C3C3C' : '#1E1E1E',
                    color: '#C4C4CC',
                  }),
                  multiValue: (base) => ({
                    ...base,
                    backgroundColor: '#3C3C3C',
                    color: '#C4C4CC',
                  }),
                  multiValueLabel: (base) => ({
                    ...base,
                    backgroundColor: '#3C3C3C',
                    color: '#C4C4CC',
                  }),
                  multiValueRemove: (base) => ({
                    ...base,
                    backgroundColor: '#202024',
                    color: '#C4C4CC',
                    ':hover': {
                      backgroundColor: '#3C3C3C',
                      color: '#C4C4CC',
                    },
                  }),
                }}
                onChange={(selected) => {
                  if (selected) {
                    setLanguages(
                      (selected as { value: string }[]).map(
                        (item) => item.value,
                      ),
                    )
                  }
                }}
              /> */}
              <Input
                type="text"
                placeholder="Nome"
                value={name}
                onChange={(event) => setName(event.target.value)}
                bg
                label="Nome"
                name="name"
              />
              <Input
                type="text"
                placeholder="Título da descrição"
                value={descriptionHeading}
                onChange={(event) => setDescriptionHeading(event.target.value)}
                bg
                label="Título da descrição"
                name="descriptionHeading"
              />
              <Input
                type="text"
                placeholder="Descrição"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                bg
                label="Descrição"
                name="description"
              />
              <Input
                type="text"
                placeholder="Sala"
                value={room}
                onChange={(event) => setRoom(event.target.value)}
                bg
                label="Sala"
                name="room"
              />
              <Input
                type="text"
                placeholder="Id do dono"
                value={ownerId}
                onChange={(event) => setOwnerId(event.target.value)}
                bg
                label="Id do dono"
                name="ownerId"
              />
              <Input
                type="text"
                placeholder="Estado do curso"
                value={courseState}
                onChange={(event) => setCourseState(event.target.value)}
                bg
                label="Estado do curso"
                name="courseState"
              />
              <button
                type="submit"
                className="w-full mt-4 px-6 py-4 bg-main rounded text-text"
              >
                Adicionar curso
              </button>
            </form>
          </div>
        </div>
      </InstructorSideBar>
    </>
  )
}
