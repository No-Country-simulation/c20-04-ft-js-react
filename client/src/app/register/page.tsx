"use client";
import React, { useState } from "react";
import {
  Button,
  IconButton,
  styled,
  TextField,
  InputAdornment,
  FormControlLabel,
  FormGroup,
  Checkbox,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Link from "next/link";

export default function Register() {
  // estado del formulario de registro
  const [formState, setFormState] = useState({
    showPassword: false,
    showConfirmPassword: false,
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  // Función para manejar cambios en los inputs
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      // si es checkbox, asignamos el valor de checked, si no, el valor del input normal
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const togglePasswordVisibility = (
    field: "showPassword" | "showConfirmPassword"
  ) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleSubtmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Formulario enviado", formState);
  };

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
        <form className="space-y-4" onSubmit={handleSubtmit}>
          <Input
            label="Correo"
            variant="outlined"
            id="email"
            value={formState.email}
            onChange={handleInputChange}
            className="w-full"
          />
          <Input
            type={formState.showPassword ? "text" : "password"}
            label="Contraseña"
            id="password"
            value={formState.password}
            onChange={handleInputChange}
            className="w-full"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => togglePasswordVisibility("showPassword")}
                    edge="end"
                  >
                    {formState.showPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Input
            type={formState.showConfirmPassword ? "text" : "password"}
            label="Confirmar contraseña"
            id="confirmPassword"
            value={formState.confirmPassword}
            onChange={handleInputChange}
            className="w-full"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle confirm password visibility"
                    onClick={() =>
                      // Corregimos el id del campo a mostrar
                      togglePasswordVisibility("showConfirmPassword")
                    }
                    edge="end"
                  >
                    {formState.showConfirmPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  id="termsAccepted"
                  checked={formState.termsAccepted}
                  onChange={handleInputChange}
                />
              }
              label="Acepto los términos y condiciones"
            />
          </FormGroup>

          <ButtonSubmit
            type="submit"
            className="w-full bg-[#A14CEB] hover:bg-[#8A3CD1] text-white"
          >
            Registrarse
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
