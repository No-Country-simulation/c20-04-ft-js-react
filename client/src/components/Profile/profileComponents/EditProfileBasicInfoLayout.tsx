import React, {useState} from 'react'

interface propsB {
    profilePicture: string;
    username: string;
    name: string;
}

export default function EditProfileBasicInfoLayout({profilePicture, username, name}: propsB) {

    interface UpdateData {
        newPfp: string;
        newUsername: string;
        newName: string;
      }
      
      const [dataToUpdate, setDataToUpdate] = useState<UpdateData>({
        newPfp: "",
        newUsername: "", 
        newName: "",
      })

      const handleProfilePictureUpload = ()=> {
    }
    
  return (
    <div className="lg:flex gap-[1rem] relative justify-center">
    {/* Profile Picture Section */}

    <div className='flex flex-col gap-[1rem]'>
    <input
      type="file"
      accept="image/*"
      onChange={(e) => handleProfilePictureUpload()}
      className="mt-2 lg:mt-0"
    />

    <figure className="w-20 h-20 rounded-full bg-[#000]">
      <img
        className="w-full h-full rounded-full"
        src={profilePicture}
        alt="Profile Picture"
      />
    </figure>
    </div>
    
  
    {/* Name Input */}
    <input
      type="text"
      value={name}
      onChange={(e) => setDataToUpdate({...dataToUpdate, newName: e.target.value})}
      placeholder="Enter new name"
      className="max-w-[120px] mt-[0.8rem] overflow-hidden font-extrabold text-[1rem] lg:text-[1.8rem] lg:max-w-[220px] lg:mt-0"
    />
  
    {/* Username Input */}
    <input
      type="text"
      value={username}
      onChange={(e) => setDataToUpdate({...dataToUpdate, newUsername: e.target.value})}
      placeholder="Enter new username"
      className="lg:w-[6.4rem] lg:h-[3rem] absolute bottom-[-15%] lg:left-[35%] border-b-2"
    />
  </div>
  )
}
