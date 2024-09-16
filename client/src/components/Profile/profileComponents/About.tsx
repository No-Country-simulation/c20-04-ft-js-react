import BirthdayIcon from "@/icons/Birthday";
import ClockIcon from "@/icons/Clock";
import HomeIcon from "@/icons/HomeIcon";
import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";

import { useGetAboutPropertiesQuery } from "@/redux/apiSlices/userQueryApi";
import { useUpdateProfileInfoMutation } from "@/redux/apiSlices/userApi";
import { useParams } from "next/navigation"
// Datos para probar


const features = [
  {
    name: 'Mis Mascotas',
    features: ['3 Perros', '2 Gatos']
  },
  {
    name: 'Experiencia',
    features: ['Adiestramiento', 'Primeros auxilios', 'Nutricion']
  },
  {
    name: 'Intereses',
    features: ['Adopcion', 'Cuidado de mascotas', 'Fotografia de mascotas']
  },
  {
    name: 'Servicios',
    features: ['Paseo de perros', 'Cuidado temporal']
  }
]

export default function About() {
  const params = useParams()
  const username: string = params.userName as string;
  const fetchData = async () => {
    try {
      const result = await updateProfileInfo(editData).unwrap();
      console.log(result);
    } catch (error) {
      console.log(error);
      // setEditFlag(false)
    }
  };

  console.log("Datos de user:", username);
  const { data, isError, isLoading } = useGetAboutPropertiesQuery(username);
  const [updateProfileInfo, { error, isSuccess }] = useUpdateProfileInfoMutation();
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState({
    address: '',
    description: ''
  });
  const handleOpen = () => {
    setEditData({
      address: data?.data?.getUserByUsername.address || '',
      description: data?.data?.getUserByUsername.description || ''
    });
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const handleSave = () => {
    // Aquí puedes hacer una mutación para guardar los datos editados
    console.log(editData);
    fetchData()
    handleClose();
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const newData = data?.data?.getUserByUsername;
  console.log("data que llega ",newData);
  
  if (isLoading) return <p>..</p>;
  if (isError) return <p>error</p>;
  const createdAt = Number(newData.createdAt);
  const date = new Date(createdAt);
  const formattedDate = isNaN(date.getTime())
    ? "Fecha no disponible"
    : new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',

    }).format(date);
  return (
    <section className="space-y-6">
      <p>{newData.description}</p>
      <div className="flex gap-x-4 border-b border-neutral-500 pb-3">
        <p className="flex items-end gap-x-2"><BirthdayIcon className="size-6" /> <span>aa</span></p>
        <p className="flex items-end gap-x-2"><HomeIcon className="size-6" /> <span>{newData.address}</span></p>
        <p className="flex items-end gap-x-2"><ClockIcon className="size-6" /> <span>{formattedDate}</span></p>
      </div>
      <div className="grid grid-cols-2 gap-y-5 gap-x-10">
        {Array.isArray(newData?.tags) && newData.tags.length > 0 ? (
          data.tags.map(tag => (
            <FeaturesAbout key={tag} name={tag} features={[tag]} />
          ))
        ) : (
          <p>No hay etiquetas disponibles.</p>
        )}
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleOpen}>
          Editar
        </button>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Editar Información</DialogTitle>
        <DialogContent>
          <TextField
            label="Dirección"
            name="address"
            value={editData.address}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Descripción"
            name="description"
            value={editData.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSave} color="primary">Guardar</Button>
        </DialogActions>
      </Dialog>
    </section>
  )
}