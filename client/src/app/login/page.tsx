"use client"

import { Button, styled, TextField, IconButton, InputAdornment, formGroupClasses } from "@mui/material";
import { useLoginMutation } from "@/redux/apiSlices/authApi";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Input = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    height: '50px',
    borderRadius: "8px",
  },
  '& .MuiInputLabel-root': {
    top: "2px",
    transform: "translate(16px, 50%)",
    transition: "all 0.2s ease",
  },
  '& .MuiInputLabel-shrink': {
    top: "3px",
    transform: "translate(16px, -50%) scale(0.75)",
  },
}));

const ButtonSubmit = styled(Button)(({ theme }) => ({
  textTransform: "none",
}));

interface DataFormInterface {
  email: string;
  password: string;
}

export default function PageLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [dataForm, setDataForm] = useState<DataFormInterface>({ email: '', password: '' });
  const [errors, setErrors] = useState<Partial<DataFormInterface>>({});

  const [login, { isLoading, isSuccess, error }] = useLoginMutation();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setDataForm(prevState => ({
      ...prevState,
      [id]: value,
    }));
    setErrors(prevState => ({
      ...prevState,
      [id]: '',
    }));
  };

  const handleSubtmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newErrors: Partial<DataFormInterface> = {};

    if (!dataForm.email) {
      newErrors.email = 'El correo electrónico es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(dataForm.email)) {
      newErrors.email = 'El correo electrónico no es válido';
    }

    if (!dataForm.password) {
      newErrors.password = 'La contraseña es obligatoria';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    postLogin(dataForm)
  };

  const postLogin = async (dataForm: DataFormInterface) => {
    try {
      const response = await login(dataForm).unwrap(); // Llama a la mutación y espera la respuesta
      console.log('Usuario autenticado:', response);
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
    }
  }


  return (
    <div className="bg-[#CEC5FD] min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md max-w-md w-full p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Bienvenido a la comunidad Pawpal
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Inicia sesión para compartir tus mascotas!
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubtmit}>
          <Input
            type="email"
            label="Correo electrónico"
            id="email"
            value={dataForm?.email}
            onChange={handleInputChange}
            className="w-full"
            error={!!errors.email}
            helperText={errors.email}
          />
          <Input
            type={showPassword ? "text" : "password"}
            label="Contraseña"
            id="password"
            className="w-full"
            value={dataForm?.password}
            onChange={handleInputChange}
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <ButtonSubmit type="submit" className="w-full bg-[#A14CEB] hover:bg-[#8A3CD1] text-white">
            Iniciar sesión
          </ButtonSubmit>
        </form>

        <div className="mt-6 text-center space-y-2">
          <Link href="/auth/forgot-password" className="text-[#A14CEB] hover:underline text-sm">
            ¿Olvidaste tu contraseña?
          </Link>
          <p className="text-sm text-gray-600">
            ¿No tienes una cuenta?{" "}
            <Link href="/auth/register" className="text-[#A14CEB] hover:underline">
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
