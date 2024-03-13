import { NoteInfo } from '@shared/models'
import { ComponentProps } from 'react'
import { cn, formatdateFromMs } from '@renderer/utils'
export type NotePreviewProps = NoteInfo & {
  isActive?: boolean
} & ComponentProps<'div'>

export const NotePreview = ({
  title,
  content,
  lastEditTime,
  isActive = false,
  className,
  ...props
}: NotePreviewProps) => {
  const date = formatdateFromMs(lastEditTime)
  return (
    <div
      className={cn(
        'cursor-pointer px-2.5 my-1 py-3 rounded-md transition-colors duration-75',
        {
          'bg-zinc-400/50': isActive,
          'hover:bg-zinc-500/75': !isActive,
          'hover:text-white': !isActive
        },
        className
      )}
      {...props}
    >
      <h3 className="mb-1 fot-bold truncate">{title}</h3>
      <span className="inline-block w-full mb-2 text-sx font-lint text-left">{date}</span>
    </div>
  )
}
