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
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Link from "next/link";

//redux
import { useRegisterMutation } from "@/redux/apiSlices/authApi";
import { setUser } from "@/redux/slices/userSlice";
import { useDispatch } from "react-redux";

// Definimos la interfaz para los datos del formulario
interface FormDataInterface {
  email: string;
  password: string;
  username: string;
}

// Definimos la interfaz para los mensajes de error
interface ErrorFormInterface {
  email: string;
  password: string;
  username: string;
  terms: string;
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

export default function Register() {
  const dispatch = useDispatch();

  // Definimos los estados necesarios
  const [formData, setFormData] = useState<FormDataInterface>({
    email: "",
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<Partial<ErrorFormInterface>>({});
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);

  // Hook para la mutación de registro
  const [register, { isLoading, isSuccess, error }] = useRegisterMutation();

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
    }
    // Validacion contraseña al menos una mayuscula
    else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = "La contraseña debe tener al menos una mayúscula";
    }

    // Validación del nombre de usuario
    if (!formData.username) {
      newErrors.username = "El nombre de usuario es obligatorio";
    } else if (formData.username.length < 4) {
      newErrors.username =
        "El nombre de usuario debe tener al menos 4 caracteres";
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

    // Llamamos a la función de registro
    postRegister(formData);
  };

  // Función asíncrona para registrar al usuario
  const postRegister = async (dataForm: FormDataInterface) => {
    try {
      const response = await register(dataForm).unwrap();
      console.log("Usuario registrado:", response);
      dispatch(setUser(response));
    } catch (err) {
      console.error("Error al registrarse:", err);
    }
  };

  return (
    <div className="bg-[#CEC5FD] min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md max-w-md w-full p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Bienvenido a la comunidad Pawpal
          </h2>
          <p className="text-sm text-gray-600 mt-2">
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
            className="w-full"
            error={!!errors.username}
            helperText={errors.username}
          />
          <Input
            type="email"
            label="Correo electrónico"
            variant="outlined"
            id="email"
            value={formData?.email}
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
            value={formData?.password}
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
            <p className="text-sm text-gray-600">
              ¿Ya tienes una cuenta?
              <Link href="/login" className="text-[#A14CEB] ml-1">
                Iniciar sesión
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
