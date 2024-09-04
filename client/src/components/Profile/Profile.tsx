"use client";

import ProfileSettingsBtn from "./profileComponents/ProfileSettingsBtn";
import EditProfileBtn from "./profileComponents/EditProfileBtn";
import ShowFollowersBtn from "./profileComponents/ShowFollowersBtn";
import ShowFollowingBtn from "./profileComponents/ShowFollowingBtn";
import SendMessageBtn from "./profileComponents/SendMessageBtn";

import SideNavBar from "../shared/SideNavBar";

//? mui material
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";


interface profileProps {
  username: string;
  name: string;
  profilePicture: string;
}

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
  },
];

export default function Profile({
  username,
  name,
  profilePicture,
}: profileProps) {
  return (
    <div className="flex">
      <div className="z-10 fixed bottom-0 w-[100%] md:static md:bottom-auto md:w-[auto]">
        <SideNavBar />
      </div>
      <div className=" relative max-w-[900px] flex-grow w-9/10 mx-auto md:w-full md:mx-0 md:max-w-[none]">
        

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
              {name || "user's name"}
            </p>
            <p className="lg:w-[6.4rem] lg:h-[3rem] absolute bottom-[-15%] lg:left-[35%]">@{username}</p>
          </div>

          {/* her it goes the follow, following and edit profile/message part */}
          <div className="flex flex-wrap justify-center items-end gap-4 max-w-[200px] lg:flex-nowrap lg:max-w-[350px]">
            <ShowFollowersBtn />
            <ShowFollowingBtn />
            <EditProfileBtn />
          </div>
        </div>

        {/* tercera parte del perfil: botones de redireccion o muestreo: post, pets, about */}
        {/* div para remarcar las lineas */}
        <div className="mt-[3rem] border-t-2 border-[#e2e5e9]">
  <div className="w-[90%] mx-auto flex justify-between lg:justify-start gap-[4rem] m-[.8rem]">
    <button className="font-semibold text-[#68686c] rounded h-[2rem] w-[3.6rem]  hover:bg-[#e2e5e9] lg:text-[1.4rem] lg:w-[6.4rem] lg:h-[3rem]">
      Posts
    </button>
    <button className="font-semibold text-[#68686c] rounded h-[2rem] w-[3.6rem]  hover:bg-[#e2e5e9] lg:text-[1.4rem] lg:w-[6.4rem] lg:h-[3rem]">
      Pets
    </button>
    <button className="font-semibold text-[#68686c] rounded h-[2rem] w-[3.6rem]  hover:bg-[#e2e5e9] lg:text-[1.4rem] lg:w-[6.4rem] lg:h-[3rem]">
      About
    </button>
    <div className="items-center justify-center rounded hidden lg:flex lg:cursor-pointer hover:bg-[#e2e5e9] lg:w-[6.4rem] lg:h-[3rem]">
      <ProfileSettingsBtn />
    </div>
  </div>
</div>

        <ImageList sx={{ mt: 4, maxWidth: "900px" }} cols={3}>
          {itemData.map((item) => (
            <ImageListItem
              key={item.img}
              sx={{ maxWidth: "320px" }}
              className="relative group"
            >
              <img
                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.img}`}
                alt={item.title}
                loading="lazy"
                className="rounded transition-transform duration-200 ease-in-out"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 rounded">
                <p className="text-white text-lg">{item.title}</p>
              </div>
            </ImageListItem>
          ))}
        </ImageList>
      </div>
    </div>
  );
}
