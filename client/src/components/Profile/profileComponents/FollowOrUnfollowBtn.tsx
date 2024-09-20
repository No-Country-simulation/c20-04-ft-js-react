import React from 'react'

//? redux
import { useAppSelector } from '@/redux/hooks'
import { useGetUserFollowersQuery } from '@/redux/apiSlices/userQueryApi'

interface props {
  dataUsername: string
}

export default function FollowOrUnfollowBtn({dataUsername}:props) {

  const localUserId = useAppSelector(state=> state.userReducer?.user?.id)
  const {data, isLoading, error} = useGetUserFollowersQuery(dataUsername)
  console.log(data)
  const newData = data?.data?.getUserByUsername?.followers
  console.log(newData)

  return (
    <button className='w-[100%] px-2 h-[2.4rem] rounded justify-self-start border border-gray-300  hover:bg-[#e2e5e9]'>Follow</button>
  )
}
