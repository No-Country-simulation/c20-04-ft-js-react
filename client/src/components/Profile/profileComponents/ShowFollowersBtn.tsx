import React from 'react'

interface props {
  followersLength: number
  followers: string[]
}

export default function ShowFollowersBtn({followersLength, followers}: props) {
  

  return (
    <>
      <div className='flex flex-col text-center'>
        <p>{followersLength}</p>
        <button className='rounded w-[40%] lg:h-[2.4rem] text-center'>Followers</button>
      </div>
    </>
  )
}
