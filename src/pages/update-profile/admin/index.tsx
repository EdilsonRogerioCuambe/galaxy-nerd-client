import { useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { Input } from '../../../custom'
import { Uploader } from '../../../custom/uploader'
import { AdminSideBar } from '../../../layout/sidebar/admin'
import { useUpdateAdminMutation } from '../../../slices/admin/apiSlice/adminsApiSlice'
import { useGetCategoriesQuery } from '../../../slices/categorySlices/categoryApiSlice'
import { Select } from 'antd'
import { useFormik } from 'formik'

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

  const handleUpdateAdmin = () => {
    updateAdmin(user)
  }

  return (
    <AdminSideBar>
      <div className="flex- flex-col gap-6">
        <h2 className="text-xl font-extrabold">Atualizar Perfil</h2>
        <Uploader />
        {/** AVATAR */}
        <img
          src={user?.avatar}
          alt={user?.name}
          className="w-28 h-28 rounded-lg object-cover"
        />
        <Input
          placeholder="Nome"
          value={user?.name}
          type="text"
          name="name"
          label="Nome"
          defaultValue={user?.name}
          onChange={(e) => user && (user.name = e.target.value)}
        />
        <Input
          placeholder="Email"
          value={user?.email}
          type="email"
          name="email"
          label="Email"
          defaultValue={user?.email}
          onChange={(e) => user && (user.email = e.target.value)}
        />
        <textarea
          placeholder="Biografia"
          className="w-full h-48 mt-2 px-6 bg-main py-6 border rounded placeholder:text-[#c4c4cc] font-medium resize-none"
        >
          {user?.biography}
        </textarea>
        <Select
          mode="tags"
          style={{ width: '100%' }}
          placeholder="Interesses"
          defaultValue={user?.interests}
          onChange={(value) => user && (user.interests = value)}
          className="py-2"
        >
          {categories?.categories?.map((category: ICategories) => (
            <Option key={category.id} value={category.id}>
              {category.name}
            </Option>
          ))}
        </Select>
      </div>
    </AdminSideBar>
  )
}
