import React, { useState } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

import AddPetForm from "./AddPetForm";

import { IoIosAddCircleOutline } from "react-icons/io";

interface Pet {
  petName: string;
  petImage: string;
  petInfo: string;
  species: string
}

interface profileProps {
  dataUsername: string;
  localUsername?: string;
}

const petsInfo: Pet[] = [
  {
    petName: "Baggy",
    petImage:
      "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg",
    petInfo: "This is my pet Baggy, a playful dog who loves to fetch.",
    species: "xd"
  },
];

export default function Pets({ dataUsername, localUsername }: profileProps) {
  const [showPetForm, setShowPetForm] = useState<boolean>(false);

  // const onShowForm = ()=> {
  //   setShowPetForm(true)
  // }

  return (
    <div className="flex flex-wrap justify-center gap-[2rem]">
      {dataUsername === localUsername && petsInfo.length > 0 ? (
        <>
        {showPetForm ? (
          <AddPetForm/>
        ): (
          <div className="flex flex-col items-center gap-[.6rem] w-[100%]">
            <p className="mb-[1rem] font-extrabold text-[1rem] lg:text-[1.4rem]">
              Add new pet:
            </p>
            <IoIosAddCircleOutline
              size={60}
              className="cursor-pointer"
              onClick={() => setShowPetForm(true)}
            />
          </div>
        )}
        </>
       
      ) : null}

      {petsInfo.length > 0 ? (
        petsInfo.map((pet) => (
          <Card sx={{ maxWidth: 345 }} key={crypto.randomUUID()}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={pet.petImage}
                alt={pet.petName}
                className="max-h-[220px]"
              />
              <CardContent className="relative">
                <Typography gutterBottom variant="h5" component="div">
                  {pet.petName}
                </Typography>
                <div className="mb-[1rem]">specie: {pet.species}</div>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {pet.petInfo}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))
      ) : dataUsername === localUsername ? (
        <>
          {showPetForm ? (
            <>
              <AddPetForm />
            </>
          ) : (
            <>
              <div className="flex flex-col items-center justify-center">
                <p className="mb-[2rem] font-extrabold text-[1.4rem] text-center lg:text-[2.4rem]">
                  You haven't add any pets yet
                </p>
                <p className="mb-[1rem] font-extrabold text-[1rem] lg:text-[1.4rem]">
                  click here to add your first pet:
                </p>
                <IoIosAddCircleOutline
                  size={60}
                  className="cursor-pointer"
                  onClick={() => setShowPetForm(true)}
                />
              </div>
            </>
          )}
        </>
      ) : (
        <p className="mb-[2rem] font-extrabold text-[1.4rem] text-center lg:text-[2.4rem]">
          This user has not added any pets yet
        </p>
      )}
    </div>
  );
}
