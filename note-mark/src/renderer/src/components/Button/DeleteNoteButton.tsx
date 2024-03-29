import { useSetAtom } from 'jotai'
import { ActionButon, ActionButtonProps } from './ActionButton'
import { FaRegTrashCan } from 'react-icons/fa6'
import { deleteNoteAtom } from '@/store'
export const DeleteNoteButton = ({ ...props }: ActionButtonProps) => {
  const deleteNote = useSetAtom(deleteNoteAtom)

  const handleDelete = async () => {
    await deleteNote()
  }
  return (
    <ActionButon onClick={handleDelete} {...props}>
      <FaRegTrashCan className="w-4 h-4 text-zinc-300"></FaRegTrashCan>
    </ActionButon>
  )
}
