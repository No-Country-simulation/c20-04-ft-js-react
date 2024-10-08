"use client";

import { useEffect } from "react";

import ProfileSettingsBtn from "./profileComponents/ProfileSettingsBtn";
import SendNewProfileInfo from "./profileComponents/SendNewProfileInfo";
import SendMessageBtn from "./profileComponents/SendMessageBtn";
import FollowOrUnfollowBtn from "./profileComponents/FollowOrUnfollowBtn";
import EditProfileBasicInfoLayout from "./profileComponents/EditProfileBasicInfoLayout";
import FollowingFollowersTooltip from "./profileComponents/FollowingFollowersTooltip"

import SideNavBar from "../shared/SideNavBar";
import About from "./profileComponents/About";
import Pets from "./profileComponents/Pets";
import ProfilePosts from "./profileComponents/ProfilePosts";

//icons
import { IoPawOutline } from "react-icons/io5";
import { CiCircleQuestion } from "react-icons/ci";
import { useState } from "react";

//?redux
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Box } from "@mui/material";

import { Avatar } from '@mui/material'
import { stringAvatar } from '@/utils/avatar'
import { User as UserFromBackend } from "./profileComponents/FollowingFollowersTooltip";
import Image from "next/image";

interface profileProps {
  usernameObject: UserFromBackend;
  dataUsername: string;
  paramsUsername: string;
  name: string;
  profilePicture: string;
  dataId: string
}

export default function Profile({
  usernameObject,
  dataUsername,
  paramsUsername,
  name,
  profilePicture,
  // we need this prop for follow or unfollow btn
  dataId,
}: profileProps) {
  const localUsername = useSelector(
    (state: RootState) => state.userReducer.user?.username
  );
  const localPicture = useSelector(
    (state: RootState) => state.userReducer.user?.profile_photo
  );
  const localName = useSelector(
    (state: RootState) => state.userReducer.user?.name
  );

  const [selectedComponent, setSelectedComponent] = useState<string>("posts");
  const [editFlag, setEditFlag] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"deactivate" | "report" | null>(null);

  const changeDisplayCard = (component: string) => {
    setSelectedComponent(component);
  };
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };
  const handleOpenModal = (type: "deactivate" | "report") => {
    setModalType(type);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setModalType(null);
  };
  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case "posts":
        return <ProfilePosts />;
      case "pets":
        return (
          <Pets dataUsername={dataUsername} localUsername={localUsername} />
        );
      case "about":
        return <About />;
      default:
        return null;
    }
  };



  return (
    <div className=" relative max-w-full flex-grow w-9/10 mx-auto md:w-full md:mx-0 md:max-w-[none]">
      {/* segunda parte del perfil */}
      {editFlag ? (
        <EditProfileBasicInfoLayout
          username={dataUsername}
          name={name}
          profilePicture={profilePicture}
          editFlag={editFlag}
          setEditFlag={setEditFlag}
        />
      ) : (
        <div className="flex justify-center sm:justify-between flex-wrap my-6 gap-5 pl-2 md:pl-[50px]">
          <div className="flex gap-4">
            <figure className="w-16 h-16 md:w-20 md:h-20 rounded-full">
              {localUsername === dataUsername ? (
                profilePicture ? (
                  <Image
                    className="w-full h-full rounded-full object-cover"
                    src={localPicture}
                    alt=""
                    width={100}
                    height={100}
                  />
                ) : (
                  <Avatar
                    {...stringAvatar(name?.toUpperCase() || localUsername?.toUpperCase())}
                    className="w-full h-full text-3xl"
                  />
                )
              ) : (
                profilePicture ? (
                  <Image
                    className="w-full h-full rounded-full object-cover"
                    src={profilePicture}
                    alt=""
                    width={100}
                    height={100}
                  />
                ) : (
                  <Avatar
                    {...stringAvatar(name?.toUpperCase() || localUsername?.toUpperCase())}
                    className="w-full h-full text-3xl"
                  />
                )
              )}
            </figure>
            {localUsername === dataUsername ? (
              <div className="flex flex-col gap-[.2rem]">
                <p className="mt-[0.8rem] overflow-hidden font-extrabold text-[1rem] lg:text-[1.8rem] lg:mt-0">
                  {localName || 'Enter your name'}
                </p>
                <p className="lg:w-[6.4rem] lg:h-[3rem]">
                  @{localUsername}
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-[.2rem]">
                <p className="mt-[0.8rem] overflow-hidden font-extrabold text-[1rem] lg:text-[1.8rem] lg:mt-0">
                  {name || 'not specified'}
                </p>
                <p className="lg:w-[6.4rem] lg:h-[3rem]">
                  @{dataUsername}
                </p>
              </div>
            )}
          </div>
          <div className="flex flex-col lg:w-1/2 items-center gap-4">
            <div className="flex">
              <FollowingFollowersTooltip user={usernameObject} />
            </div>
            <div className="flex gap-4">
              {dataUsername === localUsername ? (
                <SendNewProfileInfo
                  editFlag={editFlag}
                  setEditFlag={setEditFlag}
                />
              ) : (<>
                <FollowOrUnfollowBtn dataUsername={dataUsername} dataId={dataId}/>
                <SendMessageBtn/>
              </>)}
            </div>
          </div>
        </div>
      )
      }

      <div className="border-t-2 border-[#e2e5e9]">
        <div className="w-[90%] mx-auto flex justify-between lg:justify-start gap-[4rem] m-[.8rem]">
          <button
            onClick={() => changeDisplayCard("posts")}
            className="font-semibold text-[#68686c] flex gap-[.8rem] items-center justify-center rounded h-[2rem] w-[3.6rem]  hover:bg-[#e2e5e9] lg:text-[1.4rem] lg:w-[6.4rem] lg:h-[3rem]"
          >
            Posts
          </button>
          <button
            onClick={() => changeDisplayCard("pets")}
            className="flex gap-[.8rem] items-center justify-center font-semibold text-[#68686c] rounded h-[2rem] w-[3.6rem]  hover:bg-[#e2e5e9] lg:text-[1.4rem] lg:w-[6.4rem] lg:h-[3rem]"
          >
            <IoPawOutline size={20} />
            Pets
          </button>
          <button
            onClick={() => changeDisplayCard("about")}
            className="flex gap-[.8rem] items-center justify-center font-semibold text-[#68686c] rounded h-[2rem] w-[3.6rem]  hover:bg-[#e2e5e9] lg:text-[1.4rem] lg:w-[6.4rem] lg:h-[3rem]"
          >
            About
            <CiCircleQuestion size={30} />
          </button>
          <div className="relative hidden lg:block">
  <button
    onClick={toggleMenu}
    className="flex gap-2 items-center justify-center font-semibold text-[#68686c] rounded h-[2.4rem] w-[4rem] hover:bg-[#e2e5e9] lg:text-lg lg:w-[6.4rem] lg:h-[3rem] transition-colors duration-200 ease-in-out"
  >
    Help
    <CiCircleQuestion size={28} />
    {menuOpen && (
      <div className="absolute top-full right-0 mt-2 bg-[#1f2937] border border-gray-700 rounded-lg shadow-lg p-4 z-50">
        <button
          onClick={() => {
            closeMenu();
            handleOpenModal("deactivate");
          }}
          className="block text-base text-neutral-200 hover:text-[#8c52ff] mb-2 transition-colors duration-200 ease-in-out"
        >
          Delete account
        </button>
        <button
          onClick={() => {
            closeMenu();
            handleOpenModal("report");
          }}
          className="block text-base text-neutral-200 hover:text-[#8c52ff] transition-colors duration-200 ease-in-out"
        >
          Report a problem
        </button>
      </div>
    )}
  </button>
</div>

{modalOpen && (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
    <div className="bg-neutral-900 p-6 rounded-lg shadow-lg max-w-md w-full border border-[#8c52ff]">
      {modalType === "deactivate" ? (
        <>
          <h2 className="text-xl font-bold text-white">Delete account</h2>
          <p className="text-neutral-300 mt-2">
            Are you sure you want to delete your account?
          </p>
          <div className="flex justify-end gap-4 mt-6">
            <button
              className="text-neutral-400 hover:text-gray-200 transition-colors duration-200 ease-in-out"
              onClick={handleCloseModal}
            >
              Cancelar
            </button>
            <button className="text-red-500 hover:text-red-700 transition-colors duration-200 ease-in-out">
              Desactivar
            </button>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-xl font-bold text-white">Report a problem</h2>
          <p className="text-neutral-300 mt-2">
            please describe the problem in detail:
          </p>
          <textarea
            className="w-full h-24 mt-4 p-3 border border-gray-600 rounded-lg bg-neutral-800 text-neutral-200 placeholder-gray-500 focus:ring-2 focus:ring-[#8c52ff] transition duration-200 ease-in-out"
            placeholder="Describe tu problema aquí..."
          ></textarea>
          <div className="flex justify-end gap-4 mt-6">
            <button
              className="text-neutral-400 hover:text-gray-200 transition-colors duration-200 ease-in-out"
              onClick={handleCloseModal}
            >
              Cancelar
            </button>
            <button className="text-blue-500 hover:text-blue-700 transition-colors duration-200 ease-in-out">
              send report
            </button>
          </div>
        </>
      )}
    </div>
  </div>
)}

          
        </div>
      </div>
      <Box gap={4} sx={{
        display: 'flex',
        width: '100%',
      }}
        className='p-2 md:p-[1em]'
      >
        {renderSelectedComponent()}
      </Box>
    </div >
  );
}
