import { useParams } from 'react-router-dom'
import { useGetLessonBySlugQuery } from '../../slices/lessonsSlices/lessonsApiSlice'
import { useGetQuizzesByLessonIdQuery } from '../../slices/quizzesSlices/quizzesApiSlices'
import { Layout } from '../../layout'
import { useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

interface QuizOption {
  option: string
  isCorrect: boolean
}

interface QuizProps {
  title: string
  description: string
  lessonId: string
  answer: string
  points: number
  quizOptions: QuizOption[]
}

export function Quizzes() {
  const { slug } = useParams()
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0)
  const [isAnswered, setIsAnswered] = useState(false)
  const [selectedOption, setSelectedOption] = useState(-1)
  const { data: lesson } = useGetLessonBySlugQuery(slug)
  const { data: quizzes } = useGetQuizzesByLessonIdQuery(
    lesson?.lesson?.lesson?.id,
  )

  const quiz = quizzes?.quizzes[currentQuizIndex]

  const handleNextQuiz = () => {
    if (currentQuizIndex < quizzes?.quizzes.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1)
      setIsAnswered(false)
      setSelectedOption(-1)
    }
  }

  const handlePreviousQuiz = () => {
    if (currentQuizIndex > 0) {
      setCurrentQuizIndex(currentQuizIndex - 1)
      setIsAnswered(false)
      setSelectedOption(-1)
    }
  }

  const handleOptionClick = (optionIndex: number) => {
    setSelectedOption(optionIndex)
    setIsAnswered(true)
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-secondary rounded-md shadow-md h-full p-6 mt-10">
        <h1 className="text-2xl text-[#c4c4cc] font-bold mt-4 mb-2">
          {lesson?.lesson?.lesson?.title}
        </h1>
        <div className="text-[#e1e1e6] p-4 rounded-md">
          {quiz && (
            <div>
              <h2 className="text-xl font-semibold mb-4">{quiz.title}</h2>
              <p className="mb-4">{quiz.description}</p>
              {quiz.quizOptions.map((option: QuizOption, index: number) => (
                <div
                  key={index}
                  className={`p-2 mb-2 border ${
                    isAnswered && option.isCorrect
                      ? 'bg-green-200 border-green-300 text-black'
                      : selectedOption === index
                      ? 'bg-red-200 border-red-300 text-black'
                      : 'bg-main border-quaternary'
                  } rounded-md cursor-pointer`}
                  onClick={() => handleOptionClick(index)}
                >
                  {option.option}
                </div>
              ))}
              {isAnswered && (
                <div className="mt-4">
                  {quiz.quizOptions[selectedOption].isCorrect ? (
                    <p className="text-green-300">Resposta correta!</p>
                  ) : (
                    <p className="text-red-300">Resposta incorreta.</p>
                  )}
                  <p className="mt-2">Explicação: {quiz.answer}</p>
                </div>
              )}
              <div className="mt-4 flex justify-between">
                <button
                  type="button"
                  onClick={handlePreviousQuiz}
                  className={`bg-main p-2 rounded-md ${
                    currentQuizIndex === 0
                      ? 'cursor-not-allowed'
                      : 'cursor-pointer'
                  }`}
                  disabled={currentQuizIndex === 0}
                >
                  <FaChevronLeft className="inline-block" />
                  Quiz Anterior
                </button>
                <button
                  type="button"
                  onClick={handleNextQuiz}
                  className={`bg-main p-2 rounded-md ${
                    currentQuizIndex === quizzes.length - 1
                      ? 'cursor-not-allowed'
                      : 'cursor-pointer'
                  }`}
                  disabled={currentQuizIndex === quizzes.length - 1}
                >
                  Próximo Quiz
                  <FaChevronRight className="inline-block" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}
