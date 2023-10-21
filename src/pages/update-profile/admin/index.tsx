/* eslint-disable n/no-callback-literal */
import { useUpdateAdminMutation } from '../../../slices/admin/apiSlice/adminsApiSlice'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../store'
import { Input } from '../../../custom'
import { AdminSideBar } from '../../../layout/sidebar/admin'
import { message } from 'antd'
import { setCredentials } from '../../../slices/admin/authSlice'
import { PlusOutlined } from '@ant-design/icons'
import { useState } from 'react'

export function AdminUpdateProfile() {
  const dispatch = useDispatch()
  const { user, token } = useSelector((state: RootState) => state.adminAuth)
  const [updateAdmin] = useUpdateAdminMutation()

  const [name, setName] = useState<string | null>(user?.name || null)
  const [email, setEmail] = useState<string | null>(user?.email || null)
  const [biography, setBiography] = useState<string | null>(
    user?.biography || null,
  )
  const [avatar, setAvatar] = useState<string | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    user?.avatar || null,
  )
  const [banner, setBanner] = useState<string | null>(null)
  const [bannerPreview, setBannerPreview] = useState<string | null>(
    user?.banner || null,
  )

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

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!name || !email || !biography) {
      message.error('Preencha todos os campos')
      return
    }

    try {
      const response = await updateAdmin({
        id: user?.id,
        body: {
          adminId: user?.id,
          name,
          email,
          biography,
          avatar: avatar || user?.avatar,
          banner: banner || user?.banner,
        },
      })
      if ('data' in response && response.data.admin) {
        dispatch(
          setCredentials({
            user: response.data.admin,
            token,
          }),
        )
        message.success('Perfil atualizado com sucesso')
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
    <AdminSideBar>
      <div className="flex- flex-col gap-6">
        <form onSubmit={onSubmit}>
          <h2 className="text-xl font-extrabold">Atualizar Perfil</h2>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2">
              <input
                title="Avatar"
                type="file"
                name="avatar"
                id="avatar"
                className="hidden"
                onChange={(event) => {
                  if (event.target.files) {
                    setAvatarPreview(URL.createObjectURL(event.target.files[0]))
                    const reader = new FileReader()
                    reader.readAsDataURL(event.target.files[0])
                    reader.onloadend = () => {
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
                src={avatarPreview || user?.avatar}
                alt="Avatar"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 my-2">
            <div className="flex flex-row gap-2">
              <input
                title="Banner"
                type="file"
                name="banner"
                id="banner"
                className="hidden"
                onChange={(event) => {
                  if (event.target.files) {
                    setBannerPreview(URL.createObjectURL(event.target.files[0]))
                    const reader = new FileReader()
                    reader.readAsDataURL(event.target.files[0])
                    reader.onloadend = () => {
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
                src={bannerPreview || user?.banner}
                alt="Banner"
              />
            </div>
          </div>
          <Input
            placeholder="Nome"
            type="text"
            name="name"
            label="Nome"
            value={name || ''}
            onChange={handleNameChange}
          />
          <Input
            placeholder="Email"
            type="email"
            name="email"
            label="Email"
            value={email || ''}
            onChange={handleEmailChange}
          />
          <textarea
            placeholder="Biografia"
            className="w-full h-48 mt-2 px-6 bg-main py-6 border rounded placeholder:text-[#c4c4cc] font-medium resize-none"
            name="biography"
            id="biography"
            value={biography || ''}
            onChange={handleBiographyChange}
          />
          <button
            title="Atualizar"
            type="submit"
            className="bg-purple-800 text-[#e1e1e6] rounded-lg px-4 py-2"
          >
            Atualizar
          </button>
        </form>
      </div>
    </AdminSideBar>
  )
}
