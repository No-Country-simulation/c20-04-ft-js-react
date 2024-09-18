import React, { ChangeEvent, FormEvent, useState, useRef } from 'react';
import { TextField, Button, Box, Card, Typography, IconButton, Avatar, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { stringAvatar } from '@/utils/avatar';
import { useAppSelector } from '@/redux/hooks';
import { useCreatePostMutation } from '@/redux/apiSlices/authApi';
import { CloseRounded } from '@mui/icons-material';

export default function CreatePost() {
  const user = useAppSelector(state => state.userReducer.user);
  const [text, setText] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [category, setCategory] = useState('');
  const [createPost, { isLoading, isError, isSuccess, error }] = useCreatePostMutation();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setImageFile(file);
      setImagePreview(objectUrl);
    }
  };

  const handleImageRemove = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('text', text);
    formData.append('category', category);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const response = await createPost(formData).unwrap();
      console.log('Post creado con éxito:', response);
      setText('');
      setImageFile(null);
      setCategory('');
    } catch (error) {
      console.error('Error al crear el post:', error);
    }
  };

  // Estado para la vista previa de la imagen
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  return (
    <Card onSubmit={handleSubmit} component={'form'} elevation={0} className='max-w-[450px] space-y-4 p-4 rounded-lg border transition-colors border-neutral-300 dark:border-neutral-700'>
      <Box>
        <Box className='flex gap-x-2'>
          <Avatar {...stringAvatar(user?.name?.toUpperCase() || user?.username?.toUpperCase())} />
          <Box className='w-full'>
            <TextField
              label="¿Qué está haciendo tu mascota?"
              fullWidth
              sx={{ margin: 0 }}
              multiline
              rows={4}
              value={text}
              onChange={(e) => setText(e.target.value)}
              margin="normal"
              autoComplete='off'
            />
            {imagePreview && (
              <Box sx={{ overflow: "hidden", position: 'relative', display: 'inline-block', my: 2 }}>
                <Box
                  component="img"
                  src={imagePreview}
                  alt="Imagen del post"
                  sx={{ width: '150px', height: 'auto', border: '1px solid #d4d4d4', borderRadius: '8px' }}
                />
                <IconButton
                  aria-label="Eliminar imagen"
                  size="medium"
                  onClick={handleImageRemove}
                  sx={{
                    position: 'absolute',
                    top: 2,
                    right: 2,
                    padding: 0,
                  }}
                >
                  <CloseRounded htmlColor='#000' sx={{ fontSize: "20px", backgroundColor: '#fff', borderRadius: '50%' }} />
                </IconButton>
              </Box>
            )}
            <FormControl fullWidth margin="normal">
              <InputLabel id="category-label">Categoría</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                label="Categoría"
              >
                <MenuItem value="category1">Categoría 1</MenuItem>
                <MenuItem value="category2">Categoría 2</MenuItem>
                <MenuItem value="category3">Categoría 3</MenuItem>
                {/* Añade más opciones según sea necesario */}
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Box>

      <Box className='flex items-center justify-between'>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color="primary" aria-label="upload picture" component="label">
            <input
              ref={fileInputRef}
              hidden
              accept="image/*"
              type="file"
              onChange={handleImageUpload}
            />
            <PhotoCamera />
          </IconButton>
          {imageFile && (
            <Typography variant="body2" color="text.secondary">
              Imagen seleccionada
            </Typography>
          )}
        </Box>
        <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
          {isLoading ? 'Publicando...' : 'Publicar'}
        </Button>
      </Box>
    </Card>
  );
}