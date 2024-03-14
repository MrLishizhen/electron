import { contextBridge, ipcRenderer } from 'electron'
// import { electronAPI } from '@electron-toolkit/preload'
import { GetNotes, ReadNote, WriteNote, CreateNote } from '@shared/types'

if (!process.contextIsolated) {
  throw new Error('contextIsolated must be enabled in the BrowserWindow')
}

try {
  contextBridge.exposeInMainWorld('context', {
    local: navigator.language,
    getNotes: (...args: Parameters<GetNotes>) => ipcRenderer.invoke('getNotes', ...args),
    readNote: (...args: Parameters<ReadNote>) => ipcRenderer.invoke('readNote', ...args),
    writeNode: (...args: Parameters<WriteNote>) => ipcRenderer.invoke('writeNode', ...args),
    createNote: (...args: Parameters<CreateNote>) => ipcRenderer.invoke('createNote', ...args)
  })
} catch (error) {
  console.log(error)
}
