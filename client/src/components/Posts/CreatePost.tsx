'use client'

import React, { ChangeEvent, FormEvent, useState } from 'react';
import { TextField, Button, Box, Card, CardContent, Typography, IconButton, Avatar } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { stringAvatar } from '@/utils/avatar';
import { useAppSelector } from '@/redux/hooks';
import type { Post } from '@/types';

export default function CreatePost({ addNewPost }: { addNewPost: (newPost: Omit<Post, 'comments' | 'likes' | ''>) => void }) {
  const user = useAppSelector(state => state.userReducer.user)
  const [content, setContent] = useState('');
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    setImage(URL.createObjectURL(e.target.files?.[0]!))
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
    <Card onSubmit={handleSubmit} component={'form'} elevation={0} className='space-y-4 p-4 border transition-colors border-neutral-300 dark:border-neutral-700'>
      <Box>
        <Box className='flex gap-x-4'>
          <Avatar {...stringAvatar('User Name')} />
          <Box className='w-full p-0'>
            {/* Campo de contenido */}
            <TextField
              label="¿Qué esta haciendo tu mascota?"
              fullWidth
              multiline
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              margin="normal"
            />
          </Box>
        </Box>
        {/* Mostrar vista previa de la imagen */}
        {image && (
          <Box
            component="img"
            src={image}
            alt="Imagen del post"
            sx={{ width: '100%', height: 'auto', my: 2 }}
          />
        )}
      </Box>

      <Box className='flex items-center justify-between'>
        {/* Botón para subir imagen */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color="primary" aria-label="upload picture" component="label">
            <input hidden accept="image/*" type="file" onChange={handleImageUpload} />
            <PhotoCamera />
          </IconButton>
          {image && (
            <Typography variant="body2" color="text.secondary">
              Imagen seleccionada
            </Typography>
          )}
        </Box>
        {/* Botón de enviar */}
        <Button type="submit" variant="contained" color="primary">
          Publicar
        </Button>
      </Box>
    </Card>
  );
}