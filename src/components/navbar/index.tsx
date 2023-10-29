import { Link, NavLink, useNavigate } from 'react-router-dom'
import { BiLogOut, BiSearchAlt2 } from 'react-icons/bi'
import { AiFillHeart, AiFillFire } from 'react-icons/ai'
import { FaUserAlt } from 'react-icons/fa'
import logo from '../../assets/images/logo.png'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store'
import { logout } from '../../slices/admin/authSlice'
import { useGetStudentByIdQuery } from '../../slices/student/apiSlice/studentApiSlice'

interface QuizScore {
  score: number
}

export function NavigationBar() {
  const { instructor } = useSelector((state: RootState) => state.instructorAuth)
  const { student } = useSelector((state: RootState) => state.studentAuth)
  const { user: admin } = useSelector((state: RootState) => state.adminAuth)

  const { data: studentData } = useGetStudentByIdQuery(student?.id || '')

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const hover = 'hover:text-[#c4c4cc] transition duration-300 ease-in-out'

  const handleLogout = async () => {
    try {
      dispatch(logout())
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }

  const Hover = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? hover
      : 'text-[#e1e1e6] transition duration-300 ease-in-out cursor-pointer hover:text-[#c4c4cc]'

  return (
    <>
      <div className="bg-secondary shadow-md sticky top-0 z-20">
        <div className="container mx-auto py-6 px-2 lg:grid gap-10 grid-cols-7 justify-between items-center">
          <div className="col-span-1 hidden lg:flex justify-between items-center">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="logo" className="w-12 object-cover h-12" />
              <span className="text-[#e1e1e6] font-extrabold uppercase text-xl ml-2">
                G-NERD
              </span>
            </Link>
          </div>
          <div className="col-span-3">
            <form className="w-full text-sm bg-main rounded flex-betweens gap-4">
              <button
                title="Pesquisar"
                type="submit"
                className="bg-quinary text-white w-12 h-12 flex-colo rounded"
              >
                <BiSearchAlt2 className="w-6 h-6" />
              </button>
              <input
                type="text"
                placeholder="Pesquise por cursos, categorias ou instrutores..."
                className="font-medium placeholder:text-[#c4c4cc] text-sm w-11/12 h-12 bg-transparent focus:outline-none text-[#c4c4cc]"
              />
            </form>
          </div>
          <div className="col-span-3 uppercase text-md text-[#e1e1e6] font-extrabold hidden xl:gap-14 2xl:gap-20 justify-between lg:flex xl:justify-end items-center">
            <NavLink className={Hover} to="/courses">
              Cursos
            </NavLink>
            {studentData?.student?.scores?.length > 0 && (
              <div className="flex items-center gap-2 px-2 py-1 rounded bg-main">
                <span className="font-semibold text-base text-green-300">
                  XP:
                </span>
                <span className="text-green-300 flex">
                  {studentData.student.scores.reduce(
                    (total: number, score: QuizScore) => total + score.score,
                    0,
                  )}
                  <AiFillFire className="text-orange-300" size={24} />
                </span>
              </div>
            )}
            <NavLink className={`${Hover} relative`} to="/favorites">
              <AiFillHeart className="w-6 h-6 text-quinary" />
              <div className="absolute flex justify-center items-center bg-secondary text-white w-4 h-4 rounded-full -top-1 -right-1 text-xs">
                0
              </div>
            </NavLink>

            {student && (
              <>
                <div className="flex items-center gap-2">
                  <NavLink
                    className={`${Hover} relative`}
                    to="/student-dashboard"
                  >
                    <img
                      src={student.avatar}
                      alt="avatar"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  </NavLink>
                  <button
                    title="Sair"
                    type="button"
                    onClick={handleLogout}
                    className="text-[#c4c4cc] w-8 h-8 flex-colo rounded"
                  >
                    <BiLogOut className="w-6 h-6" />
                  </button>
                </div>
              </>
            )}

            {instructor && (
              <>
                <div className="flex items-center gap-2">
                  <NavLink
                    className={`${Hover} relative`}
                    to="/instructor-dashboard"
                  >
                    <img
                      src={instructor.avatar}
                      alt="avatar"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  </NavLink>
                  <button
                    title="Sair"
                    type="button"
                    onClick={handleLogout}
                    className="text-[#c4c4cc] w-8 h-8 flex-colo rounded"
                  >
                    <BiLogOut className="w-6 h-6" />
                  </button>
                </div>
              </>
            )}

            {admin && (
              <>
                <div className="flex items-center gap-2">
                  <NavLink
                    className={`${Hover} relative`}
                    to="/admin-dashboard"
                  >
                    <img
                      src={admin.avatar}
                      alt="avatar"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  </NavLink>
                  <button
                    title="Sair"
                    type="button"
                    onClick={handleLogout}
                    className="text-[#c4c4cc] w-8 h-8 flex-colo rounded"
                  >
                    <BiLogOut className="w-6 h-6" />
                  </button>
                </div>
              </>
            )}

            {!instructor && !admin && !student && (
              <>
                <NavLink className={Hover} to="/login">
                  <FaUserAlt className="w-6 h-6" />
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
