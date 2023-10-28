import { useParams } from 'react-router-dom'
import { useGetLessonBySlugQuery } from '../../slices/lessonsSlices/lessonsApiSlice'
import { useGetQuizzesByLessonIdQuery } from '../../slices/quizzesSlices/quizzesApiSlices'
import { Layout } from '../../layout'
import { useEffect, useState, useCallback } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import QuizAnimation from '../../components/quiz-animation'
import { motion } from 'framer-motion'
import { useAddStudentScoreMutation } from '../../slices/student/apiSlice/studentApiSlice'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'

interface QuizOption {
  option: string
  isCorrect: boolean
}

export function Quizzes() {
  const { slug } = useParams()
  const { student } = useSelector((state: RootState) => state.studentAuth)
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0)
  const [isAnswered, setIsAnswered] = useState(false)
  const [selectedOption, setSelectedOption] = useState(-1)
  const { data: lesson } = useGetLessonBySlugQuery(slug)
  const { data: quizzes } = useGetQuizzesByLessonIdQuery(
    lesson?.lesson?.lesson?.id,
  )
  const [addStudentScore] = useAddStudentScoreMutation()

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

  const handleAddStudentScore = useCallback(async () => {
    try {
      await addStudentScore({
        studentId: student?.id,
        body: {
          studentId: student?.id,
          quizId: quiz?.id,
          score: quiz?.points,
        },
      }).unwrap()
    } catch (error) {
      console.log(error)
    }
  }, [addStudentScore, quiz, student?.id])

  useEffect(() => {
    if (isAnswered && quiz?.quizOptions[selectedOption].isCorrect) {
      handleAddStudentScore()
    }
  }, [isAnswered, selectedOption, quiz, handleAddStudentScore])

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-secondary rounded-md shadow-md h-full p-6 mt-10">
        <h1 className="text-2xl text-[#c4c4cc] font-bold mt-4 mb-2">
          {lesson?.lesson?.lesson?.title}
        </h1>
        <div className="text-[#e1e1e6] p-4 rounded-md">
          {quiz && (
            <div key={quiz.id}>
              <motion.h2
                className="text-xl font-semibold mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {quiz.title}
              </motion.h2>

              <p className="mb-4">{quiz.description}</p>
              {quiz.quizOptions.map((option: QuizOption, index: number) => (
                <>
                  <motion.div
                    className={`p-2 mb-2 border ${
                      isAnswered && option.isCorrect
                        ? 'bg-green-200 border-green-300 text-black'
                        : selectedOption === index
                        ? 'bg-red-200 border-red-300 text-black'
                        : 'bg-main border-quaternary'
                    } rounded-md cursor-pointer`}
                    onClick={() => handleOptionClick(index)}
                    initial={{
                      opacity: 0,
                      transform: 'translateX(-50px)',
                    }}
                    animate={{
                      opacity: 1,
                      transform: 'translateX(0px)',
                    }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                    }}
                  >
                    {option.option}
                  </motion.div>
                </>
              ))}
              {isAnswered && (
                <div className="mt-4">
                  {quiz.quizOptions[selectedOption].isCorrect ? (
                    <>
                      <div className="flex items-center justify-start">
                        <QuizAnimation
                          show={
                            isAnswered &&
                            quiz.quizOptions[selectedOption].isCorrect
                          }
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <motion.div
                        className="text-red-300"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        Resposta incorreta! 😢
                      </motion.div>
                    </>
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
