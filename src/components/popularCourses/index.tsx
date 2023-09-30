import { BsCollectionFill } from 'react-icons/bs'
import { Header } from '../header'
import { Cursos } from '../../data/Cursos'
import { Course } from '../course'

export function PopularCourses() {
  return (
    <div className="my-16">
      <Header header="Cursos Populares" Icon={BsCollectionFill} />
      <div className="grid sm:mt-12 mt-6 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
        {Cursos.slice(0, 8).map((course, index) => (
          <Course key={index} course={course} />
        ))}
      </div>
    </div>
  )
}
