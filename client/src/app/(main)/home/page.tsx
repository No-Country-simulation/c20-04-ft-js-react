"use client"

import { RootState } from '@/redux/store'
import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import type { Post as PostType } from '@/types'
<<<<<<< HEAD
import Post from '@/components/posts/Post'
import CreatePost from '@/components/posts/CreatePost'

// tuve que pasar a use client para que funcione el useTheme y al ser un hook de mui no se puede importar
//import type { Metadata } from "next";
// export const metadata: Metadata = {
//   title: "Home",
// };

const author = {
  username: 'username',
  name: 'Nombre de Usuario'
}

const postsData = [
  {
    id: '1sd.we-23',
    author: {
      name: 'Dante Dantesco Lopez',
      username: 'lopexDantez',
      avatar: 'https://cdn.discordapp.com/avatars/935707268090056734/d1cf86141f8e36e274b445375c7f0e82.webp?size=2048'
    },
    createdAt: '2024-04-06T19:08:25.649Z',
    content: 'Los quiero admiradores..',
    likes: 2203,
    comments: 12043
  },
  {
    id: '1sd.w094e-23',
    author: {
      name: 'Dante Dantesco Lopez',
      username: 'lopexDantez',
      avatar: 'https://cdn.discordapp.com/avatars/935707268090056734/d1cf86141f8e36e274b445375c7f0e82.webp?size=2048'
    },
    createdAt: '2024-04-06T19:08:25.649Z',
    content: 'Los quiero admiradores..',
    likes: 2203,
    comments: 12043
  },
  {
    id: '1123-23p-23',
    author,
    createdAt: '2024-09-01T19:09:25.649Z',
    content: 'Hola mundo',
    image: 'https://images-ext-1.discordapp.net/external/UVfrSkwCAsBhp3vQZThNgyIWaD1oQUvXj5TD4UdEM4Q/https/1.bp.blogspot.com/-l4ENbjEoXDw/XD9PPNWIxmI/AAAAAAAAV5M/uVEboPRHjjEKvQ4KOHWpOiGwduqGVNFtACLcBGAs/s1600/statuscode.png?format=webp&quality=lossless&width=964&height=467',
    likes: 2,
    comments: 0
  },
  {
    id: '12-ds3',
    author,
    createdAt: '2024-09-04T19:03:25.649Z',
    content: 'Tengo un camello, solo lo comentaba jajaja',
    likes: 240092309,
    comments: 1209320312
  },
  {
    id: '123',
    author,
    createdAt: '2024-09-06T19:08:25.649Z',
    content:
      'Holaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    likes: 2,
    comments: 1
  }
]
=======
import Post from '@/components/Posts/Post'
import CreatePost from '@/components/Posts/CreatePost'
import { useGetAllPostQuery } from '@/redux/apiSlices/postApi'
import PostDetail from '@/components/Posts/PostDetail'
>>>>>>> 67ce73f0fb7f935fbefc74fa937f5a52dd7ea272

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
