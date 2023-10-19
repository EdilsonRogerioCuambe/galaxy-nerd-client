interface User {
  id: string
  name: string
  email: string
  avatar: string
  role: string
}

interface Category {
  id: string
  name: string
  icon?: string
  description: string
  createdAt: string
}

type Data = (User | Category)[]

interface Props {
  data: Data
  index: number
  users: boolean
  handleEdit: (id: string) => void
}

export function Lines({ data, index, users, handleEdit }: Props) {
  const Body = 'text-sm text-left text-[#c4c4cc] font-normal px-6 py-2'

  const renderItem = (item: User | Category) => {
    if (users) {
      const user = item as User
      return (
        <>
          <td className={`${Body}`}>{user?.id}</td>
          <td className={`${Body}`}>
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-8 h-8 rounded-full object-cover"
            />
          </td>
          <td className={`${Body}`}>{user?.name}</td>
          <td className={`${Body}`}>{user?.email}</td>
          <td className={`${Body}`}>{user?.role}</td>
        </>
      )
    } else {
      const category = item as Category
      return (
        <>
          <td className={`${Body}`}>{category?.id}</td>
          <td className={`${Body}`}>
            <img
              src={category?.icon}
              alt={category?.name}
              className="w-8 h-8 object-cover"
            />
          </td>
          <td className={`${Body}`}>{category?.name}</td>
          <td className={`${Body}`}>{category?.description}</td>
          <td className={`${Body}`}>
            {new Date(category?.createdAt).toLocaleDateString('pt-BR')}
          </td>
        </>
      )
    }
  }

  return (
    <tr className={`${index % 2 === 0 ? 'bg-main' : 'bg-secondary'}`}>
      {renderItem(data[index])}
      <td className={`${Body} text-end`}>
        <button
          title="Editar"
          type="button"
          onClick={() => handleEdit(data[index].id)} // Assuming 'id' always exists
          className="text-[#c4c4cc] rounded py-1 px-1 hover:text-green-500]"
        >
          Editar
        </button>
      </td>
    </tr>
  )
}

export function UsersOrCategoriesTable({ data, users, handleEdit }: Props) {
  const Head =
    'text-xs text-left text-[#c4c4cc] font-semibold px-6 py-2 uppercase'

  return (
    <>
      <div className="overflow-x-scroll relative w-full">
        <table className="w-max table-auto">
          <thead>
            <tr className="bg-secondary">
              {users ? (
                <>
                  <th scope="col" className={`${Head}`}>
                    ID
                  </th>
                  <th scope="col" className={`${Head}`}>
                    Avatar
                  </th>
                  <th scope="col" className={`${Head}`}>
                    Nome Completo
                  </th>
                  <th scope="col" className={`${Head}`}>
                    Email
                  </th>
                  <th scope="col" className={`${Head}`}>
                    Role
                  </th>
                </>
              ) : (
                <>
                  <th scope="col" className={`${Head}`}>
                    ID
                  </th>
                  <th scope="col" className={`${Head}`}>
                    Icone
                  </th>
                  <th scope="col" className={`${Head}`}>
                    Nome
                  </th>
                  <th scope="col" className={`${Head}`}>
                    Descrição
                  </th>
                  <th scope="col" className={`${Head}`}>
                    Criado em
                  </th>
                </>
              )}

              <th scope="col" className={`${Head} text-end`}>
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-main divide-gray-800">
            {data?.map((item, index) => (
              <Lines
                key={index}
                data={data}
                index={index}
                users={users}
                handleEdit={handleEdit}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
