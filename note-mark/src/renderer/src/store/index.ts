import { NoteInfo } from '@shared/models'
import { atom } from 'jotai'
import { notesMock } from './mocks'

export const notesAtom = atom<NoteInfo[]>(notesMock)

export const selectedNoteIndexAtom = atom<number | null>(null)

export const selectedNoteAtom = atom((get) => {
  const notes = get(notesAtom)
  const selectedNoteIndex = get(selectedNoteIndexAtom)
  if (selectedNoteIndex == null) return null

  const selctedNote = notes[selectedNoteIndex]

  return {
    ...selctedNote,
    content: `Hello from Note${selectedNoteIndex}`
  }
})
