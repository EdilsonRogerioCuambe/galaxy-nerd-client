import { message } from 'antd'
import { MainModal } from '../main-model'
import { Input } from '../../custom'
import { useState } from 'react'
import { useCreateTopicMutation } from '../../slices/topicSlices/topicApiSlice'
import { PlusOutlined } from '@ant-design/icons'

interface IModalTopicsProps {
  open: boolean
  setOpen: (open: boolean) => void
  courseId: string
}

export function TopicsModal({ open, setOpen, courseId }: IModalTopicsProps) {
  const [topicName, setTopicName] = useState('')
  const [topicDescription, setTopicDescription] = useState('')
  const [topicOrder, setTopicOrder] = useState('')
  const [topicIcon, setTopicIcon] = useState<string | null>(null)
  const [topicIconPreview, setTopicIconPreview] = useState('')
  const [createTopic, { isSuccess, isLoading }] = useCreateTopicMutation()

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTopicName(event.target.value)
  }

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setTopicDescription(event.target.value)
  }

  const handleOrderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTopicOrder(event.target.value)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      await createTopic({
        courseId,
        title: topicName,
        description: topicDescription,
        order: topicOrder,
        icon: topicIcon,
      }).unwrap()
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
    message.success('Tópico criado com sucesso!')
  }

  if (isLoading) {
    message.loading('Criando tópico...')
  }

  return (
    <MainModal open={open} setOpen={setOpen}>
      <div className="inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full bg-main rounded-2xl">
        <h2 className="text-3xl font-bold text-[#c4c4cc] mb-6">
          Adicionar topico
        </h2>
        <form
          className="flex flex-col gap-6 mt-6 text-left"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="topicIcon" className="text-lg text-[#c4c4cc]">
              Icone do topico
            </label>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="topicIcon"
                className="rounded-lg h-32 w-32 cursor-pointer hover:bg-transparent bg-secondary"
              >
                {topicIconPreview ? (
                  <img
                    src={topicIconPreview}
                    alt="Topic icon"
                    className="h-32 w-32 object-cover rounded-lg"
                  />
                ) : (
                  <div className="flex items-center justify-center h-32 w-32">
                    <PlusOutlined className="text-6xl text-[#e1e1e6]" />
                  </div>
                )}
              </label>
              <input
                type="file"
                id="topicIcon"
                className="hidden"
                onChange={(event) => {
                  if (event.target.files) {
                    setTopicIconPreview(
                      URL.createObjectURL(event.target.files[0]),
                    )
                    const reader = new FileReader()
                    reader.readAsDataURL(event.target.files[0])
                    reader.onloadend = () => {
                      setTopicIcon(reader.result as string)
                    }
                  }
                }}
              />
            </div>
            <Input
              placeholder="Nome do topico"
              value={topicName}
              onChange={handleTitleChange}
              bg
              label="Nome do topico"
              type="text"
              name="topicName"
            />
            <textarea
              className="h-32 rounded-lg p-4 bg-secondary text-[#c4c4cc] resize-none"
              placeholder="Descrição do topico"
              value={topicDescription}
              onChange={handleDescriptionChange}
            />
            <Input
              placeholder="Ordem do topico"
              value={topicOrder}
              onChange={handleOrderChange}
              label="Ordem do topico"
              type="number"
              bg
            />
            <button
              type="submit"
              className="bg-quinary text-[#e1e1e4] rounded-lg py-2"
            >
              Criar
            </button>
          </div>
        </form>
      </div>
    </MainModal>
  )
}
