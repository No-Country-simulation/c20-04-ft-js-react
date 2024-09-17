"use client";

import ProfileSettingsBtn from "./profileComponents/ProfileSettingsBtn";
import SendNewProfileInfo from "./profileComponents/SendNewProfileInfo";
import ShowFollowersBtn from "./profileComponents/ShowFollowersBtn";
import ShowFollowingBtn from "./profileComponents/ShowFollowingBtn";
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

//reduc
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
}

export default function Profile({
  usernameObject,
  dataUsername,
  paramsUsername,
  name,
  profilePicture,
}: profileProps) {
  const localUsername = useSelector(
    (state: RootState) => state.userReducer.user?.username
  );

  const [selectedComponent, setSelectedComponent] = useState<string>("posts");
  const [editFlag, setEditFlag] = useState<boolean>(false);

  const changeDisplayCard = (component: string) => {
    setSelectedComponent(component);
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
        <div className="flex justify-center sm:justify-between flex-wrap my-6 gap-4 pl-2 md:pl-[50px]">
          <div className="flex gap-4">
            <figure className="w-16 h-16 md:w-20 md:h-20 rounded-full">
              {profilePicture ? <Image
                className="w-full h-full rounded-full object-cover"
                src={profilePicture}
                alt=""
                width={100}
                height={100}

              /> : <Avatar {...stringAvatar(name?.toUpperCase() || localUsername?.toUpperCase())} className='w-full h-full text-3xl' />}
            </figure>
            <div className="flex flex-col gap-[.2rem]">
              <p className="mt-[0.8rem] overflow-hidden font-extrabold text-[1rem] lg:text-[1.8rem] lg:mt-0">
                {name}
              </p>
              <p className="lg:w-[6.4rem] lg:h-[3rem]">
                @{dataUsername}
              </p>
            </div>
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
                <FollowOrUnfollowBtn />
                <SendMessageBtn />
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
          <div className="items-center gap-[.8rem] justify-center font-semibold text-[#68686c] rounded hidden lg:text-[1.4rem] lg:flex lg:cursor-pointer hover:bg-[#e2e5e9] lg:w-[6.4rem] lg:h-[3rem]">
            Help
            <ProfileSettingsBtn />
          </div>
        </div>
      </div>
      <Box
        gap={4}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100% ",
        }}
        className="p-2 md:p-[30px]"
      >
        {renderSelectedComponent()}
      </Box>
    </div >
  );
}
