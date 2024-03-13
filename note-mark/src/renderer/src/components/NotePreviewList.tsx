import { notesMock } from '@/store/mocks'
import { ComponentProps } from 'react'
import { NotePreview } from './NotePreview'
import { twMerge } from 'tailwind-merge'
import { useNotesList } from '@renderer/hooks/useNotesList'
import { isEmpty } from 'lodash'
export type NotePreviewListProps = ComponentProps<'ul'> & {
  onSelect?: () => void
}

export const NotePreviewList = ({ onSelect, className, ...props }: NotePreviewListProps) => {
  const { notes, selectedNoteIndex, handleNoteSelect } = useNotesList(onSelect)
  if (!notes) return null
  if (isEmpty(notes)) {
    return (
      <ul className={twMerge('text-center pt-4', className)} {...props}>
        <span>No Notes Yet?</span>
      </ul>
    )
  }
  return (
    <ul {...props}>
      {notes.map((u, index) => {
        return (
          <NotePreview
            isActive={selectedNoteIndex === index}
            key={u.title + u.lastEditTime}
            onClick={handleNoteSelect(index)}
            {...u}
          ></NotePreview>
        )
      })}
    </ul>
  )
}
