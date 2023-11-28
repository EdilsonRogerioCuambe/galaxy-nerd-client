import { useState } from 'react'
import { Input } from '../../../custom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { message } from 'antd'
import { SideBar } from '../../../layout/sidebar'
import { useUpdateStudentMutation } from '../../../slices/student/apiSlice/studentApiSlice'
import { setCredentials } from '../../../slices/student/authSlice'

interface PasswordRequirements {
  uppercase: boolean
  lowercase: boolean
  number: boolean
  special: boolean
  length: boolean
}

export function StudantUpdatePassword() {
  const dispatch = useDispatch()
  const { student, studentToken } = useSelector(
    (state: RootState) => state.studentAuth,
  )
  const [updateStudant] = useUpdateStudentMutation()
  const [password, setPassword] = useState<string>('')
  const [requirements, setRequirements] = useState<PasswordRequirements>({
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
    length: false,
  })

  const handlePasswordRequirements = (password: string) => {
    const uppercaseRegex = /^(?=.*[A-Z])/
    const lowercaseRegex = /^(?=.*[a-z])/
    const numberRegex = /^(?=.*[0-9])/
    const specialRegex = /^(?=.*[!@#$%^&*])/
    const lengthRegex = /^(?=.{8,})/

    setRequirements({
      uppercase: uppercaseRegex.test(password),
      lowercase: lowercaseRegex.test(password),
      number: numberRegex.test(password),
      special: specialRegex.test(password),
      length: lengthRegex.test(password),
    })
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
    handlePasswordRequirements(event.target.value)
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!password) {
      message.error('Preencha todos os campos')
    }
    try {
      const formData = new FormData()

      formData.append('password', password)

      const response = await updateStudant({
        id: student?.id,
        body: formData,
      })

      if ('data' in response && response.data.student) {
        dispatch(
          setCredentials({
            student: response.data.student,
            studentToken,
          }),
        )
        message.success('Senha atualizada com sucesso')
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
  }

  return (
    <SideBar>
      <div className="flex- flex-col gap-6">
        <form onSubmit={onSubmit}>
          <h2 className="text-xl font-extrabold">Atualizar Senha</h2>
          <Input
            label="Senha atual"
            placeholder="Digite sua senha atual"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            bg
            name="password"
          />
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold">Requisitos:</span>
            <div className="flex flex-col gap-1">
              <span
                className={`text-sm ${
                  requirements.uppercase ? 'text-green-400' : 'text-red-400'
                }`}
              >
                Letra maiúscula
              </span>
              <span
                className={`text-sm ${
                  requirements.lowercase ? 'text-green-400' : 'text-red-400'
                }`}
              >
                Letra minúscula
              </span>
              <span
                className={`text-sm ${
                  requirements.number ? 'text-green-400' : 'text-red-400'
                }`}
              >
                Número
              </span>
              <span
                className={`text-sm ${
                  requirements.special ? 'text-green-400' : 'text-red-400'
                }`}
              >
                Caractere especial
              </span>
              <span
                className={`text-sm ${
                  requirements.length ? 'text-green-400' : 'text-red-400'
                }`}
              >
                Mínimo de 8 caracteres
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="bg-purple-800 text-[#e1e1e6] rounded-lg px-4 py-2 my-4"
          >
            Atualizar
          </button>
        </form>
      </div>
    </SideBar>
  )
}
