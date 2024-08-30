import Header from '@/components/Header/Header'
import SideNavBar from '@/components/shared/SideNavBar'

export default function Home() {
  return (
    <main className='min-h-dvh max-w-screen-xl mx-auto'>
      <Header />
      <div className='flex'>
        <SideNavBar />
        <div className=''>
          hola
        </div>
      </div>
    </main>
  )
}
