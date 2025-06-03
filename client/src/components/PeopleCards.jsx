import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, Box } from '@mui/material';
import subrat from '../data/subrat.JPG';
import sonali from '../data/sonali.JPG';
import priyanshu from '../data/priyanshu.jpg';
import RGBCard from './RGBCard';

const people = [
  {
    name: 'Subrat Pandey',
    image: subrat,
    about: 'Focused on building smart applications with experience in real world projects. Contributing to community platforms by managing websites.',
  },
    {
        name: 'Priyanshu Gupta',
        image: priyanshu,
        about: 'Passionate in backend and web development. I enjoy tackling challenging issues and creating solutions that are focused on the needs of the user.',
      },
  {
    name: 'Sonali Subhadarshini Sahoo',
    image: sonali,
    about: 'A student deeply passionate about Computer Science and truly enjoy the challenge of debugging code. Interests in UI/UX design.',
  },
  
];

const PeopleCards = () => {
  return (
    <RGBCard>
    <Box sx={{ padding: 2, 
      background: `linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.8) 100%)`,
          backdropFilter: 'blur(8px)',
          border: `1px solid rgba(255, 255, 255, 0.1)`,
          position: 'relative',
          zIndex: 1,
          maxWidth: '100%',
          m: 'auto',
          borderRadius: '5px',
     }}>
      <Grid container spacing={2}>
        {people.map((person, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ maxWidth: 345, mx: 'auto', borderRadius: '5px' }}>
              <CardMedia
                component="img"
                height="200"
                image={person.image}
                alt={person.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {person.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {person.about}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
    </RGBCard>
  );
};

export default PeopleCards;
