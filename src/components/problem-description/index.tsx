import { DBProblem, Problem } from '../playground'
import { useEffect, useState } from 'react'
import {
  AiFillLike,
  AiFillDislike,
  AiOutlineLoading3Quarters,
  AiFillStar,
} from 'react-icons/ai'
import { BsCheck2Circle } from 'react-icons/bs'
import { TiStarOutline } from 'react-icons/ti'
import RectangleSkeleton from '../skeletons/RectangleSkeleton'
import CircleSkeleton from '../skeletons/CircleSkeleton'

type ProblemDescriptionProps = {
  problem: Problem
  _solved: boolean
}

export default function ProblemDescription({
  problem,
  _solved,
}: ProblemDescriptionProps) {
  const { currentProblem, loading, problemDifficultyClass, setCurrentProblem } =
    useGetCurrentProblem(problem?.id)
  const { liked, disliked, solved, setData, starred } =
    useGetUsersDataOnProblem(problem?.id)
  const [updating, setUpdating] = useState(false)

  const returnUserDataAndProblemData = async (transaction: any) => {
    //
  }

  const handleLike = async () => {
    //
  }

  const handleDislike = async () => {
    //
  }

  const handleStar = async () => {
    //
  }

  return (
    <div className="bg-dark-layer-1">
      {/* TAB */}
      <div className="flex h-11 w-full items-center pt-2 bg-dark-layer-2 text-white overflow-x-hidden">
        <div
          className={
            'bg-dark-layer-1 rounded-t-[5px] px-5 py-[10px] text-md font-semibold cursor-pointer'
          }
        >
          Descrição
        </div>
      </div>

      <div className="flex px-0 py-4 h-[calc(100vh-94px)] overflow-y-auto">
        <div className="px-5">
          {/* Problem heading */}
          <div className="w-full">
            <div className="flex space-x-4">
              <div className="flex-1 mr-2 text-lg text-white font-medium">
                {problem?.title}
              </div>
            </div>
            {!loading && currentProblem && (
              <div className="flex items-center mt-3">
                <div
                  className={`${problemDifficultyClass} inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize `}
                >
                  {currentProblem?.difficulty}
                </div>
                {(solved || _solved) && (
                  <div className="rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-green-s text-dark-green-s">
                    <BsCheck2Circle />
                  </div>
                )}
                <div
                  className="flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-dark-gray-6"
                  onClick={handleLike}
                >
                  {liked && !updating && (
                    <AiFillLike className="text-dark-blue-s" />
                  )}
                  {!liked && !updating && <AiFillLike />}
                  {updating && (
                    <AiOutlineLoading3Quarters className="animate-spin" />
                  )}

                  <span className="text-xs">{currentProblem?.likes}</span>
                </div>
                <div
                  className="flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-green-s text-dark-gray-6"
                  onClick={handleDislike}
                >
                  {disliked && !updating && (
                    <AiFillDislike className="text-dark-blue-s" />
                  )}
                  {!disliked && !updating && <AiFillDislike />}
                  {updating && (
                    <AiOutlineLoading3Quarters className="animate-spin" />
                  )}

                  <span className="text-xs">{currentProblem?.dislikes}</span>
                </div>
                <div
                  className="cursor-pointer hover:bg-dark-fill-3  rounded p-[3px]  ml-4 text-xl transition-colors duration-200 text-green-s text-dark-gray-6 "
                  onClick={handleStar}
                >
                  {starred && !updating && (
                    <AiFillStar className="text-dark-yellow" />
                  )}
                  {!starred && !updating && <TiStarOutline />}
                  {updating && (
                    <AiOutlineLoading3Quarters className="animate-spin" />
                  )}
                </div>
              </div>
            )}

            {loading && (
              <div className="mt-3 flex space-x-2">
                <RectangleSkeleton />
                <CircleSkeleton />
                <RectangleSkeleton />
                <RectangleSkeleton />
                <CircleSkeleton />
              </div>
            )}

            {/* Problem Statement(paragraphs) */}
            <div className="text-white text-sm">
              <div
                dangerouslySetInnerHTML={{ __html: problem?.problemStatement }}
              />
            </div>

            <div className="mt-4">
              {problem?.examples?.map((example, index) => (
                <div key={example?.id}>
                  <p className="font-medium text-white ">
                    Example {index + 1}:{' '}
                  </p>
                  {example?.img && (
                    <img src={example?.img} alt="" className="mt-3" />
                  )}
                  <div className="example-card">
                    <pre>
                      <strong className="text-white">Input: </strong>{' '}
                      {example?.inputText}
                      <br />
                      <strong>Output:</strong>
                      {example?.outputText} <br />
                      {example?.explanation && (
                        <>
                          <strong>Explanation:</strong> {example?.explanation}
                        </>
                      )}
                    </pre>
                  </div>
                </div>
              ))}
            </div>

            <div className="my-8 pb-4">
              <div className="text-white text-sm font-medium">Constraints:</div>
              <ul className="text-white ml-5 list-disc ">
                <div
                  dangerouslySetInnerHTML={{ __html: problem?.constraints }}
                />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function useGetCurrentProblem(problemId: string) {
  const [currentProblem, setCurrentProblem] = useState<DBProblem | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [problemDifficultyClass, setProblemDifficultyClass] =
    useState<string>('')

  useEffect(() => {
    // Get problem from DB
  }, [problemId])

  return { currentProblem, loading, problemDifficultyClass, setCurrentProblem }
}

function useGetUsersDataOnProblem(problemId: string) {
  const [data, setData] = useState({
    liked: false,
    disliked: false,
    starred: false,
    solved: false,
  })

  useEffect(() => {
    // Get user data from DB
  }, [])

  return { ...data, setData }
}
