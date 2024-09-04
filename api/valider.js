// validation.js

// Expresiones regulares para la validación
const validations = {
    username: /^[a-zA-Z0-9_]{3,16}$/,  // Entre 3 y 16 caracteres, letras, números y guiones bajos
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,  // Formato de correo electrónico
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,  // Mínimo 8 caracteres, al menos una letra y un número
};

// Función para validar un campo usando una expresión regular
function validateField(fieldName, value) {
    const regex = validations[fieldName];
    if (!regex) {
        throw new Error(`No validation rule for field: ${fieldName}`);
    }
    return regex.test(value);
}

// Función para validar los datos de registro
function validateRegisterInput(input) {
    const errors = {};

    // Validar nombre de usuario
    if (!validateField('username', input.username)) {
        errors.username = 'Invalid username. Must be 3-16 characters long and contain only letters, numbers, and underscores.';
    }

    // Validar correo electrónico
    if (!validateField('email', input.email)) {
        errors.email = 'Invalid email format.';
    }

    // Validar contraseña
    if (!validateField('password', input.password)) {
        errors.password = 'Password must be at least 8 characters long, containing at least one letter and one number.';
    }

    return errors;
}

export { validateRegisterInput };
