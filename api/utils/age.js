export function calculateAge(birthDate) {
    console.log("birthDate received:", birthDate); // Log del valor recibido

    // Convierte el string en Date si es necesario
    if (typeof birthDate === 'string') {
        birthDate = new Date(birthDate);
    }

    // Verifica si es un objeto Date válido
    if (!(birthDate instanceof Date) || isNaN(birthDate.getTime())) {
        throw new Error('Invalid birthDate, expected a valid Date object or string');
    }

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();

    // Ajusta la edad si aún no ha cumplido años este año
    if (today < new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate())) {
        age--;
    }

    return age;
}
