'use client'

import Profile from "@/components/Profile/Profile";
import { useParams } from "next/navigation"


export default function UserProfile() {
  const params = useParams()
  const username: string = params.userName as string;
  console.log(username)
  return (
    <>
        <Profile username={username}/>
    </>
  )
}