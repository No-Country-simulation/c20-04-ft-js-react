import React, { useEffect, useState } from "react";

// redux
import { useUpdateProfileInfoMutation } from "@/redux/apiSlices/userApi";

interface updateData {
  newPfp?: string;
  newUsername: string;
  newName: string;
}

interface sendButtonProps {
  editFlag: boolean;
  setEditFlag: React.Dispatch<React.SetStateAction<boolean>>;
  dataToUpdate: updateData;
  isFormValid: () => boolean;
}


export default function SendNewProfileInfo({
  editFlag,
  setEditFlag,
  dataToUpdate,
  isFormValid,
}: sendButtonProps) {
  const [updateProfileInfo, { isLoading, error, isError, isSuccess }] = useUpdateProfileInfoMutation();
  const [showError, setShowError] = useState<boolean>(false)

  useEffect(() => {

    if (isError) {

      setShowError(true)

      setTimeout(() => {
        setShowError(false)
      }, 3000)

    }

  }, [isError])


  const handleConfirm = ({
    newUsername: username,
    newName: name,
    newPfp: profile_photo,
  }: updateData) => {
    const dataToSend = verifyData({ username, name, profile_photo });

    if (Object.keys(dataToSend).length === 0) {
      return setEditFlag(false);
    }

    const fetchData = async () => {
      try {
        const result = await updateProfileInfo(dataToSend).unwrap();
        console.log(result);
        setEditFlag(false);
      } catch (error) {
        console.log(error);
        // setEditFlag(false)
      }
    };
    fetchData();
    console.log(dataToSend);
  };

  const verifyData = (data: Record<string, any>) => {
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(
        ([key, value]) => value !== "" && value !== null && value !== undefined
      )
    );

    return filteredData;
  };

  return (
    <>
      {editFlag ? (
        <>
          <button
            className={`w-full h-[2.4rem] rounded max-w-[6rem] justify-self-start lg:min-w-[100px] border ${isFormValid()
              ? "bg-gray-400 text-gray-600"
              : "bg-blue-500 text-white hover:bg-blue-700"
              }`}
            onClick={() => handleConfirm(dataToUpdate)}
            disabled={isFormValid()}
          >
            {isLoading ? "loading" : "confirm"}
          </button>

          {showError && (
            <div
              className="flex flex-col text-red-500 mt-2 bg-[white] text-center absolute bottom-[35%]  w-[220px] max-w-[max-content] h-[70px] border-2 border-purple-700 rounded flex items-center justify-center lg:bottom-[-70%] lg:left-[30%]"

            >
              <p className="pt-[.4rem]">Error:</p>
              <p className="m-[.6rem]">{error?.data.message || "Something went wrong!"}</p>
            </div>
          )}
        </>
      ) : (
        <button
          className="w-[100%] px-2 h-[2.4rem] rounded justify-self-start border border-gray-300  hover:bg-[#e2e5e9]"
          onClick={() => setEditFlag(true)}
        >
          Edit Profile
        </button>
      )}
    </>
  );
}
