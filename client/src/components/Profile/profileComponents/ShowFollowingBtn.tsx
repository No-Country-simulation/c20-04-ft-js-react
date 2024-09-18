import React from 'react'

import { useParams } from "next/navigation"
import { useGetProfilePropertiesQuery } from "@/redux/apiSlices/userQueryApi";

export default function ShowFollowingBtn() {
  
  const params = useParams()
  const username: string = params.userName as string;
  const {data, isError, isLoading} = useGetProfilePropertiesQuery(username)
  const newData = data?.data?.getUserByUsername
  console.log(newData);
  

  return (
    <>
      <div className='flex flex-col'>
        <p>{newData?.following.length.toString()}</p>
        <button className='rounded w-[40%] lg:h-[2.4rem]'>Following</button>
      </div>
    </>
  )
}
