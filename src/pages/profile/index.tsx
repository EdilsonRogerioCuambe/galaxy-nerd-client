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
            <div className="bg-secondary p-4 rounded-lg">
              <img
                src={studentData?.student?.avatar}
                alt={studentData?.student?.name}
                className="w-32 h-32 rounded-lg mx-auto object-cover"
              />
              <h2 className="text-xl font-bold mt-4">
                {studentData?.student?.name}
              </h2>
              <p>{studentData?.student?.description}</p>
              <p>{studentData?.student?.location}</p>
              <p className="text-sm">
                Email:
                {studentData?.student?.email}
              </p>
              <p>
                Home address: 92 Miles Drive, Newark, NJ 07103, California,
                United States of America
              </p>
              <p>Phone number: +00 123 456 789 / +12 345 678</p>
              <h4 className="text-md font-bold">Interesses</h4>
              <div className="flex">
                {studentData?.student?.interests?.map(
                  ({ icon, name }: { icon: string; name: string }) => (
                    <img
                      key={name}
                      src={icon}
                      alt={name}
                      className="w-8 h-8 mr-2"
                    />
                  ),
                )}
              </div>
            </div>

            {/* Habilidades do estudante */}
            <div className="mt-4">
              <h2 className="text-lg font-bold">Skills</h2>
              <ul>
                <li>Front-end Development</li>
                <li>UI/UX Design</li>
                {/* Adicione mais habilidades conforme necessário */}
              </ul>
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
