import { FiLogIn } from 'react-icons/fi'
import { Layout } from '../../../layout'
import { message } from 'antd'
import { useFormik } from 'formik'
import { Input } from '../../../custom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setCredentials } from '../../../slices/student/authSlice'
import { useLoginMutation } from '../../../slices/student/apiSlice/studentApiSlice'

interface FormValues {
  email: string
  password: string
}

export function StudentLogin() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [login, { isLoading, isSuccess }] = useLoginMutation()

  const formik = useFormik<FormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        const response = await login(values).unwrap()

        dispatch(
          setCredentials({
            studentToken: response.token,
            student: response.student,
          }),
        )

        if (!isLoading) {
          navigate('/')
        }
      } catch (err) {
        console.error(err)
        if (typeof err === 'object' && err !== null && 'data' in err) {
          const errorData = err.data as { message?: string; error?: string }
          message.error(
            errorData.message || errorData.error || 'An error occurred',
          )
        }
      }
    },
  })

  useEffect(() => {
    if (isSuccess) {
      message.success({
        content: 'Login realizado com sucesso!',
        className: 'mt-5',
      })
      navigate('/student-dashboard')
    } else if (isLoading) {
      message.loading({
        content: 'Carregando...',
        key: 'login',
      })
    }
  }, [isSuccess, isLoading, navigate])

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-2 mt-8 flex-colo">
        <div className="w-full 2xl:w-2/5 gap-8 flex-colo p-8 md:3/5 bg-secondary rounded-lg">
          <span className="uppercase text-[#c4c4cc] text-4xl font-extrabold">
            <FiLogIn className="inline-block mr-2" />
            GALAXY NERD
          </span>
          <Input
            name="email"
            label="Email"
            type="text"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <Input
            name="password"
            label="Senha"
            type="password"
            placeholder="Senha"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          <button
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault()
              formik.handleSubmit()
            }}
            disabled={isLoading}
            type="submit"
            className="bg-quinary text-[#e1e1e6] w-full py-2 rounded-lg hover:bg-senary transitions duration-300"
          >
            Entrar
          </button>
          <p className="text-[#c4c4cc]">
            Novo por aqui?{' '}
            <Link to="/register" className="text-quinary">
              Assine agora.
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  )
}
