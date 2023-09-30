export function Header({ header, Icon }: { header: string; Icon: any }) {
  return (
    <div className="w-full flex sm:gap-8 gap-4 items-center">
      <Icon className="sm:w-6 sm:h-6 w-4 h-4 text-quinary" />
      <h2 className="sm:text-xl font-extrabold text-lg text-[#e1e1e6]">
        {header}
      </h2>
    </div>
  )
}
