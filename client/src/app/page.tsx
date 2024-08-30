import Header from '@/components/header/Header';
import SideNavBar from '../components/shared/SideNavBar';
import ThemeSwitcher from '@/components/shared/ThemeSwitcher';

export default function Home() {
  return (
    <main className='min-h-dvh max-w-screen-xl mx-auto'>
      <Header />
      <div className='flex'>
        <SideNavBar />
        <div className=''>
          hola
          {/* Puedes eliminar esete componente solo esta para probar el cambio de temas */}
          <ThemeSwitcher />
        </div>
      </div>
    </main>
  );
}
