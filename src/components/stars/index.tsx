import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

export function Stars({ stars }: { stars: number }) {
  return (
    <>
      <span>
        {stars >= 1 ? (
          <FaStar className="text-yellow-500" />
        ) : stars >= 0.5 ? (
          <FaStarHalfAlt className="text-yellow-500" />
        ) : (
          <FaRegStar className="text-gray-400" />
        )}
      </span>
      <span>
        {stars >= 2 ? (
          <FaStar className="text-yellow-500" />
        ) : stars >= 1.5 ? (
          <FaStarHalfAlt className="text-yellow-500" />
        ) : (
          <FaRegStar className="text-gray-400" />
        )}
      </span>
      <span>
        {stars >= 3 ? (
          <FaStar className="text-yellow-500" />
        ) : stars >= 2.5 ? (
          <FaStarHalfAlt className="text-yellow-500" />
        ) : (
          <FaRegStar className="text-gray-400" />
        )}
      </span>
      <span>
        {stars >= 4 ? (
          <FaStar className="text-yellow-500" />
        ) : stars >= 3.5 ? (
          <FaStarHalfAlt className="text-yellow-500" />
        ) : (
          <FaRegStar className="text-gray-400" />
        )}
      </span>
      <span>
        {stars >= 5 ? (
          <FaStar className="text-yellow-500" />
        ) : stars >= 4.5 ? (
          <FaStarHalfAlt className="text-yellow-500" />
        ) : (
          <FaRegStar className="text-gray-400" />
        )}
      </span>
    </>
  )
}
