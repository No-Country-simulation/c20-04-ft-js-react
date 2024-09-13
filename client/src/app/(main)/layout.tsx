"use client"

import Header from '@/components/Header/Header'
import SideNavBar from '@/components/shared/SideNavBar'
import { useRefreshTokenMutation } from '@/redux/apiSlices/authApi';
import { useEffect, useState } from 'react';
import { setUser } from "@/redux/slices/userSlice";
import { useDispatch } from "react-redux";
import CircularProgress from '@mui/material/CircularProgress'; // Importar CircularProgress
import Box from '@mui/material/Box'; // Para centrar el loading

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [refreshToken, { isLoading, isError, isSuccess }] = useRefreshTokenMutation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const attemptRefreshToken = async () => {
      try {
        const response = await refreshToken({}).unwrap(); // Llamamos la mutación pasando un objeto vacío
        console.log(response);

        if (response.code == 200) {
          dispatch(setUser(response.data));
        } else {
          console.log('No se pudo refrescar el token.');
        }
      } catch (error) {
        console.error('Error al refrescar el token:', error);
      } finally {
        setLoading(false); // Termina la carga cuando se completa la mutación
      }
    };

    attemptRefreshToken();
  }, [refreshToken]);

  return (
    <main className="min-h-dvh max-w-screen-xl mx-auto relative">
      {loading ? (
        // Mostrar CircularProgress mientras isLoading sea true
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          position="fixed"
          top="0"
          left="0"
          width="100%"
          height="100%"
          bgcolor="background.paper" // Fondo blanco para el contenedor de carga
          zIndex="tooltip"
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Header />
          <div className="md:flex md:flex-row relative">
            <SideNavBar />
            <div className="flex-1 pb-[85.05px] sm:pb-[85.05px] sm:p-5 border-r transition-colors border-neutral-300 dark:border-neutral-700">
              {children}
            </div>
          </div>
        </>
      )}
    </main>
  );
}
