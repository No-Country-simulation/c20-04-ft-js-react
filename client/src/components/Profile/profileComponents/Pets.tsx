import React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

// interface petInfo {
//   petName: string;
//   petImage: string;
//   petInfo: string;
// }

const petsInfo = [
  {
    petName: "Baggy",
    petImage:
      "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg",
    petInfo: "This is my pet Baggy, a playful dog who loves to fetch.",
    age: 14
  },
  {
    petName: "Whiskers",
    petImage:
      "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg",
    petInfo: "Whiskers is a curious cat who loves to climb and explore.",
    age: 11
  },
  {
    petName: "Goldie",
    petImage:
      "https://images.pexels.com/photos/128756/pexels-photo-128756.jpeg",
    petInfo: "Goldie is a peaceful goldfish who loves to swim in circles.",
    age: 9
  },
  {
    petName: "Shadow",
    petImage:
      "https://images.pexels.com/photos/458799/pexels-photo-458799.jpeg",
    petInfo: "Shadow is a loyal dog who enjoys running and playing outdoors.",
    age: 16
  },
  {
    petName: "Bella",
    petImage:
      "https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg",
    petInfo: "Bella is a friendly rabbit who loves to hop around the garden.",
    age: 5
  },
  {
    petName: "Spike",
    petImage:
      "https://miro.medium.com/v2/resize:fit:1400/1*rIkmavUeqyRySwlQdA9kKg.jpeg",
    petInfo: "Spike is a mischievous hedgehog who enjoys curling up in a ball.",
    age: 2
  },
  {
    petName: "Fluffy",
    petImage:
      "https://images.pexels.com/photos/356378/pexels-photo-356378.jpeg",
    petInfo: "Fluffy is a gentle cat who loves to nap in the sun.",
    age: 7
  },
  {
    petName: "Buddy",
    petImage:
      "https://prod-printler-front-as.azurewebsites.net/media/photo/176171-1.jpg?mode=crop&width=425&height=600&rnd=0.0.1",
    petInfo: "Buddy is an energetic dog who enjoys long walks in the park.",
    age: 1
  },
];

export default function Pets() {
  return (
    <div className="flex flex-wrap justify-center gap-[2rem]">
      {petsInfo.map(pet=> (
        <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={pet.petImage}
            alt={pet.petName}
            className="max-h-[220px]"
          />
          <CardContent className="realative">
            <Typography gutterBottom variant="h5" component="div">
              {pet.petName}
            </Typography>
            <div className="mb-[1rem]">Age: {pet.age}</div>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {pet.petInfo}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      ))}
    </div>
  );
}
