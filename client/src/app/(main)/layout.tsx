"use client"

import Header from '@/components/header/Header'
import MovileSearch from '@/components/shared/MovileSearch'
import SideNavBar from '@/components/shared/SideNavBar'
import { useRefreshTokenMutation } from '@/redux/apiSlices/authApi';
import { useEffect } from 'react';


export default function MainLayout({ children }: { children: React.ReactNode }) {

  const [refreshToken, { isLoading, isError, isSuccess }] = useRefreshTokenMutation();

  useEffect(() => {
    const attemptRefreshToken = async () => {
      try {
        // Pasa un argumento vacío
        const result = await refreshToken({}); // Llamamos la mutación pasando un objeto vacío
        console.log(result);

        if (result.data) {
          console.log('Token refrescado con éxito.');
        } else {
          console.log('No se pudo refrescar el token.');
        }
      } catch (error) {
        console.error('Error al refrescar el token:', error);
      }
    };

    attemptRefreshToken(); // Intentamos refrescar el token al montar el componente
  }, [refreshToken]);

  return (
    <main className='min-h-dvh max-w-screen-xl mx-auto'>
      <Header />
      <div className='md:flex md:flex-row relative'>
        <SideNavBar />
        <div className='flex-1 pb-[85.05px] sm:pb-[85.05px] sm:p-5 border-r transition-colors border-neutral-300 dark:border-neutral-700'>
          {children}
        </div>
      </div>
      <MovileSearch />
    </main >
  )
}
