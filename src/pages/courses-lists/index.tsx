import { Table } from '../../components/table'
import { Cursos } from '../../data/Cursos'
import { SideBar } from '../../layout/sidebar'

export function CoursesLists() {
  return (
    <>
      <SideBar>
        <div className="flex flex-col text-[#c4c4cc] gap-6">
          <div className="flex-betweens gap-2">
            <h2 className="text-xl font-bold">Lista de Cursos</h2>
            <button className="bg-main font-medium transitions hover:bg-quinary py-3 px-6 rounded">
              Deletar Selecionados
            </button>
          </div>

          <Table data={Cursos} admin={false} />
        </div>
      </SideBar>
    </>
  )
}
