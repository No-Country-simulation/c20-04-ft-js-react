// Crea un color hexadecimal en base al nombre del usuario
function stringToColor(string: string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

export function stringAvatar(name: string = "") {
  let nameParts: string[] = [];
  
  if (name) {
    nameParts = name.toUpperCase().split(' ');
  }
  
  return {
    sx: {
      width: 45,
      height: 45,
      mr: 1,
      bgcolor: stringToColor(name)
    },
    children: nameParts.length > 1 
      ? `${nameParts[0][0]}${nameParts[1][0]}` 
      : nameParts.length === 1
      ? `${nameParts[0][0]}`
      : '', // Agregar un caso por si `nameParts` está vacío
  };
}