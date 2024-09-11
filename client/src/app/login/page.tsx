"use client"

import { useRouter } from 'next/navigation'
import { Button, styled, TextField, IconButton, InputAdornment, formGroupClasses, CircularProgress } from "@mui/material";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

//redux
import { useLoginMutation } from "@/redux/apiSlices/authApi";
import { setUser } from "@/redux/slices/userSlice";
import { useDispatch } from "react-redux";
import Alert from '@/components/shared/Alert';

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

interface FormDataInterface {
  email: string;
  password: string;
}

interface DataAlertInterface {
  type: 'info' | 'danger' | 'success' | 'warning' | 'dark';
  message: string;
  title?: string;
}

export default function PageLogin() {
  const dispatch = useDispatch()
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormDataInterface>({ email: '', password: '' });
  const [errors, setErrors] = useState<Partial<FormDataInterface>>({});

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState<DataAlertInterface>({
    type: "success",
    message: "Registro exitoso",
    title: "Éxito"
  });

  const [login, { isLoading, isSuccess, error }] = useLoginMutation();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleClose = () => {
    setShowAlert(false);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData(prevState => ({
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

    const newErrors: Partial<FormDataInterface> = {};

    if (!formData.email) {
      newErrors.email = 'El correo electrónico es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El correo electrónico no es válido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es obligatoria';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    postLogin(formData)
  };

  const postLogin = async (dataForm: FormDataInterface) => {
    try {
      const response = await login(dataForm).unwrap(); // Llama a la mutación y espera la respuesta
      console.log('Usuario autenticado:', response);
      dispatch(setUser(response))
      router.push('/home')
    } catch (err: any) {
      if (err?.status === 401) {
        setAlertMessage({
          type: "danger",
          message: "El email o la contraseña es incorrecta.",
        });
        setShowAlert(true);
      }
    }
  }

  return (
    <>
      <div className="bg-[#CEC5FD] dark:bg-[#674cf0] min-h-screen flex items-center justify-center p-4">
        <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-md max-w-md w-full p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-neutral-100">
              Bienvenido a la comunidad Pawpal
            </h2>
            <p className="text-sm text-gray-600 dark:text-neutral-200 mt-2">
              Inicia sesión para compartir tus mascotas!
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubtmit}>
            <Input
              type="email"
              label="Correo electrónico"
              id="email"
              value={formData?.email}
              onChange={handleInputChange}
              className="w-full dark:bg-neutral-800 rounded-lg"
              error={!!errors.email}
              helperText={errors.email}
              autoComplete='email'
            />
            <Input
              type={showPassword ? "text" : "password"}
              label="Contraseña"
              id="password"
              className="w-full dark:bg-neutral-800 rounded-lg"
              value={formData?.password}
              onChange={handleInputChange}
              error={!!errors.password}
              helperText={errors.password}
              autoComplete='current-password'
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
            <ButtonSubmit
              type="submit"
              className="w-full bg-[#A14CEB] hover:bg-[#8A3CD1] text-white"
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Iniciar sesión"}
            </ButtonSubmit>
          </form>

          <div className="mt-6 text-center space-y-2">
            <Link href="/auth/forgot-password" className="text-[#A14CEB] hover:underline text-sm">
              ¿Olvidaste tu contraseña?
            </Link>
            <p className="text-sm text-gray-600 dark:text-neutral-100">
              ¿No tienes una cuenta?{" "}
              <Link href="/register" className="text-[#A14CEB] hover:underline">
                Regístrate
              </Link>
            </p>
          </div>
        </div>
      </div>
      {showAlert && (
        <Alert
          type={alertMessage.type}
          title={alertMessage.title}
          message={alertMessage.message}
          onClose={handleClose}
        />
      )}
    </>
  )
}