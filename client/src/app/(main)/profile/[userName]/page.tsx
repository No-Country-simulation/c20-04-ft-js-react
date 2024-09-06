'use client'

import Profile from "@/components/Profile/Profile";
import { useParams } from "next/navigation"

//redux 
import { useGetUserByUsernameQuery } from "@/redux/apiSlices/userApi";
import { useGetProfilePropertiesQuery } from "@/redux/apiSlices/userQueryApi";


export default function UserProfile() {
  const params = useParams()
  const username: string = params.userName as string;

  const {data, isError, isLoading} = useGetProfilePropertiesQuery(username)
  const newData = data?.data?.getUserByUsername
  console.log(newData)
  return (
    <>
      <Profile dataUsername={newData?.username} 
      paramsUsername={username}
      name={newData?.name || "not specified"}
      profilePicture={newData?.profile_photo}
      />
    </>
  )
}