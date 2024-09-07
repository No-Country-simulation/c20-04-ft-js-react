import React, { ChangeEvent, FormEvent, useState, useRef } from 'react';
import { TextField, Button, Box, Card, Typography, IconButton, Avatar } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { stringAvatar } from '@/utils/avatar';
import { useAppSelector } from '@/redux/hooks';
import type { Post } from '@/types';
import { CloseRounded } from '@mui/icons-material';

export default function CreatePost({ addNewPost }: { addNewPost: (newPost: Omit<Post, 'comments' | 'likes' | ''>) => void }) {
  const user = useAppSelector(state => state.userReducer.user)
  const [content, setContent] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Referencia al input de archivo

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    setImage(URL.createObjectURL(e.target.files?.[0]!));
  };

  const handleImageRemove = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Limpiar el valor del input de archivo
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const postData = {
      content,
      image,
    };

    addNewPost({
      content,
      createdAt: new Date().toString(),
      author: {
        username: 'New post',
        name: 'User Name'
      },
      id: crypto.randomUUID()
    })
    setContent('');
    setImage(null);
  };

  return (
    <Card onSubmit={handleSubmit} component={'form'} elevation={0} className='max-w-[450px] space-y-4 p-4 rounded-lg border transition-colors border-neutral-300 dark:border-neutral-700'>
      <Box>
        <Box className='flex gap-x-2'>
          <Avatar {...stringAvatar('luciano repetti'.toUpperCase())} />
          <Box className='w-full'>
            <TextField
              label="¿Qué está haciendo tu mascota?"
              fullWidth
              sx={{ margin: 0 }}
              multiline
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              margin="normal"
            />
            {image && (
              <Box sx={{ overflow: "hidden", position: 'relative', display: 'inline-block', my: 2 }}>
                <Box
                  component="img"
                  src={image}
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
          </Box>
        </Box>
      </Box>

      <Box className='flex items-center justify-between'>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color="primary" aria-label="upload picture" component="label">
            <input
              ref={fileInputRef} // Referencia al input de archivo
              hidden
              accept="image/*"
              type="file"
              onChange={handleImageUpload}
            />
            <PhotoCamera />
          </IconButton>
          {image && (
            <Typography variant="body2" color="text.secondary">
              Imagen seleccionada
            </Typography>
          )}
        </Box>
        <Button type="submit" variant="contained" color="primary">
          Publicar
        </Button>
      </Box>
    </Card>
  );
}
