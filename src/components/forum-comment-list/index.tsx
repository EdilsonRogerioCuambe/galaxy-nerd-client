import { useState } from 'react'
import {
  BiDownvote,
  BiSolidDownvote,
  BiSolidUpvote,
  BiUpvote,
} from 'react-icons/bi'
import { FaAngleDown, FaAngleUp, FaReply } from 'react-icons/fa'
import {
  useCreateAnswerMutation,
  useUpvoteAnswerMutation,
  useDownvoteAnswerMutation,
} from '../../slices/answersSlices/answersApiSlice'
import { message } from 'antd'

interface Answer {
  answer: string
  createdAt: string
  id: string
  parentId: string | null
  student?: {
    avatar: string
    name: string
  }
  instructor?: {
    avatar: string
    name: string
  }
  content: string
  upvotes: number
  downvotes: number
  studentId: string
  updatedAt: string
  children: Answer[]
  vote: [
    {
      studentId: string
      instructorId: string
      answerId: string
      voteType: 'UPVOTE' | 'DOWNVOTE'
    },
  ]
}

const CommentList = ({
  answer,
  studentId,
  instructorId,
  forumId,
}: {
  answer: Answer
  studentId: string
  forumId: string
  instructorId: string
}) => {
  const [showChildren, setShowChildren] = useState<boolean>(false)
  const [replying, setReplying] = useState<boolean>(false)
  const [replyContent, setReplyContent] = useState<string>('')
  const [upvoted, setUpvoted] = useState<boolean>(
    answer.vote.some(
      (vote) =>
        vote.voteType === 'UPVOTE' &&
        (vote.studentId === studentId || vote.instructorId === instructorId),
    ),
  )

  const [downvoted, setDownvoted] = useState(
    answer.vote.some(
      (vote) =>
        vote.voteType === 'DOWNVOTE' &&
        (vote.studentId === studentId || vote.instructorId === instructorId),
    ),
  )

  const [createAnswer] = useCreateAnswerMutation()
  const [upvoteAnswer] = useUpvoteAnswerMutation()
  const [downvoteAnswer] = useDownvoteAnswerMutation()

  console.log(answer)

  const handleReplyClick = () => {
    setReplying(!replying)
  }

  const handleReplyInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setReplyContent(e.target.value)
  }

  const handleReplySubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setReplyContent('')

    try {
      await createAnswer({
        content: replyContent,
        parentId: answer.id,
        studentId,
        instructorId,
        forumId,
      }).unwrap()

      message.success('Resposta enviada com sucesso')
    } catch (error) {
      message.error('Erro ao enviar resposta')
      console.error(error)
      if (typeof error === 'object' && error !== null && 'data' in error) {
        const errorData = error.data as { message?: string; error?: string }
        message.error(
          errorData.message || errorData.error || 'An error occurred',
        )
      }
    }
  }

  const handleUpvoteClick = async () => {
    setUpvoted(!upvoted)
    setDownvoted(false)

    try {
      await upvoteAnswer({
        id: answer.id,
        body: { studentId, instructorId, id: answer.id },
      }).unwrap()
    } catch (error) {
      console.error(error)
      if (typeof error === 'object' && error !== null && 'data' in error) {
        const errorData = error.data as { message?: string; error?: string }
        message.error(
          errorData.message || errorData.error || 'An error occurred',
        )
      }
    }
  }

  const handleDownvoteClick = async () => {
    setDownvoted(!downvoted)
    setUpvoted(false)

    try {
      await downvoteAnswer({
        id: answer.id,
        body: { studentId, instructorId, id: answer.id },
      }).unwrap()
    } catch (error) {
      console.error(error)
      if (typeof error === 'object' && error !== null && 'data' in error) {
        const errorData = error.data as { message?: string; error?: string }
        message.error(
          errorData.message || errorData.error || 'An error occurred',
        )
      }
    }
  }

  return (
    <div className="rounded-lg p-4 mt-4 bg-main border border-[#e1e1e6]">
      <div className="text-[#c4c4cc] mt-2">
        <div className="flex items-center">
          <img
            src={answer.student?.avatar || answer.instructor?.avatar}
            alt={answer.student?.name || answer.instructor?.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <h1 className="text-[#e1e1e6] text-md font-semibold ml-2">
            {answer.student?.name || answer.instructor?.name}
          </h1>

          <span className="text-[#c4c4cc] text-md ml-2">
            {new Date(answer.createdAt).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center mt-2">
          <p className="text-[#e1e1e6] text-lg">{answer.content}</p>
        </div>
      </div>
      <div className="flex items-center mt-4">
        {/** VOTE PART */}
        <div className="flex items-center">
          <button
            title="Upvote"
            type="button"
            onClick={handleUpvoteClick}
            className="text-[#c4c4cc] flex items-center"
          >
            {upvoted ? (
              <BiSolidUpvote size={20} />
            ) : (
              <BiUpvote size={20} className="hover:text-[#e1e1e6]" />
            )}
          </button>
          <span className="text-[#c4c4cc] text-md ml-2">
            {answer.vote.filter((vote) => vote.voteType === 'UPVOTE').length -
              answer.vote.filter((vote) => vote.voteType === 'DOWNVOTE').length}
          </span>
          <button
            title="Downvote"
            type="button"
            onClick={handleDownvoteClick}
            className="text-[#c4c4cc] flex items-center ml-2"
          >
            {downvoted ? (
              <BiSolidDownvote size={20} />
            ) : (
              <BiDownvote size={20} className="hover:text-[#e1e1e6]" />
            )}
          </button>
        </div>
      </div>
      {replying ? (
        <div className="flex mt-4 flex-col">
          <form onSubmit={handleReplySubmit}>
            <input type="hidden" value={answer.id} />
            <input type="hidden" value={studentId} />
            <input type="hidden" value={instructorId} />
            <input type="hidden" value={forumId} />
            <textarea
              placeholder="Digite sua resposta"
              className="bg-secondary rounded-lg p-4 w-full resize-none h-72"
              value={replyContent}
              onChange={handleReplyInputChange}
            ></textarea>
            <button
              type="submit"
              className="bg-quinary text-white mt-4 rounded-lg px-4 py-2 text-lg font-semibold w-48 transitions hover:bg-opacity-80 resize-none"
            >
              Enviar
            </button>
          </form>
        </div>
      ) : (
        <button
          title="Reply"
          type="button"
          onClick={handleReplyClick}
          className="mt-4 text-[#c4c4cc] flex items-center"
        >
          <FaReply size={20} />
        </button>
      )}
      {answer.children && answer.children.length > 0 && (
        <div className="mt-4 pl-4 border-l-2 border-[#e1e1e6]">
          <div
            onClick={() => setShowChildren(!showChildren)}
            className="cursor-pointer flex items-center"
          >
            {showChildren ? <FaAngleUp size={20} /> : <FaAngleDown size={20} />}
            <span className="text-[#c4c4cc] ml-2">
              {showChildren ? 'Esconder' : 'Mostrar'} respostas
            </span>
          </div>
          {showChildren && (
            <div>
              {answer.children.map((child) => (
                <CommentList
                  key={child.id}
                  answer={child}
                  studentId={studentId}
                  forumId={forumId}
                  instructorId={instructorId}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default CommentList
