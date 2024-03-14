import { homedir } from 'os'
import path from 'path'
import { dialog } from 'electron'
import { NoteInfo } from '@shared/models'
import { GetNotes, ReadNote, WriteNote, CreateNote } from '@shared/types'
import { appDirectoryName, fileEncoding } from '@shared/constants'
import { ensureDir, readdir, stat, readFile, writeFile } from 'fs-extra'
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
