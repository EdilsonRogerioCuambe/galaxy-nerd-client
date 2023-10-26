import { Layout } from '../../layout'
import { useParams } from 'react-router-dom'
import { useGetQuestionBySlugQuery } from '../../slices/questionSlices/questionsApiSlice'
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
import { useEffect, useRef, useState } from 'react'
import { FaAngleUp, FaAngleDown, FaReply } from 'react-icons/fa'

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
  const [open, setOpen] = useState<boolean>(false)
  const { slug } = useParams<{ slug: string }>()
  const { data: forum } = useGetQuestionBySlugQuery(slug)
  const editorRef = useRef<EditorJS | null>(null)
  const editorRefAnswer = useRef<EditorJS | null>(null)

  console.log(forum)

  const parseDescription = JSON.parse(forum?.forum?.forum?.description || '{}')

  useEffect(() => {
    const initEditor = () => {
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
    }

    if (forum?.forum?.forum?.description) {
      initEditor()
    }

    return () => {
      editorRef?.current?.destroy()
      editorRef.current = null
    }
  }, [forum, parseDescription])

  useEffect(() => {
    const initEditor = () => {
      const editor = new EditorJS({
        holder: 'editorjs-answer',
        minHeight: 15,
        onReady: () => {
          editorRefAnswer.current = editor
        },
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
    }

    if (editorRefAnswer.current === null) {
      initEditor()
    }

    return () => {
      editorRefAnswer?.current?.destroy()
      editorRefAnswer.current = null
    }
  }, [])

  return (
    <Layout>
      <div className="bg-secondary relative container mx-auto rounded-md text-[#c4c4cc] p-6 mt-8">
        <div className="max-w-7xl bg-secondary rounded-lg p-4 text-[#c4c4cc]">
          <h1 className="text-[#e1e1e6] text-4xl text-center font-semibold mb-2">
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

          <div className="flex flex-col">
            <div
              id="editorjs-answer"
              className="mb-4 bg-main rounded-lg overflow-y-auto h-[calc(100vh-20rem)]"
            ></div>
            <button
              type="button"
              className="bg-quinary text-white rounded-lg px-4 py-2 text-lg font-semibold w-48 transitions hover:bg-opacity-80"
            >
              Enviar comentário
            </button>
          </div>

          {/** RECURSIVE REACT COMPONENT FOR THE NESTED COMENTS */}
          {forum?.forum?.forum?.answers?.map((answer: Answer) => (
            <Comment key={answer.id} answer={answer} />
          ))}
        </div>
      </div>
    </Layout>
  )
}

const Comment = ({ answer }: { answer: Answer }) => {
  const [showChildren, setShowChildren] = useState<boolean>(false)
  const [replying, setReplying] = useState<boolean>(false)
  const [replyContent, setReplyContent] = useState<string>('')

  const handleReplyClick = () => {
    setReplying(!replying)
  }

  const handleReplyInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setReplyContent(e.target.value)
  }

  const handleReplySubmit = async () => {
    // Lógica para enviar a resposta
    // Use o CreateAnswerUseCase ou outra função apropriada para criar a resposta
    // Certifique-se de fornecer os valores necessários, como forumId, parentId, studentId, etc.
    // Limpe o campo de entrada após o envio
    setReplyContent('')
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
          <textarea
            placeholder="Digite sua resposta"
            value={replyContent}
            onChange={handleReplyInputChange}
            className="bg-secondary rounded-lg p-4 w-full h-32"
          ></textarea>
          {/** PODER CANCELAR */}
          <button
            type="button"
            onClick={handleReplySubmit}
            className="bg-quinary text-white mt-4 rounded-lg px-4 py-2 text-lg font-semibold w-48 transitions hover:bg-opacity-80"
          >
            Enviar
          </button>
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
              {showChildren ? 'Hide Replies' : 'Show Replies'}
            </span>
          </div>
          {showChildren && (
            <div>
              {answer.children.map((child) => (
                <Comment key={child.id} answer={child} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
