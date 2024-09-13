import React, { useState } from 'react'

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

export default function AddPetForm() {
  const [petForm, setPetForm] = useState({
    petName: "",
    petImage: "",
    petAge: 0,

  })
    return (
      <Card sx={{ maxWidth: 345}} key={crypto.randomUUID()}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image=""
            alt="Pet Image" // Provide an alt text for accessibility
            className="max-h-[220px] min-w-[345px] min-h-[220px]"
          />
          <CardContent className="relative">
            <button className='w-full h-[2.4rem] rounded max-w-[6rem] justify-self-start lg:min-w-[100px] border bg-blue-500 text-white hover:bg-blue-700'>Upload Picture</button>
            <Typography gutterBottom variant="h5" component="div">
              Pet Name
            </Typography>
            <div className="mb-[1rem]">Age: 2 years</div>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Pet Description goes here.
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
