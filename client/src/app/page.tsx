import Header from '@/components/header/Header'
import SideNavBar from '../components/shared/SideNavBar'
import { useAppSelector } from '@/redux/hooks'
import { redirect } from 'next/navigation'

export default function Page() {
  const user = useAppSelector((state) => state.userReducer.user)
  console.log(user)

  if (user?.username) {
    redirect('/home')
  } else {
    redirect('/login')
  }
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
  );
}
