import { homedir } from 'os'
import path from 'path'
import { dialog } from 'electron'
import { NoteInfo } from '@shared/models'
import { GetNotes, ReadNote, WriteNote, CreateNote, DeleteNote } from '@shared/types'
import { appDirectoryName, fileEncoding, webcomeNoteFilename } from '@shared/constants'
import { remove, ensureDir, readdir, stat, readFile, writeFile } from 'fs-extra'
import { isEmpty } from 'lodash'
import welcomeNoteFile from '../../../resources/welcomeNote.md?asset'

// import { stat } from 'fs'
export const getRootDir = () => {
  console.log(homedir())
  return path.join(homedir(), appDirectoryName)
}

export const getNotes: GetNotes = async () => {
  const rootDir = getRootDir()
  await ensureDir(rootDir)

  const notesFileNames = await readdir(rootDir, {
    encoding: fileEncoding,
    withFileTypes: false
  })

  const notes = notesFileNames.filter((fileName) => fileName.endsWith('.md'))

  if (isEmpty(notes)) {
    console.info('No notes found, creating a welcome note')
    const content = await readFile(welcomeNoteFile, { encoding: fileEncoding })
    await writeFile(`${rootDir}/${webcomeNoteFilename}`, content, { encoding: fileEncoding })
    notes.push(webcomeNoteFilename)
  }
  return Promise.all(notes.map(getNoteInfoFromFilename))
}

export const getNoteInfoFromFilename = async (filename: string): Promise<NoteInfo> => {
  const fileStats = await stat(`${getRootDir()}/${filename}`)
  return {
    title: filename.replace(/\.md/, ''),
    lastEditTime: fileStats.mtimeMs
  }
}

export const readNote: ReadNote = async (filename) => {
  const rootDir = getRootDir()
  return readFile(`${rootDir}/${filename}.md`, {
    encoding: fileEncoding
  })
}

export const writeNode: WriteNote = async (filename, content) => {
  const rootDir = getRootDir()
  console.info(`Wrting note ${filename}`)

  return writeFile(`${rootDir}/${filename}.md`, content, {
    encoding: fileEncoding
  })
}

export const createNote: CreateNote = async () => {
  const rootDir = getRootDir()

  await ensureDir(rootDir)

  const { filePath, canceled } = await dialog.showSaveDialog({
    title: 'New note',
    defaultPath: `${rootDir}/Untitled.md`,
    buttonLabel: 'Create',
    properties: ['showOverwriteConfirmation'],
    showsTagField: false,
    filters: [{ name: 'Markdown', extensions: ['md'] }]
  })

  if (canceled || !filePath) {
    console.info('Note creation canceled')
    return false
  }

  const { name: filename, dir: parsentDir } = path.parse(filePath)

  if (parsentDir !== rootDir) {
    await dialog.showMessageBox({
      type: 'error',
      title: 'Creation failed',
      message: `All notes must be saved under ${rootDir} Avoid using other directories!`
    })
    return false
  }

  console.info(`Creating note: ${filename}`)

  await writeFile(filePath, '')

  return filename
}

export const deleteNote: DeleteNote = async (filename) => {
  const rootDir = getRootDir()
  const { response } = await dialog.showMessageBox({
    type: 'warning',
    title: 'Delete note',
    message: `Are you sure you want to delete ${filename}`,
    buttons: ['Delete', 'Cancel'], //0 is Delete, 1 is Cancel
    defaultId: 1,
    cancelId: 1
  })

  if (response === 1) {
    console.info('Note deletion canceled')
    return false
  }

  console.info(`Deleting note: ${filename}`)
  await remove(`${rootDir}/${filename}.md`)
  return true
}
