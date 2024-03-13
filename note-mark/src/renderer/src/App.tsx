import {
  FloatingNoteTitle,
  MarkdownEditor,
  NotePreviewList,
  ActionButtonsRow,
  DraggableTopBar,
  RootLayout,
  Sidebar,
  Content
} from '@/components'

import { useRef } from 'react'

const App = () => {
  const contentContainerRef = useRef<HTMLDivElement>(null)
  const resetScroll = () => {
    console.log('进入了这里')
    contentContainerRef.current?.scrollTo(0, 0)
  }
  return (
    <>
      <DraggableTopBar></DraggableTopBar>
      <RootLayout>
        <Sidebar className="px-2 border-r  border-r-inherit/50">
          <ActionButtonsRow className="flex justify-between mt-1"></ActionButtonsRow>
          <NotePreviewList className="mt-3 space-y-1" onSelect={resetScroll}></NotePreviewList>
        </Sidebar>
        <Content ref={contentContainerRef} className="border-l border-l-white/20">
          <FloatingNoteTitle className="pt-2"></FloatingNoteTitle>
          <MarkdownEditor />
        </Content>
      </RootLayout>
    </>
  )
}

export default App
