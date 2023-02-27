import './ModalWindowStyles.scss'
import { type Dispatch, type FC, type SetStateAction } from 'react'

interface propTypes {
  children: JSX.Element
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export const ModalWindow: FC<propTypes> = ({ children, setIsOpen }) => {
  return (
    <div
      className="background"
      onClick={() => { setIsOpen(false) }}
    >
      <div
        className="modal-window"
        onClick={event => { event.stopPropagation() }}
      >
        {children}
      </div>
    </div>
  )
}
