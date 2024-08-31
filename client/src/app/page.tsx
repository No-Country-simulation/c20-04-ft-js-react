'use client'

import { useAppSelector } from '@/redux/hooks'
import { redirect } from 'next/navigation'

export default function Page() {
  const user = useAppSelector((state) => state.userReducer.user)
  console.log(user)

  if (user?.username) {
    redirect('/home')
  } else {
    redirect('/login')
  }
  return (
    <div>loading...</div>
  )
}
