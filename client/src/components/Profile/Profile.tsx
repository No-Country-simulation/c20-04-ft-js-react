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
      <div className="mt-5 w-[90%] mx-auto">
        {/* image and name container */}
        <div>
        <figure className="w-20 h-20 rounded-full bg-[#000]">
          <img className="w-full h-full rounded-full" src="" alt="" />
        </figure>
        <p className="">name of the user</p>
        </div>

        {/* her it goes the follow, following and edit profile/message part */}
        
        
      </div>
    </div>
  )
}
