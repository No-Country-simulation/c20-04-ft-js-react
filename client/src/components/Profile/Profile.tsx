'use client'

import ProfileSettingsBtn from "./profileComponents/ProfileSettingsBtn";
import EditProfileBtn from "./profileComponents/EditProfileBtn";
import ShowFollowersBtn from "./profileComponents/ShowFollowersBtn";
import ShowFollowingBtn from "./profileComponents/ShowFollowingBtn";
import SendMessageBtn from "./profileComponents/SendMessageBtn";

interface profileProps {
  username: string;
}

export default function Profile({username}: profileProps) {
  return (
    <div className="max-w-7xl w-9/10 mx-auto">
        <div className="flex gap-4 justify-end border-b-[4px] border-b-[#334155] align-center">
        <p>@{username}</p>
        <ProfileSettingsBtn/>
        {/* linea que divide la primera parte del perfil */}
      <div className="border-b-[4px] border-b-[#334155] mt-6"></div>
      </div>

      {/* segunda parte del perfil */}
      <div className="mt-5 w-[90%] mx-auto flex justify-between gap-[2rem] max-w-[400px]">
        {/* image and name container */}
        <div className="">
        <figure className="w-20 h-20 rounded-full bg-[#000]">
          <img className="w-full h-full rounded-full" src="" alt="" />
        </figure>
        <p className="max-w-[120px] mt-[0.8rem] overflow-hidden">Luis Manzano</p>
        </div>

        {/* her it goes the follow, following and edit profile/message part */}
        <div className="flex flex-wrap justify-center items-end gap-4 max-w-[200px]">
          <ShowFollowersBtn/>
          <ShowFollowingBtn/>
          <EditProfileBtn/>
        </div>
        
      </div>
    </div>
  )
}
