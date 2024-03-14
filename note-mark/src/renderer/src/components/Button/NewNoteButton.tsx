import { useSetAtom } from 'jotai'
import { ActionButon, ActionButtonProps } from './ActionButton'
import { LuFileSignature } from 'react-icons/lu'
import { createEmptyNoteAtom } from '@/store'
export const NewNoteButton = ({ ...props }: ActionButtonProps) => {
  const createEmptyNote = useSetAtom(createEmptyNoteAtom)

  const handleCreation = async () => {
    await createEmptyNote()
  }
  return (
    <ActionButon onClick={handleCreation} {...props}>
      <LuFileSignature className="w-4 h-4 text-zinc-300"></LuFileSignature>
    </ActionButon>
  )
}
