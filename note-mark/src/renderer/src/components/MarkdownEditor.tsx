import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin
} from '@mdxeditor/editor'
import { useMarkdownEditor } from '@/hooks/useMarksownEditor'

export const MarkdownEditor = () => {
  const { selectedNote } = useMarkdownEditor()
  if (!selectedNote) return null
  return (
    <MDXEditor
      key={selectedNote.title}
      markdown={selectedNote.content}
      plugins={[headingsPlugin(), listsPlugin(), quotePlugin(), markdownShortcutPlugin()]}
      contentEditableClassName="text-slate-700 outline-none min-h-screen bg-white max-w-none text-lg px-8 py-5
      prose  prose-p:my-3 prose-p:leading-relaxed prose-heading:my-4
      prose-blockquote:my-4 prose-ul:my-2 prose-li:my-0 prose-code:px-1 prose-code:text-red-500
      prose-code:before:content-[''] prose-code:after:content-['']"
    ></MDXEditor>
    // prose-invert
  )
}
