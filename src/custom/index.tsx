export function Message({
  label,
  placeholder,
}: {
  label: string
  placeholder: string
}) {
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

export function Select({
  label,
  options,
  onChange,
}: {
  label: string
  options: any
  onChange: any
}) {
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
        {options.map((option: any, index: number) => (
          <option key={index} value={option.id} className={`${option?.cor}`}>
            {option.descricao || option.titulo}
          </option>
        ))}
      </select>
    </>
  )
}
