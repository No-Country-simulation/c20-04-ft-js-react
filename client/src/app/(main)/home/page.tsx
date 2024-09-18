"use client"

import { RootState } from '@/redux/store'
import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import type { Post as PostType } from '@/types'
import Post from '@/components/Posts/Post'
import CreatePost from '@/components/Posts/CreatePost'
import { useGetAllPostQuery } from '@/redux/apiSlices/postApi'
import PostDetail from '@/components/Posts/PostDetail'

export default function Home() {
  const [posts, setPosts] = useState<PostType[]>([])
  const [selectedPost, setSelectedPost] = useState<PostType | null>(null) // Estado para el post seleccionado
  const user = useSelector((state: RootState) => state.userReducer.user)

  const { data, isError, isLoading } = useGetAllPostQuery({})

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
    console.log(selectedPost);
  }, [selectedPost])

  // Maneja el clic en un post
  const handlePostClick = (post: PostType) => {
    // Si el post clickeado ya está seleccionado, desmarcarlo (establecer en null)
    setSelectedPost(prevSelectedPost =>
      prevSelectedPost?._id === post._id ? null : post
    );
  }

  return (
    <Box gap={4} sx={{
      display: 'flex',
      width: '100% ',
    }}
      className='p-2 md:p-[1em]'
    >
      <Box gap={4} sx={{
        display: 'flex',
        flexDirection: 'column',
      }}>
        {user && <CreatePost addNewPost={addNewPost} />}

        <ul className='sm:space-y-5 transition-colors'>
          {posts.toReversed().map((post) => (
            <Post
              key={post._id}
              post={post}
              selected={post._id === selectedPost?._id}
              onClick={() => handlePostClick(post)}
            />
          ))}
        </ul>
      </Box>
      {selectedPost && (
        <Box sx={{ display: 'flex', flex: '1', position: 'sticky', top: 100, maxHeight: 'calc(100svh - 110px)' }} className='px-4 py-4 rounded-lg border border-neutral-300 dark:border-neutral-700'>
          <PostDetail selectedPost={selectedPost} />
        </Box>
      )}
    </Box>
  )
}
