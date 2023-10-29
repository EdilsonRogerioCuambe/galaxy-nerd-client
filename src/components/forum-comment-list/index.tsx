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
import MDEditor from '@uiw/react-md-editor'
import Markdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'

const CodeBlock = ({
  language,
  value,
}: {
  language: string
  value: string
}) => {
  return (
    <SyntaxHighlighter language={language} style={dracula}>
      {value}
    </SyntaxHighlighter>
  )
}

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
  const [replyContent, setReplyContent] = useState<string | undefined>('')
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

  const handleReplyClick = () => {
    setReplying(!replying)
  }

  const handleReplyInputChange = (value: string | undefined) => {
    if (value) {
      setReplyContent(value)
    }
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
    <div className="rounded-lg p-4 mt-4 border border-[#e1e1e6] bg-main">
      <div className="flex flex-col rounded p-4">
        <div className="flex items-center mb-2">
          <img
            src={answer.student?.avatar || answer.instructor?.avatar}
            alt={answer.student?.name || answer.instructor?.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="ml-2">
            <h1 className="text-[#c4c4cc] text-lg font-semibold">
              {answer.student?.name || answer.instructor?.name}
            </h1>
            <span className="text-gray-400 text-md">
              {new Date(answer.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="mt-2 prose:text-white prose-code:text-quinary">
          <Markdown
            components={{
              code({ node, inline, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                  <CodeBlock
                    language={match[1]}
                    value={String(children).replace(/\n$/, '')}
                    {...props}
                  />
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                )
              },
            }}
          >
            {answer.content}
          </Markdown>
        </div>
        <div className="flex items-center mt-4">
          <div className="flex items-center">
            <button
              title="Upvote"
              type="button"
              onClick={handleUpvoteClick}
              className="text-gray-400 flex items-center"
            >
              {upvoted ? (
                <BiSolidUpvote size={20} />
              ) : (
                <BiUpvote size={20} className="hover:text-white" />
              )}
            </button>
            <span className="text-gray-400 text-md ml-2">
              {answer.vote.filter((vote) => vote.voteType === 'UPVOTE').length -
                answer.vote.filter((vote) => vote.voteType === 'DOWNVOTE')
                  .length}
            </span>
            <button
              title="Downvote"
              type="button"
              onClick={handleDownvoteClick}
              className="text-gray-400 flex items-center ml-2"
            >
              {downvoted ? (
                <BiSolidDownvote size={20} />
              ) : (
                <BiDownvote size={20} className="hover:text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {replying ? (
        <div className="flex mt-4 flex-col">
          <form onSubmit={handleReplySubmit}>
            <input type="hidden" value={answer.id} />
            <input type="hidden" value={studentId} />
            <input type="hidden" value={instructorId} />
            <input type="hidden" value={forumId} />
            <MDEditor
              id="editor-container"
              value={replyContent}
              onChange={handleReplyInputChange}
              height={400}
              preview="edit"
              className="rounded-lg p-4 text-[#c4c4cc]"
              style={{ backgroundColor: '#121214' }}
            />
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
