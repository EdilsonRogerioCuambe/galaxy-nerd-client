import { useRef, Fragment, ReactNode } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { IoCloseSharp } from 'react-icons/io5'

interface IMainModelProps {
  open: boolean
  setOpen: (open: boolean) => void
  children: ReactNode
}

export function MainModal({ open, setOpen, children }: IMainModelProps) {
  const closeButton = useRef(null)
  return (
    <>
      <Transition show={open} as={Fragment} appear={true}>
        <Dialog
          as="div"
          initialFocus={closeButton}
          onClose={() => setOpen(false)}
          className="fixed inset-0 z-30 overflow-y-auto text-center"
        >
          <div className="min-h-screen px-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Overlay className="fixed inset-0 bg-main opacity-30" />
            </Transition.Child>
            <span className="inline-block h-screen align-middle" aria-hidden>
              &#202024;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              {children}
            </Transition.Child>
            <div className="absolute right-5 top-5">
              <button
                title="Fechar"
                type="button"
                className=" w-12 h-12 mx-4 flex-colo text-base font-medium text-quinary transitions bg-white rounded-md hover:bg-quinary hover:text-[#c4c4cc]"
                onClick={() => setOpen(false)}
                ref={closeButton}
              >
                <IoCloseSharp className="w-8 h-8" />
              </button>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
