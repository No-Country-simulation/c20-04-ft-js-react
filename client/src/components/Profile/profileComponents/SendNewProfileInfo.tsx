import React, { useState } from 'react'

// redux 
import { useUpdateProfileInfoMutation } from '@/redux/apiSlices/userApi';

interface sendButtonProps {
  editFlag: boolean;
  setEditFlag: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SendNewProfileInfo({editFlag, setEditFlag}: sendButtonProps) {

  return (
    <>
    {editFlag ? (
      <button className='w-[100%] h-[2.4rem] rounded max-w-[6rem] justify-self-start lg:min-w-[100px] border border-gray-300  hover:bg-[#e2e5e9]'
      onClick={() => setEditFlag(false)}
      >Confirm</button>
    ) : (
      <button className='w-[100%] h-[2.4rem] rounded max-w-[6rem] justify-self-start lg:min-w-[100px] border border-gray-300  hover:bg-[#e2e5e9]'
      onClick={() => setEditFlag(true)}
      >Edit Profile</button>
    )}
    </>
  )
}
