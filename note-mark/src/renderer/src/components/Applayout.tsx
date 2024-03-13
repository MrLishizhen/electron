import { twMerge } from 'tailwind-merge'
import { ComponentProps, forwardRef } from 'react'

export const RootLayout = ({ className, children, ...props }: ComponentProps<'main'>) => {
  return (
    <main className={twMerge('flex flex-row h-screen text-stone-500', className)} {...props}>
      {children}
    </main>
  )
}

export const Sidebar = ({ className, children, ...props }: ComponentProps<'aside'>) => {
  return (
    // <aside className={twMerge('w-[250px] mt-10 h-[100vh+10px] overflow-auto', className)} {...props}>
    //   {children}
    // </aside>
    <aside
      className={twMerge('w-[250px] pt-10 h-[100vh+10px] overflow-auto', className)}
      {...props}
    >
      {children}
    </aside>
  )
}

export const Content = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={twMerge('flex-1 mt-10 overflow-auto', className)} {...props}>
        {children}
      </div>
    )
  }
)

Content.displayName = 'Content'
