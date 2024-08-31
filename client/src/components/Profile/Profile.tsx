'use client'

interface profileProps {
  username: string;
}

export default function Profile({username}: profileProps) {
  return (
    <div className="max-w-7xl w-9/10 mx-auto">
        <div className="flex gap-4 justify-end border-b-[4px] border-b-[#334155] align-center">
        <p>@{username}</p>
        <div className="">...</div>
        {/* linea que divide la primera parte del perfil */}
      <div className="border-b-[4px] border-b-[#334155] mt-6"></div>
      </div>

      {/* segunda parte del perfil */}
    </div>
  )
}
