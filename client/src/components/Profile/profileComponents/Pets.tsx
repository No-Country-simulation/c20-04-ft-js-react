"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import IconButton from "@mui/material/IconButton";

import AddPetForm from "./AddPetForm";

import { IoIosAddCircleOutline } from "react-icons/io";

//? redux
import { useGetPetsByUsernameQuery } from "@/redux/apiSlices/petsApi";

interface Pet {
  petName: string;
  petImage: string;
  petInfo: string;
  species: string;
}

interface profileProps {
  dataUsername: string;
  localUsername?: string;
}

export default function Pets({ dataUsername, localUsername }: profileProps) {
  const [showPetForm, setShowPetForm] = useState<boolean>(false);

  const params = useParams();
  const username: string = params.userName as string;

  const { data, isLoading, error, refetch } = useGetPetsByUsernameQuery(username);
  const petsInfo = data?.data?.getPetsByUsername;
  console.log(petsInfo);

  const onRefetch = ()=> {
    refetch()
  }

  return (
    <div className="flex flex-wrap justify-center gap-[2rem]">
      {dataUsername === localUsername && petsInfo?.length > 0 ? (
        <>
          {showPetForm ? (
            <AddPetForm setShowPetForm={setShowPetForm} onRefetch={onRefetch}/>
          ) : (
            <div className="flex flex-col items-center gap-2 w-full p-4">
            {/* Header text */}
            <p className="font-extrabold text-[1.2rem] text-gray-800 lg:text-[1.6rem] text-center mb-4">
              Add New Pet 🐾
            </p>
          
            {/* Add New Pet Button */}
              <IconButton onClick={() => setShowPetForm(true)} className="hover:scale-110 transition-transform duration-300">
                <IoIosAddCircleOutline
                  size={60}
                  className="text-purple-500 hover:text-purple-700 transition-colors duration-300 cursor-pointer"
                />
              </IconButton>
          </div>
          )}
        </>
      ) : null}

      {petsInfo?.length > 0 ? (
        petsInfo.map((pet) => (
          <Card sx={{ maxWidth: 345 }} key={crypto.randomUUID()}>
            <CardActionArea>
              <CardMedia
                component="img"
                image={pet.profile_photo}
                alt={pet.name}
                className="max-h-[220px] min-w-[345px]"
              />
              <CardContent className="relative">
                <Typography gutterBottom variant="h5" component="div">
                  {pet.name}
                </Typography>
                <div className="mb-[1rem]">specie: {pet.species}</div>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {pet.petInfo}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {pet.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))
      ) : dataUsername === localUsername ? (
        <>
          {showPetForm ? (
            <>
              <AddPetForm setShowPetForm={setShowPetForm} onRefetch={onRefetch}/>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center justify-center">
                {/* Main message */}
                <p className="mb-[2rem] font-extrabold text-[1.4rem] text-center lg:text-[2.4rem] text-purple-600">
                  You haven't added any pets yet
                </p>

                {/* Secondary message */}
                <p className="mb-[1rem] font-extrabold text-[1rem] lg:text-[1.4rem] text-gray-700">
                  Click here to add your first pet:
                </p>

                {/* Add pet icon */}
                <IoIosAddCircleOutline
                  size={60}
                  className="cursor-pointer text-purple-500 hover:text-purple-700 transition-colors duration-300"
                  onClick={() => setShowPetForm(true)}
                />
              </div>
            </>
          )}
        </>
      ) : (
        <p className="mb-[2rem] font-extrabold text-[1.4rem] text-center lg:text-[2.4rem] text-purple-600">
          It looks like this animal lover hasn't added any furry friends yet!
        </p>
      )}
    </div>
  );
}
