import { useRecoilState } from "recoil"
import modalState from "../../atoms/modalAtom"

const Modal = () => {
  const [open, setOpen] = useRecoilState(modalState)
  return (
    <div>
      {open && (<p>Modal is open</p>)}
    </div>
  )
}
export default Modal