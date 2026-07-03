import React from "react";

import ImageUploader from "./UploadImage";


import {Avatar, Box, AvatarGroup,Typography} from "@mui/material";

const Rightbar=()=>{
    return(
        <Box bgcolor={"skyblue"} flex={2} p={2} sx={{display:{xs:"none",sm:"block"}}} >
            <Typography variant="h6" align="center" color=" ">Post Products</Typography>
            <ImageUploader/>
            <AvatarGroup>
             
                <Avatar src="src/images/emmy2.jpg"></Avatar>
                <Avatar src="src/images/nelly.jpg"></Avatar>
                <Avatar src="src/images/emmy1.jpg"></Avatar>
                <Avatar src="src/images/emmy1.jpg"></Avatar>
                <Avatar src="src/images/emmy2.jpg"></Avatar>
                  <Gamepad></Gamepad>
                <Avatar ></Avatar>
               
            </AvatarGroup>
          
        </Box>
    )
}
export default Rightbar  