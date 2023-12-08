import { Layout } from '../../../layout'
import { Input } from '../../../custom'
import { Link, useNavigate } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation } from '../../../slices/admin/apiSlice/adminsApiSlice'
import { setCredentials } from '../../../slices/admin/authSlice'
import { RootState } from '../../../store'
import { useFormik } from 'formik'
import { message } from 'antd'
import { useGoogleLogin } from '@react-oauth/google'
import logo from '../../../assets/images/logo.png'
import axios from 'axios'
import googleLogo from '../../../assets/images/google.png'

interface FormValues {
  email: string
  password: string
}

export function AdminLogin() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [login, { isLoading, isSuccess }] = useLoginMutation()
  const { user } = useSelector((state: RootState) => state.adminAuth)

  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (codeResponse: any) => {
      try {
        const tokens = await axios.post(
          'http://localhost:3333/admin/auth/google',
          {
            code: codeResponse.code,
          },
        )

        console.log(tokens.data.token)

        dispatch(
          setCredentials({
            token: tokens.data.token,
            user: tokens.data.admin,
          }),
        )

        navigate('/')
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
    if (user?.ROLE === 'ADMIN') {
      navigate('/admin-dashboard')
    }
  }, [user, navigate])

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
            token: response.token,
            user: response.admin,
          }),
        )

        navigate('/admin-dashboard')
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

  if (isSuccess) {
    message.success({
      content: 'Login realizado com sucesso!',
      key: 'login',
      duration: 2,
    })
  } else if (isLoading) {
    message.loading({ content: 'Carregando...', key: 'login' })
  }

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-2 mt-8 flex-colo">
        <div className="w-full 2xl:w-2/5 gap-8 flex-colo p-8 md:3/5 bg-secondary rounded-lg">
          <span className="uppercase text-[#c4c4cc] text-4xl font-extrabold">
            <img src={logo} alt="Digital College" className="w-40" />
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
            className="bg-quinary text-[#e1e1e6] w-full py-2 rounded-lg hover:bg-pink-400 transitions duration-300"
          >
            Entrar
          </button>
          <div className="flex items-center justify-between">
            <button
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault()
                googleLogin()
              }}
              type="submit"
              className="bg-white text-[#29292e] w-full py-2 px-2 rounded-lg transitions duration-300 align-middle flex items-center justify-center hover:bg-[#e1e1e6]"
            >
              <img
                src={googleLogo}
                alt="Google"
                className="w-5 mr-2 inline-block"
              />
              Entrar com o Google
            </button>
          </div>
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
