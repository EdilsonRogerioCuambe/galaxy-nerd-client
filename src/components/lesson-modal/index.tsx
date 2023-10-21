import { useState } from 'react'
import { MainModal } from '../main-model'
import { message } from 'antd'
import { Input } from '../../custom'
import { useCreateLessonMutation } from '../../slices/lessonsSlices/lessonsApiSlice'
import ReactPlayer from 'react-player'
import { FaPlus } from 'react-icons/fa'

interface IModalTopicsProps {
  open: boolean
  setOpen: (open: boolean) => void
  topicId: string
}

export function LessonModal({ open, setOpen, topicId }: IModalTopicsProps) {
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [order, setOrder] = useState<string>('')
  const [duration, setDuration] = useState<string>('')
  const [video, setVideo] = useState<string | null>(null)
  const [videoPreview, setVideoPreview] = useState<string | null>(null)
  const [createLesson, { isLoading, isSuccess }] = useCreateLessonMutation()

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value)
  }

  const handleOrder = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrder(e.target.value)
  }

  const handleDuration = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDuration(e.target.value)
  }

  const handleVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setVideoPreview(URL.createObjectURL(e.target.files[0]))
      const reader = new FileReader()
      reader.readAsDataURL(e.target.files[0])
      reader.onload = () => {
        setVideo(reader.result as string)
      }
    }
  }

  if (isSuccess) {
    message.success('Aula adicionada com sucesso!')
    setOpen(false)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await createLesson({
        topicId,
        title,
        description,
        order,
        duration,
        video,
      }).unwrap()
    } catch (error) {
      message.error('Erro ao adicionar aula')
    }
  }

  return (
    <MainModal open={open} setOpen={setOpen}>
      <div className="inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 align-middle w-full p-10 overflow-y-auto bg-main rounded-2xl h-96">
        <h2 className="text-3xl font-bold text-[#c4c4cc] mb-6">
          Adicionar topico
        </h2>

        <form
          className="flex flex-col gap-6 mt-6 text-left"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-6">
            <Input
              type="text"
              placeholder="Titulo"
              onChange={handleTitle}
              value={title}
              name="title"
              label="Titulo"
            />
            <textarea
              placeholder="Descrição"
              onChange={handleDescription}
              value={description}
              name="description"
              className="border border-none rounded-lg px-4 py-2 bg-secondary text-[#c4c4cc] h-36 resize-none"
            />
            <Input
              type="number"
              name="order"
              placeholder="Ordem"
              onChange={handleOrder}
              value={order}
              label="Ordem"
            />
            <Input
              type="text"
              placeholder="Duração"
              onChange={handleDuration}
              value={duration}
              name="duration"
              label="Duração"
            />
            <div className="flex flex-col gap-2">
              <label htmlFor="video" className="text-lg text-[#c4c4cc]">
                Video
              </label>
              <input
                accept="video/*"
                type="file"
                name="video"
                id="video"
                className="hidden"
                onChange={handleVideo}
              />
              <label
                htmlFor="video"
                className="flex h-36 w-36 items-center justify-center text-center bg-secondary text-[#c4c4cc] rounded-lg cursor-pointer hover:bg-transparent"
              >
                <FaPlus className="text-3xl" />
              </label>
              {videoPreview && (
                <ReactPlayer
                  url={videoPreview}
                  width="100%"
                  height="100%"
                  controls
                />
              )}
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-4 py-2 rounded-lg text-[#c4c4cc]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg text-[#e1e1e6] bg-quinary hover:bg-senary"
            >
              {isLoading ? 'Carregando...' : 'Adicionar'}
            </button>
          </div>
        </form>
      </div>
    </MainModal>
  )
}
