'use client'
import React, { useEffect, useMemo } from 'react'

//? redux
import { useAppSelector } from '@/redux/hooks'
import { useGetUserFollowersQuery } from '@/redux/apiSlices/userQueryApi'

interface props {
  dataUsername: string
}

export default function FollowOrUnfollowBtn({dataUsername}:props) {

  const localUserId = useAppSelector((state) => state.userReducer?.user?.id); 
  const { data, isLoading, error } = useGetUserFollowersQuery(dataUsername);

  // Obtener los followers del usuario (evitamos condicionales antes de llamar hooks)
  const followers = data?.data?.getUserByUsername?.followers ?? []; // ?? returns the [] if its null or undefined

  // Verificar si el usuario local sigue al perfil actual
  const isFollowing = useMemo(() => {
    return followers.some((followerId: string) => followerId === localUserId);
  }, [followers, localUserId]);

  if (isLoading) return <button>Loading...</button>
  if (error) return <button>Error loading data</button>
  return (
    <>
    {isFollowing ? (
      <button className='w-[100%] px-2 h-[2.4rem] rounded justify-self-start border border-gray-300  hover:bg-[#e2e5e9]'>Unfollow</button>
    ): (
      <button className='w-[100%] px-2 h-[2.4rem] rounded justify-self-start border border-gray-300  hover:bg-[#e2e5e9]'>Follow</button>
    )}
    </>
  )
}
