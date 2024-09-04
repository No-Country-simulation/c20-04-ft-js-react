import React from 'react'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

interface petInfo {
  petName: string;
  petImage: string;
  petInfo: string;
}

export default function Pets({petName, petInfo, petImage}:petInfo) {
  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={petImage}
          alt={petName}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {petInfo || <p>Lizards are a widespread group of squamate reptiles, with over 6,000
              species, ranging across all continents except Antarctica</p>}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </div>
  )
}
