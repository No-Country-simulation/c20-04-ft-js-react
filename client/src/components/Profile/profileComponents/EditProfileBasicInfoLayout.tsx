import React, { useEffect, useState } from "react";

import SendNewProfileInfo from "./SendNewProfileInfo";

//redux
import { useDispatch, useSelector } from "react-redux";
import { setPreviewProfilePicture } from "@/redux/slices/userSlice";
import { RootState } from "@/redux/store";

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

  const dispatch = useDispatch()

  interface UpdateData {
    newPfp?: File | null;
    previewUrl: string
    newUsername: string;
    newName: string;
  }

  interface errors {
    newUsername: string
    newName: string
  }

  const [errorForm, setErrorForm] = useState<errors>({
    newUsername: "",
    newName: ""
  })

  const [dataToUpdate, setDataToUpdate] = useState<UpdateData>({
    newPfp: null as File | null,
    previewUrl: "",
    newUsername: "",
    newName: "",
  });

  const [prevPicture, setPrevPicture] = useState<string>(profilePicture)
  const localPfp = useSelector((state: RootState) => state.userReducer.user?.profile_photo);

  const handleProfilePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if(file){
      const previewUrl = URL.createObjectURL(file)
      setDataToUpdate({...dataToUpdate, newPfp: file,})
      dispatch(setPreviewProfilePicture(previewUrl))
    }
  };

  const onClose = () => {
    dispatch(setPreviewProfilePicture(prevPicture))
    setEditFlag(false)
  }


  const validateForm = () => {
    if (dataToUpdate.newName !== "" && (dataToUpdate.newName.trim().length < 3 || dataToUpdate.newName.length > 20)) {
      setErrorForm({
        ...errorForm,
        newName: "Name should contain at least 3 characters and a maximum of 20"
      });
    } else {
      setErrorForm((prev) => ({ ...prev, newName: "" }));
    }

    if (dataToUpdate.newUsername !== "" && (dataToUpdate.newUsername.length < 3 || dataToUpdate.newUsername.length > 10)) {
      setErrorForm({
        ...errorForm,
        newUsername: "Username should contain at least 3 characters and a maximum of 10"
      });
    } else {
      setErrorForm((prev) => ({ ...prev, newUsername: "" }));
    }
  };

  const isFormInvalid = () => {
    return errorForm.newName !== "" || errorForm.newUsername !== "";
  };

  useEffect(() => {
    validateForm();
  }, [dataToUpdate.newName, dataToUpdate.newUsername]);



  return (
    <div className="flex w-full flex-col mt-[1rem] items-center justify-center gap-6 p-6 bg-[#f8f9fa] rounded-lg shadow-md">
  {/* Profile Picture Section */}
  <div className="relative flex flex-col gap-4 items-center">
    {/* Hidden input for profile picture upload */}
    <input
      type="file"
      accept="image/*"
      onChange={handleProfilePictureUpload}
      className="hidden"
      name="newPfp"
      id="profile-picture-upload"
    />

    {/* Label that acts as visible button */}
    <label
      htmlFor="profile-picture-upload"
      className="w-24 h-24 rounded-full border-4 border-[#8c52ff] cursor-pointer flex justify-center items-center relative bg-[#e2e5e9] hover:bg-[#8c52ff] transition-all duration-300"
    >
      {/* Display profile picture or default upload text */}
      {localPfp ? (
        <img
          className="w-full h-full rounded-full object-cover"
          src={localPfp}
          alt="Profile Picture"
        />
      ) : (
        <span className="text-[#8c52ff] font-bold">Upload</span>
      )}

      {/* Text overlay */}
      <span className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-sm rounded-full text-center transition-opacity duration-300 opacity-0 hover:opacity-100">
        Tap to change
      </span>
    </label>
  </div>

  {/* Form Section */}
  <div className="flex flex-col gap-6 text-center lg:text-left lg:flex-row w-full justify-around items-center">
    {/* Name Input */}
    <div className="flex flex-col items-center">
      <label htmlFor="newName" className="text-lg font-extrabold text-[#8c52ff] mb-2">
        Your name: {name}
      </label>
      <input
        type="text"
        name="newName"
        value={dataToUpdate.newName}
        onChange={(e) =>
          setDataToUpdate({ ...dataToUpdate, newName: e.target.value })
        }
        placeholder="Enter your new name"
        className="w-[90%] h-[50px] max-w-[300px] text-center font-semibold text-lg border border-[#8c52ff] rounded-lg bg-white placeholder-gray-500 focus:ring-[#8c52ff] focus:border-[#8c52ff] lg:text-xl lg:max-w-[220px]"
      />
      <p className="text-red-500">{errorForm.newName}</p>
    </div>

    {/* Username Input */}
    <div className="flex flex-col items-center">
      <label htmlFor="newUsername" className="text-lg text-center font-extrabold text-[#8c52ff] mb-2">
        Username: {username}
      </label>
      <input
        type="text"
        name="newUsername"
        value={dataToUpdate.newUsername}
        onChange={(e) =>
          setDataToUpdate({ ...dataToUpdate, newUsername: e.target.value.trim() })
        }
        placeholder="Enter your pet-friendly username"
        className="w-[90%] h-[50px] max-w-[320px] text-center font-semibold text-lg border border-[#8c52ff] rounded-lg bg-white placeholder-gray-500 focus:ring-[#8c52ff] focus:border-[#8c52ff] lg:text-xl lg:max-w-[220px]"
      />
      <p className="text-red-500">{errorForm.newUsername}</p>
    </div>
  </div>

  {/* Buttons Section */}
  <div className="flex justify-center gap-[1rem] w-[90%] mx-auto mt-4 lg:max-w-[200px]">
    <button className='w-[100%] h-[40px] rounded max-w-[6rem] justify-self-start lg:min-w-[100px] border border-gray-300 text-gray-700 hover:bg-[#e2e5e9] transition-all duration-200'
      onClick={onClose}
    >Cancel</button>
    
    <SendNewProfileInfo
      editFlag={editFlag}
      setEditFlag={setEditFlag}
      dataToUpdate={dataToUpdate}
      isFormValid={isFormInvalid}
      className="w-[100%] h-[40px] bg-[#8c52ff] text-white rounded max-w-[6rem] justify-self-start lg:min-w-[100px] hover:bg-[#732fdb] transition-all duration-200"
    >
      Save
    </SendNewProfileInfo>
  </div>
</div>
  );
}
