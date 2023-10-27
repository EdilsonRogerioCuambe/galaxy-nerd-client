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
import { useCallback, useEffect, useRef } from 'react'

interface EditorProps {
  data: any
  readOnly: boolean
}

const Editor: React.FC<EditorProps> = ({ data, readOnly }) => {
  const editorRef = useRef<EditorJS | null>(null)

  const initEditor = useCallback(() => {
    const editor = new EditorJS({
      holder: 'editorjs',
      onReady() {
        editorRef.current = editor
      },
      minHeight: 1,
      readOnly,
      data: data || {},
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
  }, [data, readOnly])

  useEffect(() => {
    if (data) {
      initEditor()
    }

    return () => {
      editorRef?.current?.destroy()
      editorRef.current = null
    }
  }, [data, initEditor])

  return <div id="editorjs"></div>
}

export default Editor
