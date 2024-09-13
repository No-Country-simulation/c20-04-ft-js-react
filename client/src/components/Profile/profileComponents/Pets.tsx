import React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

import { IoIosAddCircleOutline } from "react-icons/io";

interface Pet {
  petName: string;
  petImage: string;
  petInfo: string;
  age: number;
}

interface profileProps {
  dataUsername: string;
  localUsername?: string;
}

const onAdd = ()=> {
  
}

const petsInfo: Pet[] = [
  
];

export default function Pets({ dataUsername, localUsername }: profileProps) {
  return (
    <div className="flex flex-wrap justify-center gap-[2rem]">
      
      {dataUsername === localUsername && petsInfo.length > 0 ? (
        <div className="flex flex-col items-center gap-[.6rem] w-[100%]">
        <p className="mb-[1rem] font-extrabold text-[1rem] lg:text-[1.4rem]">
              Add new pet:
            </p>
          <IoIosAddCircleOutline size={60} className="cursor-pointer" />
        </div>
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
                <div className="mb-[1rem]">Age: {pet.age}</div>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {pet.petInfo}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))
      ) : dataUsername === localUsername ? (
        <div className="flex flex-col items-center justify-center">
          <p className="mb-[2rem] font-extrabold text-[1.4rem] text-center lg:text-[2.4rem]">
            You haven't add any pets yet
          </p>
          <p className="mb-[1rem] font-extrabold text-[1rem] lg:text-[1.4rem]">
            click here to add your first pet:
          </p>
          <IoIosAddCircleOutline size={60} className="cursor-pointer" />
        </div>
      ) : (
        <p className="mb-[2rem] font-extrabold text-[1.4rem] text-center lg:text-[2.4rem]">
          This user has not added any pets yet
        </p>
      )}
    </div>
  );
}
