import React, { useState } from "react";

import SendNewProfileInfo from "./SendNewProfileInfo";

interface propsB {
  profilePicture: string;
  username: string;
  name: string;
  editFlag: boolean;
  setEditFlag: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditProfileBasicInfoLayout({
  profilePicture,
  username,
  name,
  editFlag,
  setEditFlag,
}: propsB) {
  interface UpdateData {
    newPfp?: string;
    newUsername: string;
    newName: string;
  }

  const [dataToUpdate, setDataToUpdate] = useState<UpdateData>({
    newPfp: "",
    newUsername: "",
    newName: "",
  });

  console.log(dataToUpdate)

  const handleProfilePictureUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    const picture = files[0]
    const reader = new FileReader()
    
       reader.onloadend = ()=> {
      const base64String = reader.result as string;
      
      setDataToUpdate({
        ...dataToUpdate,
        newPfp: base64String
      })
    }

    reader.readAsDataURL(picture)
  };


  return (
    <div className="flex w-full flex-col items-center self-center justify-self-center gap-4 lg:flex-row">
      {/* Profile Picture Section */}
      <div className="relative flex flex-col gap-4">
        {/* Hidden input for profile picture upload */}
        <input
          type="file"
          accept="image/*"
          onChange={(e)=> handleProfilePictureUpload(e.target.files)}
          className="hidden"
          id="profile-picture-upload"
        />

        {/* Label that acts as visible button */}
        <label
          htmlFor="profile-picture-upload"
          className="w-20 h-20 rounded-full border-2 border-red-500 cursor-pointer flex justify-center items-center relative"
        >
          {/* Display profile picture or default upload text */}
          {profilePicture ? (
            <img
              className="w-full h-full rounded-full object-cover"
              src={profilePicture}
              alt="Profile Picture"
            />
          ) : (
            <span className="text-red-500">Upload</span>
          )}

          {/* Text overlay */}
          <span className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-sm rounded-full text-center">
            Tap here to change PFP
          </span>
        </label>
      </div>

      {/* Form Section */}
      <div className="flex flex-col gap-4 text-center lg:text-left lg:flex-row">
        {/* Name Input */}
        <div className="mb-4">
          <label htmlFor="newName" className="text-xl font-extrabold">
            Current Name: {name}
          </label>
          <input
            type="text"
            name="newName"
            value={dataToUpdate.newName}
            onChange={(e) =>
              setDataToUpdate({ ...dataToUpdate, newName: e.target.value })
            }
            placeholder="Enter new name"
            className="w-[90%] h-[60px] max-w-[320px] text-center font-extrabold text-lg border border-[#8c52ff] rounded lg:text-2xl lg:max-w-[220px]"
          />
        </div>

        {/* Username Input */}
        <div className="mb-4">
          <label htmlFor="newUsername" className="text-xl font-extrabold">
            Current Username: {username}
          </label>
          <input
            type="text"
            name="newUsername"
            value={dataToUpdate.newUsername}
            onChange={(e) =>
              setDataToUpdate({ ...dataToUpdate, newUsername: e.target.value })
            }
            placeholder="Enter new username"
            className="w-[90%] h-[60px] max-w-[320px] text-center font-extrabold text-lg border border-[#8c52ff] rounded lg:text-2xl lg:max-w-[220px]"
          />
        </div>
      </div>
      <SendNewProfileInfo editFlag={editFlag} setEditFlag={setEditFlag} />
    </div>
  );
}
