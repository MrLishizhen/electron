import { ElectronAPI } from '@electron-toolkit/preload'
import { GetNotes, ReadNote, WriteNode, CreateNote } from '@shared/types'
declare global {
  interface Window {
    // electron: ElectronAPI
    context: {
      locale: string
      getNotes: GetNotes
      readNote: ReadNote
      writeNode: WriteNode
      createNote: CreateNote
      deleteNote: DeleteNote
    }
  }
}
