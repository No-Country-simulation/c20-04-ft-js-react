"use client";

import ProfileSettingsBtn from "./profileComponents/ProfileSettingsBtn";
import SendNewProfileInfo from "./profileComponents/SendNewProfileInfo";
import ShowFollowersBtn from "./profileComponents/ShowFollowersBtn";
import ShowFollowingBtn from "./profileComponents/ShowFollowingBtn";
import SendMessageBtn from "./profileComponents/SendMessageBtn";
import FollowOrUnfollowBtn from "./profileComponents/FollowOrUnfollowBtn";

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


interface profileProps {
  dataUsername: string;
  paramsUsername: string;
  name: string;
  profilePicture: string;
}

export default function Profile({
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
      <div className="mt-5 w-[90%] mx-auto flex justify-between gap-[2rem] max-w-[400px] md:mx-0 md:ml-[3rem] lg:max-w-[650px]">
        {/* image and name container */}
        <div className="lg:flex gap-[1rem] relative">
          <figure className="w-20 h-20 rounded-full bg-[#000]">
            <img
              className="w-full h-full rounded-full"
              src={profilePicture}
              alt=""
            />
          </figure>
          <p className="max-w-[120px] mt-[0.8rem] overflow-hidden font-extrabold text-[1rem] lg:text-[1.8rem] lg:max-w-[220px] lg:mt-0">
            {name}
          </p>
          <p className="lg:w-[6.4rem] lg:h-[3rem] absolute bottom-[-15%] lg:left-[35%]">
            @{dataUsername}
          </p>
        </div>

        {/* her it goes the follow, following and edit profile/message part */}
        <div className="flex flex-wrap justify-center items-end gap-4 max-w-[200px] lg:flex-nowrap lg:max-w-[350px]">
          {dataUsername === localUsername ? (
            <>
              <ShowFollowersBtn />
            <ShowFollowingBtn />
            <SendNewProfileInfo editFlag={editFlag} setEditFlag={setEditFlag} />
            </>
          ) : (
            <div className="flex gap-[1rem] w-[100%]">
              <FollowOrUnfollowBtn />
              <SendMessageBtn />
            </div>
          )}
        </div>
      </div>

      {/* tercera parte del perfil: botones de redireccion o muestreo: post, pets, about */}
      {/* div para remarcar las lineas */}
      <div className="mt-[3rem] border-t-2 border-[#e2e5e9]">
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
      {/* div que renderizara los componentes dependiendo de cual se presione  */}
      <div className="mt-[2rem]">{renderSelectedComponent()}</div>
      <Box
        gap={4}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100% ',
        }}
        className='p-2 md:p-[50px]'
      >
        {renderSelectedComponent()}
      </Box>
    </div>
  );
}
