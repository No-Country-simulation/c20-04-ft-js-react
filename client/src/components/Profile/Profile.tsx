'use client'

interface profileProps {
  username: string;
}

export default function Profile({username}: profileProps) {
  return (
    <div>welcome to your profile user {username}</div>
  )
}
