import React from "react";
import api from "../api";
import { useState } from "react";
export default function ImageUploader() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', title);

    try {
     const response= await api.post("/api/upload/", formData,{ 
      headers:{ 'Content-Type':'multipart/form-dats',}
     });
             alert("Image Uploaded");
} catch(err){
    console.error(err);
}
  };

       
  return (
    <div>
      <input className="form-input"
        type="text"
        placeholder="Image title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <input className="form-input"
        type="file"
        accept="image/*"
        onChange={e => setFile(e.target.files[0])}
      />
      <button className="form-button" onClick={handleUpload}>Upload</button>
    </div>
  );
}