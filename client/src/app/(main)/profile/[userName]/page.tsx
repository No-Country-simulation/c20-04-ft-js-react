'use client'

import Profile from "@/components/Profile/Profile";
import { useParams } from "next/navigation"

//redux 
import { useGetUserByUsernameQuery } from "@/redux/apiSlices/userApi";


export default function UserProfile() {
  const params = useParams()
  const username: string = params.userName as string;

  const {data, isError, isLoading} = useGetUserByUsernameQuery(username)
  console.log(data)
  return (
    <>
      <Profile username={data?.username} 
      name={data?.name}
      profilePicture={data?.profilePicture}
      />
    </>
  )
}