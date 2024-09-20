'use client'

import { RootState } from '@/redux/store'
import { Box, IconButton, useMediaQuery } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import type { Post as PostType } from '@/types'
import Post from '@/components/Posts/Post'
import CreatePost from '@/components/Posts/CreatePost'
import { useGetAllPostQuery } from '@/redux/apiSlices/postApi'
import PostDetail from '@/components/Posts/PostDetail'
import { IoCloseCircleOutline } from 'react-icons/io5'

export default function Home() {
  const [posts, setPosts] = useState<PostType[]>([])
  const [selectedPost, setSelectedPost] = useState<PostType | null>(null) // Estado para el post seleccionado
  const user = useSelector((state: RootState) => state.userReducer.user)

  const { data, isError, isLoading, refetch } = useGetAllPostQuery({})
  const onRefetch = () => {
    refetch()
  }

  useEffect(() => {
    if (!isLoading) {
      setPosts(data?.data?.getPost || [])
      console.log(data?.data?.getPost);
    }
  }, [data, isLoading])

  const addNewPost = (newPost: Omit<PostType, 'comments' | 'likes' | ''>) => {
    setPosts((ps) => [...ps, { ...newPost, comments: 0, likes: 0 }])
  }

  useEffect(() => {
    const idPostSelected = selectedPost?._id
    if (idPostSelected) {
      const post = posts.find((post) => post._id === idPostSelected)
      setSelectedPost(post || null)
    }
  }, [posts, selectedPost?._id])

  const handlePostClick = (post: PostType) => {
    setSelectedPost(prevSelectedPost =>
      prevSelectedPost?._id === post._id ? null : post
    );
  }

  const isSmallScreen = useMediaQuery('(max-width:1200px)');
  const isMediumScreen = useMediaQuery('(max-width:600px)');

  return (
    <Box gap={4} sx={{
      display: 'flex',
      width: '100%',
    }}
      className='p-2 md:p-[1em]'
    >
      <Box gap={4} sx={{
        display: 'flex',
        flexDirection: 'column',
        width: isMediumScreen ? '100%' : '50%',
      }}>
        {user && <CreatePost addNewPost={addNewPost} onRefetch={onRefetch} />}
        <ul className='space-y-5 transition-colors'>
          {posts.toReversed().map((post) => (
            <Post
              menu={true}
              key={post._id}
              post={post}
              setPost={setPosts}
              selected={post._id === selectedPost?._id}
              onClick={() => handlePostClick(post)}
            />
          ))}
        </ul>
      </Box>

      {/* Overlay */}
      {isSmallScreen && selectedPost && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro con opacidad
            zIndex: 9998, // Justo por debajo del modal
          }}
        />
      )}

      {/* Modal */}
      {selectedPost && (
        <Box
          sx={{
            display: 'flex',
            flex: '1',
            position: isSmallScreen ? 'fixed' : 'sticky',
            top: isSmallScreen ? '50%' : 100,
            left: isSmallScreen ? '50%' : 'auto',
            transform: isSmallScreen ? 'translate(-50%, -50%)' : 'none',
            width: isMediumScreen ? '90%' : 'auto',
            padding: isSmallScreen ? '1em 0 1em 0' : '0',
            maxHeight: 'calc(100svh - 110px)',
            zIndex: isSmallScreen ? 9999 : 'auto', // Asegura que esté por encima del overlay
          }}
          className='overflow-hidden bg-white dark:bg-neutral-900 rounded-lg border border-neutral-300 dark:border-neutral-700'
        >
          {/* Ícono de cerrar */}
          <IconButton
            onClick={() => setSelectedPost(null)}
            className='text-neutral-900 dark:text-white'
            sx={{
              position: 'absolute',
              top: '0',
              right: '5px',
            }}
          >
            <IoCloseCircleOutline />
          </IconButton>

          <PostDetail selectedPost={selectedPost} setPost={setPosts} />
        </Box>
      )}
    </Box>
  )
}
