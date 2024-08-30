'use client'

import { redirect } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export default function Page() {
  const user = useSelector((state: RootState)=> state.userReducer.user)
  console.log(user)

  if(user?.username){
    redirect('/home')
  } else {
    redirect('/login')
  }
  return (
    <div>loading...</div>
  );
}
