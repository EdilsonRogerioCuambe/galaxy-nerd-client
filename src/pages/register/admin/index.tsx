import { Layout } from '../../../layout'
import { Input } from '../../../custom'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useCreateAdminMutation } from '../../../slices/admin/apiSlice/adminsApiSlice'
import wall from '../../../assets/images/wall.jpg'

interface PasswordRequirements {
  uppercase: boolean
  lowercase: boolean
  number: boolean
  special: boolean
  length: boolean
}

export function RegisterAdmin() {
  const navigate = useNavigate()
  const { user } = useSelector((state: RootState) => state.adminAuth)
  const [createAdmin, { isSuccess, isLoading }] = useCreateAdminMutation()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [biography, setBiography] = useState('')
  const [password, setPassword] = useState('')
  const [avatar, setAvatar] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [banner, setBanner] = useState<File | null>(null)
  const [bannerPreview, setBannerPreview] = useState<string | null>(null)
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

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handleBiographyChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setBiography(event.target.value)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
    handlePasswordRequirements(event.target.value)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!name || !email || !biography || !password || !avatar || !banner) {
      message.error('Preencha todos os campos!')
      return
    }

    if (
      !requirements.uppercase ||
      !requirements.lowercase ||
      !requirements.number ||
      !requirements.special ||
      !requirements.length
    ) {
      message.error('A senha não atende aos requisitos!')
      return
    }

    const formData = new FormData()

    try {
      formData.append('avatar', avatar)
      formData.append('banner', banner)
      formData.append('name', name)
      formData.append('email', email)
      formData.append('biography', biography)
      formData.append('password', password)

      if (formData) {
        await createAdmin(formData).unwrap()
      }
    } catch (error) {
      console.log(error)
      if (typeof error === 'object' && error !== null && 'data' in error) {
        const errorData = error.data as { message?: string; error?: string }
        message.error(
          errorData.message || errorData.error || 'An error occurred',
        )
      }
    }
  }

  useEffect(() => {
    if (user) {
      navigate('/instructor-dashboard')
    }
  }, [user, navigate])

  if (isLoading) {
    message.loading('Registrando...')
  } else if (isSuccess) {
    message.success('Registrado com sucesso!')
  }

  return (
    <Layout>
      <div className="max-w-5xl bg-secondary mx-auto px-4 mt-8 rounded-lg p-4 text-[#c4c4cc]">
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl font-extrabold">Registro como Instrutor</h2>
          <p className="text-sm text-center">
            Já tem uma conta?{' '}
            <Link to="/instructor-login" className="text-quinary">
              Entrar
            </Link>
          </p>
          <div>
            <div className="flex flex-row gap-4 my-2">
              <input
                type="file"
                title="Avatar"
                accept="image/*"
                name="avatar"
                id="avatar"
                className="hidden"
                onChange={(event) => {
                  if (event.target.files) {
                    setAvatar(event.target.files[0])
                    setAvatarPreview(URL.createObjectURL(event.target.files[0]))
                  }
                }}
              />
              <label
                htmlFor="avatar"
                className="flex flex-col items-center justify-center gap-2 w-32 h-32 bg-main rounded-lg cursor-pointer"
              >
                <PlusOutlined />
                <span>Avatar</span>
              </label>
              <img
                className="w-32 h-32 bg-main rounded-lg object-cover"
                src={avatarPreview || wall}
                alt="Avatar"
              />
            </div>
            <div className="flex flex-row gap-4 my-2">
              <input
                type="file"
                title="Banner"
                accept="image/*"
                name="banner"
                id="banner"
                className="hidden"
                onChange={(event) => {
                  if (event.target.files) {
                    setBanner(event.target.files[0])
                    setBannerPreview(URL.createObjectURL(event.target.files[0]))
                  }
                }}
              />
              <label
                htmlFor="banner"
                className="flex flex-col items-center justify-center gap-2 w-32 h-32 bg-main rounded-lg cursor-pointer"
              >
                <PlusOutlined />
                <span>Banner</span>
              </label>
              <img
                className="w-32 h-32 bg-main rounded-lg object-cover"
                src={bannerPreview || wall}
                alt="Banner"
              />
            </div>
          </div>
          <Input
            placeholder="Nome"
            value={name}
            onChange={handleNameChange}
            type="text"
            name="name"
            label="Nome"
            bg
          />
          <Input
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            type="email"
            name="email"
            label="Email"
            bg
          />
          <textarea
            placeholder="Biografia"
            value={biography}
            onChange={handleBiographyChange}
            className="bg-main rounded-lg p-2 text-[#c4c4cc] w-full h-60 resize-none"
          />
          <Input
            placeholder="Senha"
            value={password}
            onChange={handlePasswordChange}
            type="password"
            name="password"
            label="Senha"
            bg
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
            disabled={isLoading}
            type="submit"
            className="bg-purple-800 text-[#e1e1e6] rounded-lg px-4 py-2 my-4"
          >
            {isLoading ? 'Registrando...' : 'Registrar'}
          </button>
        </form>
      </div>
    </Layout>
  )
}
