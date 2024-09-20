import React from 'react'

interface props {
  followingsLength: number
}

export default function ShowFollowingBtn({followingsLength}: props) {

  

  return (
    <>
      <div className='flex flex-col text-center'>
        <p>{followingsLength}</p>
        <button className='rounded w-[40%] lg:h-[2.4rem]'>Following</button>
      </div>
    </>
  )
}
