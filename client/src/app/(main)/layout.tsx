
import Header from '@/components/Header/Header'
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
      <div className='flex flex-1 flex-col md:flex-row relative'>
        <SideNavBar />
        {children}
      </div>
    </main >
  )
}