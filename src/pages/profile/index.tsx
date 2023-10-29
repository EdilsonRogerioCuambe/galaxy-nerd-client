import { useSelector } from 'react-redux'
import { Layout } from '../../layout'
import { RootState } from '../../store'
import { useGetStudentByIdQuery } from '../../slices/student/apiSlice/studentApiSlice'

export function StudentProfile() {
  const { student } = useSelector((state: RootState) => state.studentAuth)
  const { data: studentData } = useGetStudentByIdQuery(student?.id || '')

  console.log(studentData)

  return (
    <Layout>
      <div className="text-[#c4c4cc] max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 p-4">
            <div className="bg-secondary p-6 rounded-lg relative">
              <img
                src={studentData?.student?.banner}
                alt={studentData?.student?.name}
                className="w-full h-40 object-cover rounded-lg"
              />
              <img
                src={studentData?.student?.avatar}
                alt={studentData?.student?.name}
                className="w-24 h-24 object-cover rounded-lg border-4 border-purple-800 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              />
              <div className="mt-14 text-center text-[#c4c4cc] prose prose-h2:text-[#c4c4cc]">
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
                  <span className="font-extrabold">Endereço:</span>{' '}
                  {studentData?.student?.location}
                </p>
                <p className="mb-4">
                  <span className="font-extrabold">Telefone:</span>{' '}
                  {studentData?.student?.phone}
                </p>
              </div>
              <h4 className="text-lg font-bold mb-2">Interesses</h4>
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
            <div className="mt-4 bg-secondary p-4 rounded-lg">
              <h2 className="text-lg font-bold">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {studentData?.student?.skills?.map((url: string) => (
                  <img src={url} alt="skills" key={url} className="w-10 h-10" />
                ))}
              </div>
            </div>

            {/* Hobbies */}
            <div className="mt-4">
              <h2 className="text-lg font-bold">Hobbies</h2>
              <p>Hobby 1</p>
              <p>Hobby 2</p>
              {/* Adicione mais hobbies conforme necessário */}
            </div>
          </div>

          {/* Segunda coluna (maior) */}
          <div className="md:w-2/3 p-4">
            <div className="bg-secondary p-4 rounded-lg">
              <h2 className="text-lg font-bold">Informações Pessoais</h2>
              <p>{studentData?.student?.biography}</p>
              <p>Education Thomas Jeff High School, Stanford University</p>
              <p>Work History Twitch, Google, Apple</p>
              <p>Join Date 12-09-2021</p>
              <p>Languages English, German, Italian, Spanish</p>
              <p>Organization Themesberg LLC</p>
              <p>Role Graphic Designer</p>
              <p>Department Marketing</p>
              <p>Birthday 15-08-1990</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
