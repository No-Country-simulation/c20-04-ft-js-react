// Por convención, los nombres de componentes de React usan PascalCase
import React from "react";
import Link from "next/link";
import { TextField } from "@mui/material";

export default function PageLogin() {
  return (
    <div className="bg-[#CEC5FD] min-h-screen flex justify-center">
      <div className="max-w-[480px] w-full flex flex-col justify-center sm:p-0 p-4">
        <div className="bg-white rounded sm:p-6 p-4 flex flex-col gap-6 border-2 border-[#B9B9B9]">
          <div className="flex flex-col items-center">
            <h2 className="font-medium sm:text-2xl text-xl text-center">
              Bienvenido a la comunidad Pawpal
            </h2>
            <h4 className="text-xs text-black text-opacity-60">
              Inicia sesión para compartir tus mascotas!
            </h4>
          </div>
          <form action="" className="flex flex-col gap-3">
            <TextField
              label="Correo electrónico"
              variant="outlined"
              type="email"
              className="w-full"
            />
            <TextField
              label="Contraseña"
              variant="outlined"
              type="password"
              className="w-full"
            />
            <button
              type="submit"
              className="bg-[#A14CEB] hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded w-full"
            >
              Iniciar sesión
            </button>
          </form>
          <div className="flex flex-col items-center gap-3 text-center">
            <h4 className="text-[#A14CEB]">
              <Link href={"/auth/forgot-password"}>
                ¿Olvidaste tu contraseña?
              </Link>
            </h4>
            <h4 className="flex sm:flex-row flex-col gap-1">
              ¿No tienes una cuenta?
              <span className="text-[#A14CEB]">
                <Link href={"/auth/register"}>Regístrate</Link>
              </span>
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}
