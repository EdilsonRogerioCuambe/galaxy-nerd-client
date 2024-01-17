import { useState } from 'react'
import { MainModal } from '../main-model'
import { message } from 'antd'
import { Input } from '../../custom'
import { useCreateQuizMutation } from '../../slices/quizzesSlices/quizzesApiSlices'

interface IModalTopicsProps {
  open: boolean
  setOpen: (open: boolean) => void
  lessonId: string
}

interface QuizOption {
  option: string
  isCorrect: boolean
}

export function QuizModal({ open, setOpen, lessonId }: IModalTopicsProps) {
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [answer, setAnswer] = useState<string>('')
  const [points, setPoints] = useState<number>(0)
  const [quizOptions, setQuizOptions] = useState<QuizOption[]>([])
  const [newQuizOption, setNewQuizOption] = useState<string>('')
  const [createQuiz, { isSuccess }] = useCreateQuizMutation()

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value)
  }

  const handleAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value)
  }

  const handlePoints = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPoints(Number(e.target.value))
  }

  const handleQuizOptions = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuizOptions([
      ...quizOptions,
      {
        option: e.target.value,
        isCorrect: false,
      },
    ])
  }

  const handleAddOption = () => {
    if (newQuizOption.trim() !== '') {
      setQuizOptions([
        ...quizOptions,
        {
          option: newQuizOption,
          isCorrect: false,
        },
      ])
      setNewQuizOption('')
    }
  }

  const handleIsCorrect = (index: number) => {
    const newQuizOptions = quizOptions.map((option, i) => {
      if (i === index) {
        return {
          ...option,
          isCorrect: true,
        }
      }

      return option
    })

    setQuizOptions(newQuizOptions)
  }

  if (isSuccess) {
    message.success('Quiz adicionado com sucesso!')
    setOpen(false)
    setTimeout(() => {
      location.reload()
    }, 1000)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await createQuiz({
        title,
        description,
        lessonId,
        answer,
        points,
        quizOptions,
      }).unwrap()

      setTitle('')
      setDescription('')
      setAnswer('')
      setPoints(0)
      setQuizOptions([])
      message.success('Quiz adicionado com sucesso!')
    } catch (error) {
      console.log(error)
      message.error('Erro ao adicionar quiz')
    }
  }

  return (
    <MainModal open={open} setOpen={setOpen}>
      <div className="inline-block text-start sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 align-middle w-full p-10 overflow-y-auto bg-main rounded-2xl h-96">
        <h2 className="text-3xl font-bold text-[#c4c4cc] mb-6">
          Adicionar Quiz
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <Input
              label="Título"
              name="title"
              type="text"
              placeholder="Título"
              value={title}
              onChange={handleTitle}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[#c4c4cc]" htmlFor="description">
              Descrição
            </label>
            <textarea
              name="description"
              id="description"
              cols={30}
              rows={10}
              className="border border-border rounded-lg px-4 py-2 bg-main text-[#c4c4cc]"
              placeholder="Descrição"
              value={description}
              onChange={handleDescription}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Input
              label="comentario do professor"
              name="answer"
              type="text"
              placeholder="Resposta"
              value={answer}
              onChange={handleAnswer}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Input
              label="Pontos"
              name="points"
              type="number"
              placeholder="selecione quantos pontos o aluno vai ganhar ao acertar o quiz"
              value={points}
              onChange={handlePoints}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[#c4c4cc]" htmlFor="quizOptions">
              Opções
            </label>
            <input
              type="text"
              name="quizOptions"
              id="quizOptions"
              placeholder="Opções"
              className=" rounded-lg px-4 py-2 bg-main text-[#c4c4cc]"
              value={newQuizOption}
              onChange={(e) => setNewQuizOption(e.target.value)}
            />
          </div>
          <button
            type="button"
            onClick={handleAddOption}
            className="bg-main text-[#c4c4cc] px-4 py-2 rounded-lg"
          >
            Adicionar Opção
          </button>

          {quizOptions.map((option, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="radio"
                name="isCorrect"
                id={`isCorrect-${index}`}
                checked={option.isCorrect}
                onChange={() => handleIsCorrect(index)}
                className="border border-border rounded-lg px-4 py-2 bg-main text-[#c4c4cc]"
              />
              <label className="text-[#c4c4cc]" htmlFor={`isCorrect-${index}`}>
                {option.option}
              </label>
            </div>
          ))}

          <div className="flex flex-col gap-2">
            <button
              type="submit"
              title="Adicionar quiz"
              className="flex items-center gap-2 bg-main text-[#c4c4cc] px-4 py-2 rounded-lg"
            >
              Adicionar Quiz
            </button>
          </div>
        </form>
      </div>
    </MainModal>
  )
}
