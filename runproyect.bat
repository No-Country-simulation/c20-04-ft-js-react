@echo off

:: Navegar a la carpeta api y ejecutar npm run dev
cd api
echo Iniciando servidor de la API...
start cmd /k "npm run dev"

:: Regresar al directorio anterior y luego entrar en client
cd ..
cd client
echo Iniciando servidor del cliente...
start cmd /k "npm run dev"

:: Mantener la ventana abierta
pause