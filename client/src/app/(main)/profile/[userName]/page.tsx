'use client'

import Profile from "@/components/Profile/Profile";
import About from "@/components/Profile/profileComponents/About";
import { useParams } from "next/navigation"


//redux 
import { useGetUserByUsernameQuery } from "@/redux/apiSlices/userApi";
import { useGetProfilePropertiesQuery } from "@/redux/apiSlices/userQueryApi";


export default function UserProfile() {
  const params = useParams()
  const username: string = params.userName as string;

  const { data, isError, isLoading } = useGetProfilePropertiesQuery(username)
  const newData = data?.data?.getUserByUsername
  console.log(newData)
  console.log(username);

  return (
    <>
      <Profile
        usernameObject={newData}
        dataUsername={newData?.username}
        dataId={newData?._id}
        paramsUsername={username}
        name={newData?.name || "not specified"}
        profilePicture={newData?.profile_photo}
      />
    </>
  )
}