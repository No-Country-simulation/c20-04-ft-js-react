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
    newPfp: string;
    newUsername: string;
    newName: string;
  }

  const [dataToUpdate, setDataToUpdate] = useState<UpdateData>({
    newPfp: "",
    newUsername: "",
    newName: "",
  });

  const handleProfilePictureUpload = () => {};

  return (
    <div className="flex w-[100%] flex-col items-center self-center justify-self-center gap-[1rem]">
      {/* Profile Picture Section */}

      <div className="flex flex-col gap-[1rem]">
        {/* Este input será invisible pero funcional */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleProfilePictureUpload()}
          className="hidden" // Ocultamos el input
          id="profile-picture-upload"
        />

        {/* Figura que actuará como el botón visible */}
        <label
          htmlFor="profile-picture-upload" // Vinculamos la figura con el input
          className="w-20 h-20 rounded-full border-2 border-red-500 cursor-pointer flex justify-center items-center"
          style={{ backgroundColor: "transparent" }}
        >
          {/* Imagen o ícono por defecto */}
          {profilePicture ? (
            <img
              className="w-full h-full rounded-full object-cover"
              src={profilePicture}
              alt="Profile Picture"
            />
          ) : (
            <span className="text-red-500">Upload</span> // Texto o ícono alternativo si no hay imagen
          )}
        </label>
      </div>

      <div className="text-center">
        <div className="mb-[1.2rem]">
          <label htmlFor="newName" className="text-[1.2rem] font-extrabold">
            Current name: {name}
          </label>
          <input
            type="text"
            name="newName"
            value={dataToUpdate.newName}
            onChange={(e) =>
              setDataToUpdate({ ...dataToUpdate, newName: e.target.value })
            }
            placeholder="Enter new name"
            className="w-[90%]  h-[60px] max-w-[320px] text-center  overflow-hidden font-extrabold text-[1rem] lg:text-[1.8rem] lg:max-w-[220px] lg:mt-0 border border-[#8c52ff] rounded"
          />
        </div>

        {/* Username Input */}
        <div>
          <label htmlFor="newUsername" className="text-[1.2rem] font-extrabold">
            Current username: {username}
          </label>
          <input
            type="text"
            name="newUsername"
            value={username}
            onChange={(e) =>
              setDataToUpdate({ ...dataToUpdate, newUsername: e.target.value })
            }
            placeholder="Enter new username"
            className="lg:w-[6.4rem] lg:h-[3rem] text-center border border-[#8c52ff] rounded w-[90%] h-[60px] max-w-[320px]"
          />
        </div>
      </div>

      <SendNewProfileInfo editFlag={editFlag} setEditFlag={setEditFlag} />
    </div>
  );
}
