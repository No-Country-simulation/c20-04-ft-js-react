
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
    <main className='min-h-dvh max-w-screen-xl mx-auto'>
      <Header />
      <div className='md:flex md:flex-row relative'>
        <SideNavBar />
        <div className='flex-1 p-5 border-r transition-colors border-neutral-300 dark:border-neutral-700'>
          {children}
        </div>
      </div>
    </main >
  )
}