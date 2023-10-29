import { useCreateAnswerMutation } from '../../slices/answersSlices/answersApiSlice'
import { message } from 'antd'
import MDEditor from '@uiw/react-md-editor'
import { useState } from 'react'

const CommentInForum = ({
  studentId,
  forumId,
  instructorId,
}: {
  studentId?: string
  forumId: string
  instructorId?: string
}) => {
  const [createAnswer] = useCreateAnswerMutation()
  const [content, setContent] = useState<string>('')

  const handleContentChange = (value: string | undefined) => {
    if (value) {
      setContent(value)
    }
  }

  const handleCommentSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()
    if (!instructorId && !studentId) {
      message.error('Existem campos vazios')
    }

    try {
      await createAnswer({
        studentId,
        instructorId,
        forumId,
        content,
      }).unwrap()

      message.success('Comentário enviado com sucesso')
    } catch (error) {
      message.error('Erro ao enviar comentário')
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
    <div className="flex flex-col text-2xl">
      <form onSubmit={handleCommentSubmit}>
        <input type="hidden" value={studentId} />
        <input type="hidden" value={instructorId} />
        <input type="hidden" value={forumId} />
        <MDEditor
          id="editor-container"
          value={content}
          onChange={handleContentChange}
          height={400}
          preview="edit"
          className="rounded-lg p-4 text-[#c4c4cc]"
          style={{ backgroundColor: '#121214' }}
        />
        <button
          type="submit"
          className="bg-quinary text-white rounded-lg px-4 py-2 mt-4 text-lg font-semibold w-32 transitions hover:bg-opacity-80"
        >
          Enviar
        </button>
      </form>
    </div>
  )
}

export default CommentInForum
