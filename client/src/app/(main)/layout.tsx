
import Header from '@/components/header/Header'
import SideNavBar from '@/components/shared/SideNavBar'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | PawPal',
    default: 'PawPal'
  }
}

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className='min-h-dvh max-w-screen-xl mx-auto flex flex-col'>
      <Header />
      <div className='flex flex-col md:flex-row relative'>
        <SideNavBar />
        <div className='p-5 flex-1 border-r border-neutral-300 dark:border-neutral-300 transition-colors'>
          {children}
        </div>
      </div>
    </main >
  )
}