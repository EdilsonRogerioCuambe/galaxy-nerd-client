import { Link } from 'react-router-dom'
import { FaHeart } from 'react-icons/fa'

export function Course({ course }: any) {
  return (
    <>
      <Link to={`/course/${course.slug}`} className="w-full">
        <div className="border border-border p-1 hover:scale-95 transitions relative rounded overflow-hidden">
          <Link to={`/course/${course.id}`} className="w-full">
            <img
              src={course.thumbnail || course.imagem}
              alt={course.alt}
              className="w-full h-64 object-cover"
            />
          </Link>
          <div className="absolute flex-betweens gap-2 bottom-0 right-0 left-0 bg-secondary bg-opacity-60 text-[#e1e1e6] px-4 py-3">
            <h3 className="font-semibold">{course.nome}</h3>
            <button
              type="button"
              title="Favoritar"
              className="h-9 w-9 text-sm flex-colo transitions hover:bg-transparent border-2 border-subMain rounded-md bg-main text-[#c4c4cc]"
            >
              <FaHeart className="w-5 h-5 m-auto mx-2" />
            </button>
          </div>
        </div>
      </Link>
    </>
  )
}
