import { useSelector } from 'react-redux'
import { Layout } from '../../layout'
import { RootState } from '../../store'
import { useGetStudentByIdQuery } from '../../slices/student/apiSlice/studentApiSlice'
import { ImFacebook2 } from 'react-icons/im'
import { AiOutlineGithub, AiFillLinkedin, AiFillFire } from 'react-icons/ai'
import { FaTwitter, FaYoutube } from 'react-icons/fa'
import { RiInstagramFill } from 'react-icons/ri'
import { CgWebsite } from 'react-icons/cg'
import { Link } from 'react-router-dom'
import { useState } from 'react'

interface QuizScore {
  id: string
  score: number
  quiz: {
    id: string
    title: string
    description: string
    answer: string
    points: number
  }
}

export function StudentProfile() {
  const { student } = useSelector((state: RootState) => state.studentAuth)
  const { data: studentData } = useGetStudentByIdQuery(student?.id || '')

  console.log(studentData?.student?.scores)

  const [date, setDate] = useState(new Date())
  const daysInMonth = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0,
  ).getDate()
  const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  const lessonsProgress = studentData?.student?.lessonProgress
  const lessonDates = lessonsProgress?.map(
    (lesson: any) => new Date(lesson.createdAt),
  )

  return (
    <Layout>
      <div className="text-[#c4c4cc] max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 p-4">
            <div className="bg-secondary rounded-lg relative">
              <img
                src={studentData?.student?.banner}
                alt={studentData?.student?.name}
                className="w-full h-40 object-cover rounded-t-lg"
              />
              <img
                src={studentData?.student?.avatar}
                alt={studentData?.student?.name}
                className="w-24 h-24 object-cover rounded-lg border-4 border-purple-800 absolute left-1/2 transform -translate-x-1/2 -translate-y-2/3"
              />
              <div className="mt-10 text-center text-[#c4c4cc] prose prose-h2:text-[#c4c4cc] p-4">
                <h2 className="text-xl font-bold mb-2">
                  {studentData?.student?.name}
                </h2>
                <p className="mb-2 text-red-400 font-extrabold text-lg">
                  {studentData?.student?.profession}
                </p>
                <p className="mb-2">
                  <span className="font-extrabold">Email:</span>{' '}
                  {studentData?.student?.email}
                </p>
                <p className="mb-2">
                  <span className="font-extrabold">Data Nascimento:</span>{' '}
                  {new Date(studentData?.student?.birthDate).toLocaleDateString(
                    'pt-BR',
                    {
                      timeZone: 'UTC',
                    },
                  )}
                </p>
                <p className="mb-2">
                  <span className="font-extrabold">Endereço:</span>{' '}
                  {studentData?.student?.location}
                </p>
                <p className="mb-4">
                  <span className="font-extrabold">Telefone:</span>{' '}
                  {studentData?.student?.phone}
                </p>
              </div>
            </div>

            <div className="bg-secondary p-4 rounded-lg mt-4">
              <h2 className="text-lg font-bold mb-2">Interesses</h2>
              <div className="flex flex-wrap gap-2">
                {studentData?.student?.interests?.map(
                  ({ icon, name }: { icon: string; name: string }) => (
                    <img
                      key={name}
                      src={icon}
                      alt={name}
                      className="w-10 h-10"
                    />
                  ),
                )}
              </div>
            </div>

            {/* Habilidades do estudante */}
            <div className="mt-4 p-4 bg-secondary rounded-lg">
              <h2 className="text-lg font-bold">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {studentData?.student?.skills?.map((url: string) => (
                  <img src={url} alt="skills" key={url} className="w-10 h-10" />
                ))}
              </div>
            </div>

            {/* Hobbies */}
            <div className="p-4 bg-secondary rounded-lg mt-4">
              <h2 className="text-lg font-bold">Hobbies</h2>
              <div className="flex flex-wrap gap-2">
                {studentData?.student?.hobbies?.map((name: string) => (
                  <span
                    key={name}
                    className="bg-main text-[#e1e1e6] px-4 py-2 rounded-md"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Segunda coluna (maior) */}
          <div className="md:w-2/3 p-4">
            <div className="bg-secondary p-4 rounded-lg">
              <h2 className="text-2xl font-bold">Informações Pessoais</h2>
              <p className="prose text-[#c4c4cc] max-w-none">
                {studentData?.student?.biography}
              </p>
            </div>

            <h2 className="text-lg font-bold mt-4">Experiências</h2>
            <div className="flex flex-wrap gap-2">
              {studentData?.student?.works?.map((name: string) => (
                <span
                  key={name}
                  className="bg-secondary text-[#e1e1e6] px-4 py-2 rounded-md"
                >
                  {name}
                </span>
              ))}
            </div>

            <h2 className="text-lg font-bold mt-4">Social Media</h2>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center justify-center bg-secondary text-[#e1e1e6] px-6 py-3 rounded-lg shadow-md">
                {studentData?.student?.facebook && (
                  <Link
                    to={studentData?.student?.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#c4c4cc] hover:text-[#e1e1e6] transition duration-300"
                  >
                    <ImFacebook2 size={24} />
                  </Link>
                )}
              </div>
              <div className="flex items-center justify-center bg-secondary text-[#e1e1e6] px-6 py-3 rounded-lg shadow-md">
                {studentData?.student?.github && (
                  <Link
                    to={studentData?.student?.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#c4c4cc] hover:text-[#e1e1e6] transition duration-300"
                  >
                    <AiOutlineGithub size={24} />
                  </Link>
                )}
              </div>
              <div className="flex items-center justify-center bg-secondary text-[#e1e1e6] px-6 py-3 rounded-lg shadow-md">
                {studentData?.student?.linkedin && (
                  <Link
                    to={studentData?.student?.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#c4c4cc] hover:text-[#e1e1e6] transition duration-300"
                  >
                    <AiFillLinkedin size={24} />
                  </Link>
                )}
              </div>
              <div className="flex items-center justify-center bg-secondary text-[#e1e1e6] px-6 py-3 rounded-lg shadow-md">
                {studentData?.student?.twitter && (
                  <Link
                    to={studentData?.student?.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#c4c4cc] hover:text-[#e1e1e6] transition duration-300"
                  >
                    <FaTwitter size={24} />
                  </Link>
                )}
              </div>
              <div className="flex items-center justify-center bg-secondary text-[#e1e1e6] px-6 py-3 rounded-lg shadow-md">
                {studentData?.student?.youtube && (
                  <Link
                    to={studentData?.student?.youtube}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#c4c4cc] hover:text-[#e1e1e6] transition duration-300"
                  >
                    <FaYoutube size={24} />
                  </Link>
                )}
              </div>
              <div className="flex items-center justify-center bg-secondary text-[#e1e1e6] px-6 py-3 rounded-lg shadow-md">
                {studentData?.student?.instagram && (
                  <Link
                    to={studentData?.student?.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#c4c4cc] hover:text-[#e1e1e6] transition duration-300"
                  >
                    <RiInstagramFill size={24} />
                  </Link>
                )}
              </div>
              <div className="flex items-center justify-center bg-secondary text-[#e1e1e6] px-6 py-3 rounded-lg shadow-md">
                {studentData?.student?.website && (
                  <Link
                    to={studentData?.student?.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#c4c4cc] hover:text-[#e1e1e6] transition duration-300"
                  >
                    <CgWebsite size={24} />
                  </Link>
                )}
              </div>
            </div>

            <div className="mt-4">
              <div className="relative pt-1 bg-secondary rounded-lg p-2">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-md font-semibold inline-block text-[#c4c4cc]">
                      XP
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-green-300">
                      {studentData?.student?.scores?.reduce(
                        (total: number, score: QuizScore) =>
                          total + score.score,
                        0,
                      )}{' '}
                      / 10000
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-[#e1e1e6]">
                  <div
                    style={{
                      width: `${
                        (studentData?.student?.scores?.reduce(
                          (total: number, score: QuizScore) =>
                            total + score.score,
                          0,
                        ) /
                          10000) *
                        100
                      }%`,
                    }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-300"
                  ></div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="relative pt-1 bg-secondary rounded-lg p-2">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-md font-semibold inline-block text-[#c4c4cc]">
                      Aulas
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-green-300">
                      {lessonsProgress?.length} / 100
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-[#e1e1e6]">
                  <div
                    style={{
                      width: `${(lessonsProgress?.length / 100) * 100}%`,
                    }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-300"
                  ></div>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-7 gap-4 bg-secondary rounded-lg p-4">
              <div className="col-span-7 flex justify-between items-center mb-4">
                <button
                  className="bg-main text-[#e1e1e6] px-4 py-2 rounded-md"
                  type="button"
                  onClick={() =>
                    setDate(new Date(date.setMonth(date.getMonth() - 1)))
                  }
                >
                  Mês Anterior
                </button>
                <input
                  className="bg-secondary text-[#e1e1e6] px-4 py-2 rounded-md justify-center items-center"
                  title="Ano"
                  type="number"
                  value={date.getFullYear()}
                  onChange={(e) =>
                    setDate(new Date(date.setFullYear(Number(e.target.value))))
                  }
                />
                <button
                  className="bg-main text-[#e1e1e6] px-4 py-2 rounded-md"
                  type="button"
                  onClick={() =>
                    setDate(new Date(date.setMonth(date.getMonth() + 1)))
                  }
                >
                  Próximo Mês
                </button>
              </div>
              <div className="col-span-7 flex justify-center items-center mb-4">
                {/** NOME DO MES ATUAL */}
                <div className="text-2xl text-center font-extrabold">
                  {date.toLocaleString('pt-BR', { month: 'long' })}
                </div>
              </div>
              {daysOfWeek.map((day) => (
                <div key={day} className="p-4">
                  {day}
                </div>
              ))}
              {days.map((day) => {
                const isLessonDay = lessonDates?.some(
                  (lessonDate: any) =>
                    lessonDate.getFullYear() === date.getFullYear() &&
                    lessonDate.getMonth() === date.getMonth() &&
                    lessonDate.getDate() === day,
                )

                return (
                  <div
                    key={day}
                    className={`p-4 rounded transitions cursor-pointer justify-center items-center ${
                      isLessonDay
                        ? 'bg-secondary text-[#e1e1e6] hover:bg-red-300'
                        : 'hover:bg-main hover:text-[#e1e1e6]'
                    }`}
                  >
                    {isLessonDay && (
                      <AiFillFire className="text-orange-500 w-6 h-6" />
                    )}
                    {day}
                  </div>
                )
              })}
            </div>

            <div className="mt-4">
              <h2 className="text-lg font-bold">Ultimos Quizzes</h2>
              <div className="h-96 overflow-y-auto bg-secondary rounded-lg p-4">
                {studentData?.student?.scores?.map(
                  ({ id, score, quiz }: QuizScore) => (
                    <div
                      key={id}
                      className="bg-main text-[#e1e1e6] px-4 py-2 rounded-md my-1"
                    >
                      {quiz.title} - {score}
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
