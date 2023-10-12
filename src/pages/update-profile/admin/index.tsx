import { useUpdateAdminMutation } from '../../../slices/admin/apiSlice/adminsApiSlice'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { Input } from '../../../custom'
import { Uploader } from '../../../custom/uploader'
import { AdminSideBar } from '../../../layout/sidebar/admin'
import { Select, message } from 'antd'
import { useFormik } from 'formik'
import { useGetCategoriesQuery } from '../../../slices/categorySlices/categoryApiSlice'

const { Option } = Select

interface ICategories {
  id: string
  icon: string
  name: string
}

export function AdminUpdateProfile() {
  const { user } = useSelector((state: RootState) => state.adminAuth)
  const [updateAdmin, { isLoading, isSuccess }] = useUpdateAdminMutation()
  const { data: categories } = useGetCategoriesQuery({})

  const formik = useFormik({
    initialValues: {
      name: user?.name || '',
      email: user?.email || '',
      biography: user?.biography || '',
      interests: user?.interests || [],
      avatar: user?.avatar || '',
    },
    onSubmit: async (values) => {
      try {
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
          <Uploader />
          <img
            src={formik.values.avatar}
            alt={formik.values.name}
            className="w-28 h-28 rounded-lg object-cover"
          />
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
          />
          <Select
            mode="tags"
            style={{ width: '100%' }}
            placeholder="Interesses"
            defaultValue={formik.values.interests}
            onChange={(value) => formik.setFieldValue('interests', value)}
            className="py-2"
          >
            {categories?.categories?.map((category: ICategories) => (
              <Option key={category.id} value={category.id}>
                {category.name}
              </Option>
            ))}
          </Select>
          <button title="Atualizar" type="submit" className="btn btn-primary">
            Atualizar
          </button>
        </form>
      </div>
    </AdminSideBar>
  )
}
