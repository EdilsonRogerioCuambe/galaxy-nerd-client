interface IMessageProps {
  label: string
  placeholder: string
}

export function Message({ label, placeholder }: IMessageProps) {
  return (
    <>
      <div className="text-sm w-full">
        <label htmlFor={label} className="text-[#c4c4cc] font-bold">
          {label}
        </label>
        <textarea
          title="descrição"
          className="w-full h-48 mt-2 px-6 bg-main py-6 border rounded placeholder:text-[#c4c4cc] font-medium resize-none"
        >
          {placeholder}
        </textarea>
      </div>
    </>
  )
}

interface ISelectProps {
  label: string
  value?: string | undefined
  options: Array<{
    id: string
    descricao?: string
    titulo?: string
  }>
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

export function Select({ label, options, onChange }: ISelectProps) {
  return (
    <>
      <label htmlFor={label} className="font-semibold text-text">
        {label}
      </label>
      <select
        title={label}
        className="w-full mt-2 px-6 py-4 border bg-main border-border rounded text-text"
        onChange={onChange}
      >
        {options.map((option, index) => (
          <option key={index} value={option.id}>
            {option.descricao || option.titulo}
          </option>
        ))}
      </select>
    </>
  )
}

interface IInputProps {
  name?: string
  label: string
  bg?: boolean
  type: string
  value: string | undefined
  placeholder: string
  defaultValue?: string | undefined
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input = ({
  label,
  bg,
  type,
  value,
  placeholder,
  onChange,
  name,
  defaultValue,
}: IInputProps) => {
  return (
    <>
      <div className="text-sm w-full my-2">
        <label htmlFor={label} className="text-[#e1e1e6] font-bold">
          {label}
        </label>
        <input
          title={label}
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          defaultValue={defaultValue}
          onChange={onChange}
          className={`w-full text-sm mt-2 p-4 rounded text-[#c4c4cc] border-quaternary border-2 ${
            bg ? 'bg-main' : 'bg-secondary'
          }`}
        />
      </div>
    </>
  )
}
