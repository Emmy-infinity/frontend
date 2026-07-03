import React, { useState, useEffect } from 'react';
import { ImageList, ImageListItem, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Empty array [] ensures this fetch only runs once on mount, preventing infinite loops
    axios.get('https://your-django-backend.com')
      .then(response => {
        setImages(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching images:", error);
        setLoading(false);
      });
  }, []); // <--- Crucial: Empty array here

  if (loading) return <CircularProgress />;

  // .slice(0, 5) limits the displayed items to the first 5 images to avoid infinite lists
  const limitedImages = images.slice(0, 5);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Gallery Showcase
      </Typography>
      <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
        {limitedImages.map((item) => (
          <ImageListItem key={item.id}>
            <img
              src={item.image_url} // Adjust according to your Django DRF JSON field
              alt={item.title || 'Gallery image'}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
};

export default ImageGallery;
