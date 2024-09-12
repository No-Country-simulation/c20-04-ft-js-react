import React, { useEffect, useState } from "react";

import SendNewProfileInfo from "./SendNewProfileInfo";

//redux
import { useDispatch, useSelector} from "react-redux";
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
    newPfp?: string;
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
    newPfp: "",
    newUsername: "",
    newName: "",
  });

  const [prevPicture, setPrevPicture] = useState<string>(profilePicture)
  const localPfp = useSelector((state: RootState) => state.userReducer.user?.profile_photo);

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
      dispatch(setPreviewProfilePicture(base64String))
    }

    reader.readAsDataURL(picture)
  };

  const onClose = ()=> {
    dispatch(setPreviewProfilePicture(prevPicture))
    setEditFlag(false)
  }


  const validateForm = () => {
    if (dataToUpdate.newName !== "" && (dataToUpdate.newName.length < 3 || dataToUpdate.newName.length > 10)) {
      setErrorForm({
        ...errorForm,
        newName: "Name should contain at least 3 characters and a maximum of 10"
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
    <div className="flex w-full flex-col mt-[1rem] items-center self-center justify-self-center gap-4 lg:flex-row">
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
          {localPfp ? (
            <img
              className="w-full h-full rounded-full object-cover"
              src={localPfp}
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
          <p>{errorForm.newName}</p>
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
              setDataToUpdate({ ...dataToUpdate, newUsername: e.target.value.trim() })
            }
            placeholder="Enter new username"
            className="w-[90%] h-[60px] max-w-[320px] text-center font-extrabold text-lg border border-[#8c52ff] rounded lg:text-2xl lg:max-w-[220px]"
          />
          <p>{errorForm.newUsername}</p>
        </div>
      </div>
      <div className="flex justify-center gap-[1rem] w-[90%] mx-auto">
      <button className='w-[100%] h-[2.4rem] rounded max-w-[6rem] justify-self-start lg:min-w-[100px] border border-gray-300  hover:bg-[#e2e5e9]'
      onClick={onClose}
      >X</button>
      <SendNewProfileInfo editFlag={editFlag} setEditFlag={setEditFlag} dataToUpdate={dataToUpdate} isFormValid={isFormInvalid}/>

      </div>
      
    </div>
  );
}
