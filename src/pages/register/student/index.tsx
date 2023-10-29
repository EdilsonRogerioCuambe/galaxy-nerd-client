import { Layout } from '../../../layout'
import { Input } from '../../../custom'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useCreateStudentMutation } from '../../../slices/student/apiSlice/studentApiSlice'
import wall from '../../../assets/images/wall.jpg'
import { ImFacebook2 } from 'react-icons/im'
import { AiOutlineGithub, AiFillLinkedin } from 'react-icons/ai'
import { FaTwitter, FaYoutube } from 'react-icons/fa'
import { RiInstagramFill } from 'react-icons/ri'
import { CgWebsite } from 'react-icons/cg'
import { useGetCategoriesQuery } from '../../../slices/categorySlices/categoryApiSlice'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import Select from 'react-select'

interface PasswordRequirements {
  uppercase: boolean
  lowercase: boolean
  number: boolean
  special: boolean
  length: boolean
}

interface Category {
  id: string
  name: string
  icon: string
}

interface ICategories {
  id: string
  icon: string
  name: string
}

export function RegisterStudent() {
  const navigate = useNavigate()
  const { student } = useSelector((state: RootState) => state.studentAuth)
  const [createStudent, { isSuccess, isLoading }] = useCreateStudentMutation()
  const { data: categories } = useGetCategoriesQuery({})

  const [tabIndex, setTabIndex] = useState(0)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [biography, setBiography] = useState('')
  const [password, setPassword] = useState('')
  const [avatar, setAvatar] = useState<string | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [banner, setBanner] = useState<string | null>(null)
  const [bannerPreview, setBannerPreview] = useState<string | null>(null)
  const [interests, setInterests] = useState<string[]>([])
  const [skills, setSkills] = useState<string[]>([])
  const [location, setLocation] = useState('')
  const [works, setWorks] = useState<string[]>([])
  const [hobbies, setHobbies] = useState<string[]>([])
  const [birthDate, setBirthDate] = useState<Date>(new Date())
  const [profession, setProfession] = useState('')
  const [phone, setPhone] = useState('')
  const [requirements, setRequirements] = useState<PasswordRequirements>({
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
    length: false,
  })
  const [socialLinks, setSocialLinks] = useState({
    facebook: '',
    instagram: '',
    twitter: '',
    linkedin: '',
    youtube: '',
    github: '',
    website: '',
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

  const selectTab = (index: number) => {
    setTabIndex(index)
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

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value)
  }

  const handleProfessionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setProfession(event.target.value)
  }

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value)
  }

  const handleWorksChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWorks(event.target.value.split(','))
  }

  const handleHobbiesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHobbies(event.target.value.split(','))
  }

  const handleBirthDateChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const dateValue = event.target.value

    const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(dateValue)

    if (isValidDate) {
      setBirthDate(new Date(dateValue))
    } else {
      console.error('Invalid date format. Expected YYYY-MM-DD')
    }
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

    try {
      await createStudent({
        name,
        email,
        biography,
        password,
        avatar,
        banner,
        facebook: socialLinks.facebook,
        instagram: socialLinks.instagram,
        twitter: socialLinks.twitter,
        linkedin: socialLinks.linkedin,
        youtube: socialLinks.youtube,
        github: socialLinks.github,
        website: socialLinks.website,
        interests,
        skills,
        location,
        works,
        hobbies,
        birthDate,
        profession,
        phone,
      }).unwrap()
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
    if (isSuccess) {
      message.success('Cadastro realizado com sucesso!')
      navigate('/login')
    } else if (student) {
      navigate('/')
    }
  }, [isSuccess, navigate, student])

  if (isLoading) {
    message.loading('Registrando...')
  }

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <Tabs className="bg-secondary max-w-7xl mx-auto px-4 mt-8 rounded-lg p-4 text-[#c4c4cc]">
          <TabList
            style={{ borderBottom: '1px solid #e1e1e6' }}
            className="flex flex-row gap-4"
          >
            <Tab
              style={
                tabIndex === 0
                  ? {
                      backgroundColor: '#121214',
                      color: '#e1e1e6',
                    }
                  : {}
              }
              onClick={() => selectTab(0)}
            >
              Informações Pessoais
            </Tab>
            <Tab
              style={
                tabIndex === 1
                  ? { backgroundColor: '#121214', color: '#e1e1e6' }
                  : {}
              }
              onClick={() => selectTab(1)}
            >
              Imagens
            </Tab>
            <Tab
              style={
                tabIndex === 2
                  ? { backgroundColor: '#121214', color: '#e1e1e6' }
                  : {}
              }
              onClick={() => selectTab(2)}
            >
              Localização & Interesses
            </Tab>
            <Tab
              style={
                tabIndex === 3
                  ? { backgroundColor: '#121214', color: '#e1e1e6' }
                  : {}
              }
              onClick={() => selectTab(3)}
            >
              Habilidades & Trabalhos
            </Tab>
            <Tab
              style={
                tabIndex === 4
                  ? { backgroundColor: '#121214', color: '#e1e1e6' }
                  : {}
              }
              onClick={() => selectTab(4)}
            >
              Hobbies & Links Sociais
            </Tab>
          </TabList>
          <TabPanel>
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
              placeholder="Telefone"
              value={phone}
              onChange={handlePhoneChange}
              type="text"
              name="phone"
              label="Telefone"
              bg
            />

            <Input
              placeholder="Profissão"
              value={profession}
              onChange={handleProfessionChange}
              type="text"
              name="profession"
              label="Profissão"
              bg
            />

            <label htmlFor="birthDate" className="font-semibold text-text">
              Data de nascimento
            </label>
            <input
              type="date"
              name="birthDate"
              id="birthDate"
              className="w-full mt-2 px-6 py-4 border bg-main border-border rounded text-text"
              onChange={handleBirthDateChange}
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
          </TabPanel>
          <TabPanel>
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
                      setAvatarPreview(
                        URL.createObjectURL(event.target.files[0]),
                      )
                      const reader = new FileReader()
                      reader.readAsDataURL(event.target.files[0])
                      reader.onload = () => {
                        setAvatar(reader.result as string)
                      }
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
                      setBannerPreview(
                        URL.createObjectURL(event.target.files[0]),
                      )
                      const reader = new FileReader()
                      reader.readAsDataURL(event.target.files[0])
                      reader.onload = () => {
                        setBanner(reader.result as string)
                      }
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
          </TabPanel>
          <TabPanel>
            <Input
              placeholder="Localização"
              value={location}
              onChange={handleLocationChange}
              type="text"
              name="location"
              label="Localização"
              bg
            />
            <div className="flex flex-col gap-4 mt-4">
              <span className="text-sm font-semibold capitalize">
                selecione as categorias de interesse
              </span>
              <div className="flex flex-row flex-wrap gap-2">
                {categories?.categories?.map((category: Category) => (
                  <button
                    key={category.id}
                    type="button"
                    className={`${
                      interests.includes(category.id) ? 'bg-quinary' : 'bg-main'
                    } rounded-lg px-4 py-2 text-white`}
                    onClick={() => {
                      if (interests.includes(category.id)) {
                        setInterests(
                          interests.filter(
                            (interest) => interest !== category.id,
                          ),
                        )
                      } else {
                        setInterests([...interests, category.id])
                      }
                    }}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="flex flex-col gap-4 mt-4">
              <span className="text-sm font-semibold capitalize">
                selecione as suas habilidades
              </span>

              <Select
                isMulti
                name="skills"
                placeholder="Selecione as línguagens"
                options={
                  categories?.categories?.map((category: ICategories) => ({
                    value: category.icon,
                    label: (
                      <>
                        <img
                          className="w-8 h-8 object-cover inline-block"
                          src={category.icon}
                          alt={category.name}
                        />{' '}
                        | {category.name}
                      </>
                    ),
                  })) || []
                }
                styles={{
                  control: (base) => ({
                    ...base,
                    backgroundColor: 'transparent',
                    color: '#C4C4CC',
                    border: '1px solid #3C3C3C',
                    marginTop: '0.5rem',
                    borderRadius: '0.5rem',
                    minHeight: '3rem',
                  }),
                  menu: (base) => ({
                    ...base,
                    backgroundColor: '#1E1E1E',
                    color: '#C4C4CC',
                  }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isFocused ? '#3C3C3C' : '#1E1E1E',
                    color: '#C4C4CC',
                  }),
                  multiValue: (base) => ({
                    ...base,
                    backgroundColor: '#3C3C3C',
                    color: '#C4C4CC',
                  }),
                  multiValueLabel: (base) => ({
                    ...base,
                    backgroundColor: '#3C3C3C',
                    color: '#C4C4CC',
                  }),
                  multiValueRemove: (base) => ({
                    ...base,
                    backgroundColor: '#202024',
                    color: '#C4C4CC',
                    ':hover': {
                      backgroundColor: '#3C3C3C',
                      color: '#C4C4CC',
                    },
                  }),
                }}
                onChange={(selected) => {
                  if (selected) {
                    setSkills(
                      (selected as { value: string }[]).map(
                        (item) => item.value,
                      ),
                    )
                  }
                }}
              />
            </div>
            <Input
              placeholder="Trabalhos"
              value={works.join(',')}
              onChange={handleWorksChange}
              type="text"
              name="works"
              label="Trabalhos"
              bg
            />
          </TabPanel>
          <TabPanel>
            <Input
              placeholder="Hobbies"
              value={hobbies.join(',')}
              onChange={handleHobbiesChange}
              type="text"
              name="hobbies"
              label="Hobbies"
              bg
            />
            <div className="flex flex-col gap-4 mt-4">
              {Object.entries(socialLinks).map(([name, url]) => (
                <div key={name} className="flex flex-col gap-2">
                  <label htmlFor={name} className="text-sm capitalize">
                    {name}
                  </label>
                  <div className="flex flex-row items-center gap-2">
                    {name === 'facebook' && (
                      <ImFacebook2 className="w-6 h-6 text-blue-500" />
                    )}
                    {name === 'instagram' && (
                      <RiInstagramFill className="w-6 h-6 text-pink-500" />
                    )}
                    {name === 'twitter' && (
                      <FaTwitter className="w-6 h-6 text-blue-500" />
                    )}
                    {name === 'linkedin' && (
                      <AiFillLinkedin className="w-6 h-6 text-blue-500" />
                    )}
                    {name === 'youtube' && (
                      <FaYoutube className="w-6 h-6 text-red-500" />
                    )}
                    {name === 'github' && (
                      <AiOutlineGithub className="w-6 h-6 text-gray-500" />
                    )}
                    {name === 'website' && (
                      <CgWebsite className="w-6 h-6 text-gray-500" />
                    )}
                    <input
                      type="text"
                      name={name}
                      id={name}
                      className="bg-main rounded-lg p-2 text-[#c4c4cc] w-full flex flex-col gap-2"
                      value={url}
                      onChange={(event) => {
                        setSocialLinks({
                          ...socialLinks,
                          [name]: event.target.value,
                        })
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="bg-purple-800 text-[#e1e1e6] rounded-lg px-4 py-2 my-4"
            >
              {isLoading ? 'Registrando...' : 'Registrar'}
            </button>
          </TabPanel>
        </Tabs>
      </form>
    </Layout>
  )
}
