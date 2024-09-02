'use client'

import ProfileSettingsBtn from "./profileComponents/ProfileSettingsBtn";
import EditProfileBtn from "./profileComponents/EditProfileBtn";
import ShowFollowersBtn from "./profileComponents/ShowFollowersBtn";
import ShowFollowingBtn from "./profileComponents/ShowFollowingBtn";
import SendMessageBtn from "./profileComponents/SendMessageBtn";

import SideNavBar from "../shared/SideNavBar";

//? mui material
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

interface profileProps {
  username: string;
}

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
  },
];

export default function Profile({username}: profileProps) {
  return (
    <div className="flex">
      <SideNavBar/>
          <div className="max-w-[900px] flex-grow w-9/10 mx-auto ">

<div className="flex gap-4 justify-end border-b-[4px] border-b-[#334155] align-center">
<p>@{username}</p>
<ProfileSettingsBtn/>
{/* linea que divide la primera parte del perfil */}
<div className="border-b-[4px] border-b-[#334155] mt-6"></div>
</div>

{/* segunda parte del perfil */}
<div className="mt-5 w-[90%] mx-auto flex justify-between gap-[2rem] max-w-[400px]">
{/* image and name container */}
<div className="">
<figure className="w-20 h-20 rounded-full bg-[#000]">
  <img className="w-full h-full rounded-full" src="" alt="" />
</figure>
<p className="max-w-[120px] mt-[0.8rem] overflow-hidden">Luis Manzano</p>
</div>

{/* her it goes the follow, following and edit profile/message part */}
<div className="flex flex-wrap justify-center items-end gap-4 max-w-[200px]">
  <ShowFollowersBtn/>
  <ShowFollowingBtn/>
  <EditProfileBtn/>
</div>

</div>


{/* tercera parte del perfil: botones de redireccion o muestreo: post, pets, about */}
{/* div para remarcar las lineas */}
<div className="mt-[3rem] border-t-4 border-b-4 border-black">
<div className="w-[90%] mx-auto flex justify-between lg:justify-start gap-[4rem]">

<button className="bg-[red] rounded h-[2rem] w-[3.6rem] m-[.4rem]">posts</button>
<button className="bg-[red] rounded h-[2rem] w-[3.6rem] m-[.4rem]">pets</button>
<button className="bg-[red] rounded h-[2rem] w-[3.6rem] m-[.4rem]">about</button>

</div>
</div>

<ImageList sx={{ mt: 4, maxWidth: '1000px'} } cols={3}>
{itemData.map((item) => (
<ImageListItem key={item.img}
sx={{maxWidth: '320px'}}
>
  <img            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
    src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
    alt={item.title}
    loading="lazy"
    className="rounded"
  />
</ImageListItem>
))}
</ImageList>


</div>

    </div>


  )
}
