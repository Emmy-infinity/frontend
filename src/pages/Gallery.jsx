import React, { useEffect, useState } from 'react';
import api from '../api';



function ImageGallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    api.get("/api/images/")
      .then(res => setImages(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Image Gallery</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {images.map(img => (
          <div key={img.id} style={{ margin: 10 }}>
            <img
              src={img.image}  // absolute URL
              alt={img.title}
              style={{ maxWidth: 300, maxHeight: 600 }}
            />
            <p>{img.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageGallery;