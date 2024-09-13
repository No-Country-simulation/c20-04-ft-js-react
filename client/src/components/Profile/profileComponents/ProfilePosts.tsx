"use client"

import React, { useEffect, useState } from 'react'
import Post from '@/components/Posts/Post'
//? mui material
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import type { Post as PostType } from '@/types'
import { useGetAllPostQuery } from '@/redux/apiSlices/postApi';

export default function ProfilePosts() {
  const [posts, setPosts] = useState<PostType[]>([])
  const { data, isError, isLoading } = useGetAllPostQuery({})

  useEffect(() => {
    if (isLoading == false) {
      console.log(data);
      setPosts(data.data.getPost)
    }
  }, [data, isLoading])

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
    </>
  )
}
