import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrimarySearchAppBar from "./pages/NavigationBar";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute";
import PlotlyFromAPI from "./pages/Chart";
import ImageGallery from "./pages/Gallery";
import ImageUploader from "./pages/UploadImage";
import Navbar from "./pages/Navbar";
import Feed from "./pages/Feed";
import Rightbar from "./pages/Rightbar";
import Sidebar from "./pages/Sidebar";


import {Stack, Box, Button, Container, styled } from '@mui/material'





import './App.css'




const Stacking= styled(Stack)({
  direction:'{row}',
  spacing:5,
  justifyContent:'space'
})

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
    
              <Box>
  <PrimarySearchAppBar/>
  <Navbar/>
  <Stack direction={'row'} spacing={2} justifyContent={'space-between'}>
    <Sidebar></Sidebar>
    <Feed></Feed>
    <Rightbar>
      <ImageUploader/>
    </Rightbar>
    
  </Stack>
  
  
 </Box>

            </ProtectedRoute>
          }
        />
        <Route path="/chart" element={<PlotlyFromAPI/>}></Route>
         <Route path="/rightbar" element={<Rightbar/>}></Route>
         <Route path="/sidebar" element={<Sidebar/>}></Route>
          <Route path="/upload" element={<ImageUploader/>}></Route>
        
        
        
         <Route path="/feed" element={<Feed/>}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;





