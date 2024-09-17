"use client"

import React, { useEffect, useState } from 'react'
import Post from '@/components/Posts/Post'
//? mui material
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import type { Post as PostType } from '@/types'
import { useGetAllPostByUsernameQuery } from '@/redux/apiSlices/postApi';
import { useParams } from 'next/navigation';
import { Box, CircularProgress } from '@mui/material';

export default function ProfilePosts() {
  const [posts, setPosts] = useState<PostType[]>([])
  const params = useParams()
  const username: string = params.userName as string;

  const { data, isError, isLoading } = useGetAllPostByUsernameQuery(username)

  useEffect(() => {
    if (!isLoading && data) {
      console.log(data); // Verifica la estructura de data
      const fetchedPosts = data.data?.getAllPostByUsername || [];
      setPosts(fetchedPosts);
    }
  }, [data, isLoading]);

  const addNewPost = (newPost: Omit<PostType, 'comments' | 'likes' | ''>) => {
    setPosts((ps) => [...ps, { ...newPost, comments: 0, likes: 0 }])
  }

  return (
    <>
      {isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          position="fixed"
          top="0"
          left="0"
          width="100%"
          height="100%"
          bgcolor="background.paper" // Fondo blanco para el contenedor de carga
          zIndex="tooltip"
        >
          <CircularProgress />
        </Box>
      ) : (
        posts.length > 0 ? (
          posts.toReversed().map((post) => (
            <Post
              key={post.id}
              post={post}
            />
          ))
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <p className="mb-[1rem] font-extrabold text-[1rem] lg:text-[1.4rem]">
              No hay publicaciones disponibles.
            </p>
          </Box>
        )
      )}
    </>
  )
}