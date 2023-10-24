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
import { useEffect, useRef } from 'react'

export function ForumPage() {
  const { slug } = useParams<{ slug: string }>()
  const { data: question, isLoading } = useGetQuestionBySlugQuery(slug)
  const editorRef = useRef<EditorJS | null>(null)

  const parseDescription = JSON.parse(
    question?.forum?.forum?.description || '{}',
  )

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

    if (question?.forum?.forum?.description) {
      initEditor()
    }

    return () => {
      editorRef?.current?.destroy()
      editorRef.current = null
    }
  }, [question, parseDescription])

  return (
    <Layout>
      <div className="bg-secondary relative container mx-auto rounded-md text-[#c4c4cc] p-6 mt-8">
        <div className="max-w-7xl bg-secondary rounded-lg p-4 text-[#c4c4cc]">
          <h1 className="text-2xl text-quinary text-center font-semibold">
            #{question?.forum?.forum?.title}
          </h1>
          <div id="editorjs"></div>
        </div>
      </div>
    </Layout>
  )
}
