import { useDropzone } from 'react-dropzone'
import { FiUploadCloud } from 'react-icons/fi'
import { message } from 'antd'

interface UploaderProps {
  setAvatar: (avatar: string) => void
}

export function Uploader({ setAvatar }: UploaderProps) {
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    maxSize: 1024 * 1024 * 15, // 15MB
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0]
      if (file) {
        // Aqui, definimos a imagem como base64 e a exibimos na interface.
        const reader = new FileReader()
        reader.onload = () => {
          setAvatar(reader.result as string)
        }
        reader.readAsDataURL(file)
        message.success(`Arquivo ${file.name} adicionado!`)
      }
    },
  })

  return (
    <div className="w-full text-center my-2">
      <div
        {...getRootProps()}
        className="px-6 py-8 pb-6 border-2 border-border border-dashed bg-main rounded-md cursor-pointer"
      >
        <input {...getInputProps()} />
        <span className="mx-auto flex-colo text-subMain text-3xl">
          <FiUploadCloud />
        </span>
        <p className="mt-1 text-sm text-gary-500">
          Arraste e solte uma imagem aqui.
        </p>
        <em>(Apenas .png e .jpg são aceitos)</em>
      </div>
    </div>
  )
}
