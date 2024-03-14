import { saveNoteAtom, selectedNoteAtom } from '@/store'
import { MDXEditorMethods } from '@mdxeditor/editor'
import { NoteContent } from '@shared/models'
import { autoSavingTime } from '@shared/constants'
import { useAtomValue, useSetAtom } from 'jotai'
import { useRef } from 'react'
import { throttle } from 'lodash'

export const useMarkdownEditor = () => {
  const selectedNote = useAtomValue(selectedNoteAtom)
  const saveNote = useSetAtom(saveNoteAtom)
  const editorRef = useRef<MDXEditorMethods>(null)

  // 自动保存
  const handleAutoSaving = throttle(
    async (content: NoteContent) => {
      if (!selectedNote) return
      console.info('Auto saving', selectedNote.title)

      await saveNote(content)
    },
    autoSavingTime,
    {
      leading: false,
      trailing: true
    }
  )

  const handleBlur = async () => {
    if (!selectedNote) return
    handleAutoSaving.cancel()

    const content = editorRef.current?.getMarkdown()
    if (content != null) {
      await saveNote(content)
    }
  }
  return {
    editorRef,
    selectedNote,
    handleAutoSaving,
    handleBlur
  }
}
