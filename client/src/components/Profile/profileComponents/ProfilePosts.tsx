"use client"

import React, { useEffect, useState } from 'react'
import Post from '@/components/Posts/Post'
//? mui material
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import type { Post as PostType } from '@/types'

// const itemData = [
//   {
//     img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
//     title: "Breakfast",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
//     title: "Burger",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
//     title: "Camera",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
//     title: "Coffee",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
//     title: "Hats",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
//     title: "Honey",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
//     title: "Basketball",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
//     title: "Fern",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
//     title: "Mushrooms",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
//     title: "Tomato basil",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
//     title: "Sea star",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
//     title: "Bike",
//   },
// ];

const author = {
  username: 'username',
  name: 'Nombre de Usuario'
}

const postsData = [
  {
    id: '123',
    author,
    createdAt: '2024-09-06T19:08:25.649Z',
    content:
      'Holaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    likes: 2,
    comments: 1
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
    id: '1sd.we-23',
    author: {
      name: 'Dante Dantesco Lopez',
      username: 'lopexDantez'
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
    likes: 2,
    comments: 0
  }
]


export default function ProfilePosts() {
  const [posts, setPosts] = useState<PostType[]>([])

  useEffect(() => {
    setPosts(postsData)
  }, [])

  const addNewPost = (newPost: Omit<PostType, 'comments' | 'likes' | ''>) => {
    setPosts((ps) => [...ps, { ...newPost, comments: 0, likes: 0 }])
  }

  return (
    <>
      {
        posts.map((post) => (
          <Post
            key={post.id}
            post={post}
          />
        ))
      }
      {/* <ImageList sx={{ mt: 4, maxWidth: "900px" }} cols={3}>
          {itemData.map((item) => (
            <ImageListItem
              key={item.img}
              sx={{ maxWidth: "320px" }}
              className="relative group"
            >
              <img
                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.img}`}
                alt={item.title}
                loading="lazy"
                className="rounded transition-transform duration-200 ease-in-out"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 rounded">
                <p className="text-white text-lg">{item.title}</p>
              </div>
            </ImageListItem>
          ))}
        </ImageList> */}
    </>
  )
}
