import { Layout } from '../../../layout'
import { Input } from '../../../custom'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLoginMutation } from '../../../slices/instructor/apiSlice/instructorsApiSlice'
import { setCredentials } from '../../../slices/instructor/authSlice'
import { useFormik } from 'formik'
import { message } from 'antd'
import logo from '../../../assets/images/logo.png'
import { gapi } from 'gapi-script'

const GOOGLE_CLIENT_ID =
  '652659912678-el8asn8a25nrggdas194phv9710o9b43.apps.googleusercontent.com'
const GOOGLE_CLIENT_SECRET = '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'

interface FormValues {
  email: string
  password: string
}

export function InstructorLogin() {
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
            instructorToken: response.token,
            instructor: response.instructor,
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
      navigate('/instructor-dashboard')
    } else if (isLoading) {
      message.loading({
        content: 'Carregando...',
        key: 'login',
      })
    }
  }, [isSuccess, isLoading, navigate])

  const handleAuthClick = () => {
    gapi.load('auth2', () => {
      const auth2 = gapi.auth2.init({
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        scope:
          'profile email openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/classroom.courses https://www.googleapis.com/auth/classroom.coursework.students https://www.googleapis.com/auth/classroom.coursework.me https://www.googleapis.com/auth/classroom.rosters https://www.googleapis.com/auth/classroom.profile.emails https://www.googleapis.com/auth/classroom.profile.photos https://www.googleapis.com/auth/classroom.announcements https://www.googleapis.com/auth/classroom.courseworkmaterials https://www.googleapis.com/auth/classroom.coursework.students.readonly https://www.googleapis.com/auth/classroom.coursework.me.readonly https://www.googleapis.com/auth/classroom.rosters.readonly https://www.googleapis.com/auth/classroom.announcements.readonly https://www.googleapis.com/auth/classroom.courseworkmaterials.readonly https://www.googleapis.com/auth/classroom.topics',
      })

      auth2.signIn().then((googleUser: any) => {
        const profile = googleUser.getBasicProfile()
        const idToken = googleUser.getAuthResponse().id_token
        console.log('Google User', googleUser)

        //         Google User
        // Nw {Ca: '101355160591630775879', xc: {…}, wt: Pw}
        // Ca
        // :
        // "101355160591630775879"
        // wt
        // :
        // Pw {NT: '101355160591630775879', Ad: 'Edilson Rogerio Cuambe', rV: 'Edilson', uT: 'Rogerio Cuambe', hK: 'https://lh3.googleusercontent.com/a/ACg8ocIuWsFXi4Np9GZOWG2QdHCJehUMR6XQ2t_pNOsaho0lsuD7=s96-c', …}
        // xc
        // :
        // access_token
        // :
        // "ya29.a0AfB_byDdhefVlxCEI7JpaZDUh-JFr1JhsKC2P_N-bv4xGB9doQQOxL_LOBh4zY0B9--VS-5VrhAa1n-Yhs2tgOsnnicLEgroJ_6X9fFIv3o_s0kHNPVviHl3I2N3R-MMWS4xFRuA02gkZLtm8z3I-uugzU49gYmPLWxoTsBgk42jxkpghq-EXDVv_MoT3VTPEOUXET15ZgHwcNYTQ_Q5mQaCgYKAZcSARESFQHGX2MiFlMpWchn6e9kKqw-jHQjyw0221"
        // expires_at
        // :
        // 1701814647995
        // expires_in
        // :
        // 3598
        // first_issued_at
        // :
        // 1701811049995
        // id_token
        // :
        // "eyJhbGciOiJSUzI1NiIsImtpZCI6ImU0YWRmYjQzNmI5ZTE5N2UyZTExMDZhZjJjODQyMjg0ZTQ5ODZhZmYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNjUyNjU5OTEyNjc4LWVsOGFzbjhhMjVucmdnZGFzMTk0cGh2OTcxMG85YjQzLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNjUyNjU5OTEyNjc4LWVsOGFzbjhhMjVucmdnZGFzMTk0cGh2OTcxMG85YjQzLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTAxMzU1MTYwNTkxNjMwNzc1ODc5IiwiZW1haWwiOiJlZGR5cm9nZXJpb3l1cmFuQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiQ2MtVWVkZjljdjdqd3h3R3V4U18tQSIsIm5iZiI6MTcwMTgxMDc0OSwibmFtZSI6IkVkaWxzb24gUm9nZXJpbyBDdWFtYmUiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSXVXc0ZYaTROcDlHWk9XRzJRZEhDSmVoVU1SNlhRMnRfcE5Pc2FobzBsc3VENz1zOTYtYyIsImdpdmVuX25hbWUiOiJFZGlsc29uIiwiZmFtaWx5X25hbWUiOiJSb2dlcmlvIEN1YW1iZSIsImxvY2FsZSI6InB0LUJSIiwiaWF0IjoxNzAxODExMDQ5LCJleHAiOjE3MDE4MTQ2NDksImp0aSI6IjZjMTM3MjlhMjUzZDE4ZGVhZmFlN2I3MmM5OGRmMzc4MzIyZDBhZTEifQ.ay6TMFoloBO3id-rtY8lLvkJbH3LxQ5ASQUa7wUxTd9bmQqekRMCP_xa1KGuOVf7maBNQj67lFeZLCFH2nn6CuMJL4oEmU2L_PAj0gmUbZjsN6-bYPESO1BIJ0lvZjne2YXBXlxTo7pMsv19Y08HrdEL6Yii1ffuX9nhhbwMpapti_e1WR3aAqmraSe9sQVBnOBkDygwvk_PHCtcu2SqMUL6jNocDNABsLJpb2kRq0gGUk6_AR19mCzylViFN_f-SwYWrt1ug98sVLGQmPVndvpzHsN3cqnoiCh5wmR21CJzGIqPbGiKNi3_ynoZd9-VB10sJTDHzvbZVd5REZDKsw"
        // idpId
        // :
        // "google"
        // login_hint
        // :
        // "AJDLj6JUa8yxXrhHdWRHIV0S13cAFgp4mdHHgqeXjMKzQQ4gFDxUlm875kXWhjywFL5TvdnzIETdAlRwETA_yiXe84jfpt9vMA"
        // scope
        // :
        // "email profile https://www.googleapis.com/auth/classroom.announcements.readonly https://www.googleapis.com/auth/classroom.student-submissions.me.readonly https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/classroom.student-submissions.students.readonly https://www.googleapis.com/auth/classroom.courses https://www.googleapis.com/auth/classroom.topics https://www.googleapis.com/auth/classroom.coursework.me https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/classroom.coursework.students https://www.googleapis.com/auth/classroom.rosters https://www.googleapis.com/auth/classroom.courseworkmaterials https://www.googleapis.com/auth/classroom.courseworkmaterials.readonly https://www.googleapis.com/auth/classroom.rosters.readonly https://www.googleapis.com/auth/classroom.profile.emails openid https://www.googleapis.com/auth/classroom.profile.photos https://www.googleapis.com/auth/classroom.announcements"
        // session_state
        // :
        // {extraQueryParams: {…}}
        // token_type
        // :
        // "Bearer"

        const accessToken = googleUser.getAuthResponse().access_token

        const email = profile.getEmail()
        const name = profile.getName()
        const avatar = profile.getImageUrl()

        dispatch(
          setCredentials({
            instructorToken: idToken,
            googleToken: accessToken,
            instructor: {
              name,
              email,
              avatar,
            },
          }),
        )

        navigate('/instructor-dashboard')
      })
    })
  }

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-2 mt-8 flex-colo">
        <div className="w-full 2xl:w-2/5 gap-8 flex-colo p-8 md:3/5 bg-secondary rounded-lg">
          <span className="uppercase text-[#c4c4cc] text-4xl font-extrabold">
            <img src={logo} alt="Galaxy Nerd" className="w-20" />
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
          <button
            onClick={handleAuthClick}
            className="bg-[#4285f4] text-[#e1e1e6] w-full py-2 rounded-lg hover:bg-[#357ae8] transitions duration-300"
          >
            Entrar com o Google
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
