import React, { useState } from 'react'

// redux 
import { useUpdateProfileInfoMutation } from '@/redux/apiSlices/userApi';

interface updateData {
  newPfp?: string;
  newUsername: string;
  newName: string
}

interface sendButtonProps {
  editFlag: boolean;
  setEditFlag: React.Dispatch<React.SetStateAction<boolean>>;
  dataToUpdate: updateData
  isFormValid: ()=> boolean;
}

export default function SendNewProfileInfo({editFlag, setEditFlag, dataToUpdate, isFormValid}: sendButtonProps) {

  const [ updateProfileInfo, {isLoading, error}] = useUpdateProfileInfoMutation()

  const handleConfirm = (dataToUpdate: updateData)=> {
    const dataToSend = verifyData(dataToUpdate)
    console.log(dataToSend)
    
    setEditFlag(false)
  }

  const verifyData = (data: Record<string, any>) => {
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([key, value]) => value !== "" && value !== null && value !== undefined)
    );
  
    return filteredData;
  };

  return (
    <>
    {editFlag ? (
      <button className={`w-full h-[2.4rem] rounded max-w-[6rem] justify-self-start lg:min-w-[100px] border ${isFormValid() ? 'bg-gray-400 text-gray-600' : "bg-blue-500 text-white"}`}
      onClick={()=> handleConfirm(dataToUpdate)}
      disabled={isFormValid()}
      >Confirm</button>
    ) : (
      <button className='w-[100%] h-[2.4rem] rounded max-w-[6rem] justify-self-start lg:min-w-[100px] border border-gray-300  hover:bg-[#e2e5e9]'
      onClick={() => setEditFlag(true)}
      >Edit Profile</button>
    )}
    </>
  )
}
