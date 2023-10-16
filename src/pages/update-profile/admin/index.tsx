import { useUpdateAdminMutation } from '../../../slices/admin/apiSlice/adminsApiSlice'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../store'
import { Input } from '../../../custom'
import { AdminSideBar } from '../../../layout/sidebar/admin'
import { message } from 'antd'
import { useFormik } from 'formik'
import { setCredentials } from '../../../slices/admin/authSlice'

export function AdminUpdateProfile() {
  const dispatch = useDispatch()
  const { user, token } = useSelector((state: RootState) => state.adminAuth)
  const [updateAdmin] = useUpdateAdminMutation()

  const formik = useFormik({
    initialValues: {
      id: user?.id || '',
      name: user?.name || '',
      email: user?.email || '',
      biography: user?.biography || '',
      interests: user?.interests || [],
    },
    onSubmit: async (values) => {
      try {
        const res = await updateAdmin({
          id: values.id,
          body: {
            id: values.id,
            name: values.name,
            email: values.email,
            biography: values.biography,
            interests: values.interests,
          },
        })

        console.log(res)

        if ('data' in res && res.data.admin) {
          dispatch(
            setCredentials({
              user: res.data.admin,
              token,
            }),
          )
        }

        message.success('Perfil atualizado com sucesso!')
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

  return (
    <AdminSideBar>
      <div className="flex- flex-col gap-6">
        <form onSubmit={formik.handleSubmit}>
          <h2 className="text-xl font-extrabold">Atualizar Perfil</h2>
          <Input
            placeholder="Nome"
            value={formik.values.name}
            type="text"
            name="name"
            label="Nome"
            onChange={formik.handleChange}
          />
          <Input
            placeholder="Email"
            value={formik.values.email}
            type="email"
            name="email"
            label="Email"
            onChange={formik.handleChange}
          />
          <textarea
            placeholder="Biografia"
            className="w-full h-48 mt-2 px-6 bg-main py-6 border rounded placeholder:text-[#c4c4cc] font-medium resize-none"
            value={formik.values.biography}
            onChange={formik.handleChange}
            name="biography"
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
