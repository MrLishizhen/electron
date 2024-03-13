import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
// const dateFormatter = new Intl.DateTimeFormat('en-US', {
//   dateStyle: 'short',
//   timeStyle: 'short',
//   timeZone: 'UTC'
// })
const dateFormatter = new Intl.DateTimeFormat(window.context?.locale || 'zh-CN', {
  dateStyle: 'short',
  timeStyle: 'short',
  timeZone: 'Asia/Shanghai'
})

export const formatdateFromMs = (ms: number) => dateFormatter.format(ms)

export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(...args))
}
