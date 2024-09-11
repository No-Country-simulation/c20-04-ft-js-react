"use client";
import React, { ChangeEvent, useState } from "react";
import {
  Button,
  IconButton,
  styled,
  TextField,
  InputAdornment,
  FormControlLabel,
  FormGroup,
  Checkbox,
  FormHelperText,
  FormControl,
  CircularProgress,
  Box,
} from "@mui/material";
import { Height, Visibility, VisibilityOff } from "@mui/icons-material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Link from "next/link";

//redux
import { useRegisterMutation } from "@/redux/apiSlices/authApi";
import { setUser } from "@/redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { useRouter } from 'next/navigation'
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import Alert from "@/components/shared/Alert";
import { title } from "process";

// Definimos la interfaz para los datos del formulario
interface FormDataInterface {
  email: string;
  password: string;
  username: string;
  birthdate: any;
}

// Definimos la interfaz para los mensajes de error
interface ErrorFormInterface {
  email: string;
  password: string;
  username: string;
  birthdate: string;
  terms: string;
}

interface DataAlertInterface {
  type: 'info' | 'danger' | 'success' | 'warning' | 'dark';
  message: string;
  title: string;
}

const Input = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    height: "50px",
    borderRadius: "8px",
  },
  "& .MuiInputLabel-root": {
    top: "2px",
    transform: "translate(16px, 50%)",
    transition: "all 0.2s ease",
  },
  "& .MuiInputLabel-shrink": {
    top: "3px",
    transform: "translate(16px, -50%) scale(0.75)",
  },
}));

const ButtonSubmit = styled(Button)(({ theme }) => ({
  textTransform: "none",
}));

const CustomDataPicker = styled(DatePicker)(({ theme }) => ({
  "& .MuiInputBase-root": {
    width: "100%",
    height: "50px",
    borderRadius: "8px",
  },
  "& .MuiInputLabel-root": {
    top: "2px",
    transform: "translate(16px, 50%)",
    transition: "all 0.2s ease",
  },
  "& .MuiInputLabel-shrink": {
    top: "3px",
    transform: "translate(16px, -50%) scale(0.75)",
  },
}));

export default function Register() {
  const dispatch = useDispatch();
  const router = useRouter()

  // Definimos los estados necesarios
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState<DataAlertInterface>({
    type: "success",
    message: "Registro exitoso",
    title: "Éxito"
  });
  const [formData, setFormData] = useState<FormDataInterface>({
    email: "",
    username: "",
    password: "",
    birthdate: null
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<Partial<ErrorFormInterface>>({});
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);

  // Hook para la mutación de registro
  const [register, { isLoading, isSuccess, error }] = useRegisterMutation();

  const today = dayjs();
  const maxDate = today.subtract(16, 'year');

  const handleClose = () => {
    setShowAlert(false);
  };

  // Manejador para mostrar/ocultar contraseña
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // Manejador para cambios en los campos de entrada
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    setErrors((prevState) => ({
      ...prevState,
      [id]: "",
    }));
  };

  // Manejador para cambios en el DatePicker
  const handleDateChange = (newDate: Dayjs | null) => {
    setFormData((prevState) => ({
      ...prevState,
      birthdate: newDate,
    }));
    setErrors((prevState) => ({
      ...prevState,
      birthdate: "",
    }));
  };

  // Manejador para el envío del formulario
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newErrors: Partial<ErrorFormInterface> = {};

    // Validación del correo
    if (!formData.email) {
      newErrors.email = "El correo electrónico es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El correo electrónico no es válido";
    }

    // Validación de la contraseña
    if (!formData.password) {
      newErrors.password = "La contraseña es obligatoria";
    } else if (formData.password.length < 9) {
      newErrors.password = "La contraseña debe tener al menos 9 caracteres";
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = "La contraseña debe tener al menos una mayúscula";
    }

    // Validación del nombre de usuario
    if (!formData.username) {
      newErrors.username = "El nombre de usuario es obligatorio";
    } else if (formData.username.length < 4) {
      newErrors.username = "El nombre de usuario debe tener al menos 4 caracteres";
    }

    // Validación de la fecha de nacimiento
    if (!formData.birthdate) {
      newErrors.birthdate = "La fecha de nacimiento es obligatoria";
    }

    // Validamos que se haya aceptado los términos y condiciones
    if (!termsAccepted) {
      newErrors.terms = "Debes aceptar los términos y condiciones";
    }

    // Verificamos si hay errores
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Convertimos la fecha a formato ISO si existe
    let formattedDate: string | null = null;
    if (formData.birthdate) {
      if (dayjs.isDayjs(formData.birthdate)) {
        formattedDate = formData.birthdate.toISOString();
      } else {
        // Si `formData.birthdate` es una cadena, podemos asignarla directamente
        formattedDate = formData.birthdate;
      }
    }

    // Creamos una copia de los datos del formulario con la fecha formateada
    const dataToSend: FormDataInterface = {
      ...formData,
      birthdate: formattedDate, // Enviamos la fecha en formato ISO
    };

    // Llamamos a la función de registro
    postRegister(dataToSend);
  };

  // Función asíncrona para registrar al usuario
  const postRegister = async (dataForm: FormDataInterface) => {
    try {
      const response = await register(dataForm).unwrap();

      // Verificar la respuesta de la API
      if (response.code === 201 && response.status === "success") {
        dispatch(setUser(response.data));
        router.push('/home');
      }
    } catch (err: any) {
      console.log(err);
      if (err?.status === 409) {
        setAlertMessage({
          type: "danger",
          message: err.data.message,
          title: "Error:"
        });
        setShowAlert(true);
      }
      // setAlertMessage({
      //   type: "danger",
      //   message: "al registrarse. Intenta nuevamente.",
      //   title: "Error"
      // });
      // setShowAlert(true);
    }
  };

  return (
    <>
      <div className="bg-[#CEC5FD] dark:bg-[#674cf0] min-h-screen flex items-center justify-center p-4">
        <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-md max-w-md w-full p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-neutral-100">
              Bienvenido a la comunidad Pawpal
            </h2>
            <p className="text-sm text-gray-600 dark:text-neutral-200 mt-2">
              Registrate para compartir tus mascotas!
            </p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              type="text"
              label="Nombre de usuario"
              variant="outlined"
              id="username"
              value={formData?.username}
              onChange={handleInputChange}
              className="w-full dark:bg-neutral-800 rounded-lg"
              error={!!errors.username}
              helperText={errors.username}
              autoComplete="username"
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <CustomDataPicker
                label="Fecha de nacimiento"
                value={formData?.birthdate} // Enlazamos la fecha seleccionada al estado
                onChange={handleDateChange} // Manejamos el cambio de fecha
                maxDate={maxDate} // Restringimos la selección de fechas a mayores de 16 años
                format="DD/MM/YYYY"
                className="w-full dark:bg-neutral-800 rounded-lg"
                slotProps={{
                  textField: {
                    error: !!errors.birthdate,
                    helperText: errors.birthdate,
                  },
                }}
              />
            </LocalizationProvider>
            <Input
              type="email"
              label="Correo electrónico"
              variant="outlined"
              id="email"
              value={formData?.email}
              onChange={handleInputChange}
              className="w-full dark:bg-neutral-800 rounded-lg"
              error={!!errors.email}
              helperText={errors.email}
              autoComplete="email"
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
              autoComplete="new-password"
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
            <FormControl error={!!errors.terms} component="fieldset">
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      id="termsAccepted"
                      checked={termsAccepted}
                      onChange={() => setTermsAccepted(!termsAccepted)}
                    />
                  }
                  label="Acepto los términos y condiciones"
                />
              </FormGroup>
              {errors.terms && <FormHelperText>{errors.terms}</FormHelperText>}
            </FormControl>

            <ButtonSubmit
              type="submit"
              className="w-full bg-[#A14CEB] hover:bg-[#8A3CD1] text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : (
                "Registrarse"
              )}
            </ButtonSubmit>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-neutral-100">
                ¿Ya tienes una cuenta?
                <Link href="/login" className="text-[#A14CEB] ml-1">
                  Iniciar sesión
                </Link>
              </p>
            </div>
          </form>
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
  );
}
