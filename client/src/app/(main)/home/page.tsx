'use client'
import CreatePost from '@/components/posts/CreatePost'
import Post from '@/components/posts/Post'
import { RootState } from '@/redux/store'
import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import type { Post as PostType } from '@/types'

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
    id: '1123-23p-23',
    author,
    createdAt: '2024-09-01T19:09:25.649Z',
    content: 'Hola mundo',
    image: 'https://images-ext-1.discordapp.net/external/UVfrSkwCAsBhp3vQZThNgyIWaD1oQUvXj5TD4UdEM4Q/https/1.bp.blogspot.com/-l4ENbjEoXDw/XD9PPNWIxmI/AAAAAAAAV5M/uVEboPRHjjEKvQ4KOHWpOiGwduqGVNFtACLcBGAs/s1600/statuscode.png?format=webp&quality=lossless&width=964&height=467',
    likes: 2,
    comments: 0
  },
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

export default function Home() {
  const [posts, setPosts] = useState<PostType[]>([])
  const user = useSelector((state: RootState) => state.userReducer.user)

  useEffect(() => {
    setPosts(postsData)
  }, [])

  const addNewPost = (newPost: Omit<PostType, 'comments' | 'likes' | ''>) => {
    setPosts((ps) => [...ps, { ...newPost, comments: 0, likes: 0 }])
  }

  return (
    <Box
      className='space-y-6 mx-auto max-w-screen-md'
    >
      <CreatePost addNewPost={addNewPost} />
      <ul className='sm:space-y-5 transition-colors divide-neutral-300 dark:divide-neutral-700'>
        {posts.toReversed().map((post) => (
          <Post
            key={post.id}
            post={post}
          />
        ))}
      </ul>
    </Box>
  )
}
