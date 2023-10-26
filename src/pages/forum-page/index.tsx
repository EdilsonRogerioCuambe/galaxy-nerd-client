import { Layout } from '../../layout'
import { useParams } from 'react-router-dom'
import { useGetQuestionBySlugQuery } from '../../slices/questionSlices/questionsApiSlice'
import { useCreateAnswerMutation } from '../../slices/answersSlices/answersApiSlice'
import { message } from 'antd'
import EditorJS from '@editorjs/editorjs'
import Header from '@editorjs/header'
import List from '@editorjs/list'
import Embed from '@editorjs/embed'
import Image from '@editorjs/image'
import Table from '@editorjs/table'
import SimpleImage from '@editorjs/simple-image'
import Quote from '@editorjs/quote'
import Warning from '@editorjs/warning'
import Code from '@editorjs/code'
import LinkTool from '@editorjs/link'
import Raw from '@editorjs/raw'
import Marker from '@editorjs/marker'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import Paragraph from '@editorjs/paragraph'
import { useCallback, useEffect, useRef, useState } from 'react'
import { FaAngleUp, FaAngleDown, FaReply } from 'react-icons/fa'
import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'

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
}

export function ForumPage() {
  const { slug } = useParams<{ slug: string }>()
  const { data: forum } = useGetQuestionBySlugQuery(slug)
  const editorRef = useRef<EditorJS | null>(null)
  const { student } = useSelector((state: RootState) => state.studentAuth)
  const { instructor } = useSelector((state: RootState) => state.instructorAuth)

  console.log(instructor?.id)

  const parseDescription = JSON.parse(forum?.forum?.forum?.description || '{}')

  const initEditor = useCallback(() => {
    const editor = new EditorJS({
      holder: 'editorjs',
      onReady() {
        editorRef.current = editor
      },
      minHeight: 1,
      readOnly: true,
      data: parseDescription,
      tools: {
        header: {
          class: Header,
          config: {
            placeholder: 'Digite um título',
            levels: [1, 2, 3, 4, 5, 6],
            defaultLevel: 3,
          },
        },
        list: {
          class: List,
          inlineToolbar: true,
        },
        embed: {
          class: Embed,
          inlineToolbar: true,
          config: {
            services: {
              youtube: true,
              coub: true,
            },
          },
        },
        image: {
          class: Image,
          config: {
            endpoints: {
              byFile: 'http://localhost:3333/images',
              byUrl: 'http://localhost:3333/images',
            },
          },
        },
        table: {
          class: Table,
          inlineToolbar: true,
        },
        simpleImage: {
          class: SimpleImage,
          inlineToolbar: true,
        },
        quote: {
          class: Quote,
          inlineToolbar: true,
          config: {
            quotePlaceholder: 'Digite uma citação',
            captionPlaceholder: 'Autor da citação',
          },
        },
        warning: {
          class: Warning,
          inlineToolbar: true,
          shortcut: 'CMD+SHIFT+W',
          config: {
            titlePlaceholder: 'Digite um título',
            messagePlaceholder: 'Digite uma mensagem',
          },
        },
        code: {
          class: Code,
          inlineToolbar: true,
        },
        linkTool: {
          class: LinkTool,
          config: {
            endpoint: 'http://localhost:3333/images',
          },
        },
        raw: {
          class: Raw,
          inlineToolbar: true,
        },
        marker: {
          class: Marker,
          shortcut: 'CMD+SHIFT+M',
        },
        delimiter: {
          class: Delimiter,
          shortcut: 'CMD+SHIFT+M',
        },
        inlineCode: {
          class: InlineCode,
          shortcut: 'CMD+SHIFT+M',
        },
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
        },
      },
    })
  }, [parseDescription])

  useEffect(() => {
    if (forum?.forum?.forum?.description) {
      initEditor()
    }

    return () => {
      editorRef?.current?.destroy()
      editorRef.current = null
    }
  }, [forum?.forum?.forum?.description, parseDescription, initEditor])

  return (
    <Layout>
      <div className="bg-secondary relative container mx-auto rounded-md text-[#c4c4cc] p-6 mt-8">
        <div className="max-w-7xl bg-secondary rounded-lg p-4 text-[#c4c4cc]">
          <h1 className="text-[#e1e1e6] text-4xl text-center font-semibold mb-2 mx-auto max-w-3xl">
            #{forum?.forum?.forum?.title}
          </h1>
          <div id="editorjs"></div>
        </div>
      </div>

      <div className="bg-secondary relative container mx-auto rounded-md text-[#c4c4cc] p-6 mt-8">
        <div className="max-w-7xl bg-secondary rounded-lg p-4 text-[#c4c4cc]">
          <h1 className="text-[#e1e1e6] text-xl font-semibold mb-2">
            Comentários
          </h1>

          <CommentInForum
            studentId={student?.id}
            instructorId={instructor?.id}
            forumId={forum?.forum?.forum?.id}
          />

          {forum?.forum?.forum?.answers?.map((answer: Answer) => (
            <CommentList
              key={answer.id}
              answer={answer}
              studentId={student?.id}
              forumId={forum?.forum?.forum?.id}
              instructorId={instructor?.id}
            />
          ))}
        </div>
      </div>
    </Layout>
  )
}

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

  const handleCommentSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()
    if (!instructorId && !studentId) {
      message.error('Existem campos vazios')
    }

    try {
      await createAnswer({
        content,
        studentId,
        instructorId,
        forumId,
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
    <div className="flex flex-col">
      <form onSubmit={handleCommentSubmit}>
        <input type="hidden" value={studentId} />
        <input type="hidden" value={instructorId} />
        <input type="hidden" value={forumId} />
        <textarea
          placeholder="Digite seu comentário"
          className="bg-main rounded-lg p-4 w-full resize-none h-72"
          name="content"
          itemID="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
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
  const [createAnswer] = useCreateAnswerMutation()

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
  return (
    <div className="rounded-lg p-4 mt-4 bg-main">
      <div className="text-[#c4c4cc]">{answer.content}</div>
      <div className="text-[#c4c4cc] mt-2">
        <p>
          {new Date(answer.createdAt).toLocaleDateString('pt-BR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </p>
        {answer.student && (
          <p className="flex items-center">
            <span>{answer.student.name}</span>
            {answer.student.avatar && (
              <img
                src={answer.student.avatar}
                alt={answer.student.name}
                className="w-8 h-8 ml-2 rounded-full object-cover"
              />
            )}
          </p>
        )}
        {answer.instructor && (
          <p className="flex items-center text-[#c4c4cc]">
            <span>{answer.instructor.name}</span>
            {answer.instructor.avatar && (
              <img
                src={answer.instructor.avatar}
                alt={answer.instructor.name}
                className="w-8 h-8 ml-2 rounded-full object-cover"
              />
            )}
          </p>
        )}
      </div>
      {replying ? (
        <div className="flex mt-4 flex-col">
          <form onSubmit={handleReplySubmit}>
            <input type="hidden" value={answer.id} />
            <input type="hidden" value={studentId} />
            <input type="hidden" value={instructorId} />
            <input type="hidden" value={forumId} />
            {/** textarea não ser afetado pelo editorjs */}
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
