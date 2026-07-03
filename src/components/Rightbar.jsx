import React from "react";
import DesktopMac from '@mui/icons-material/DesktopMac';
import Gamepad from '@mui/icons-material/Gamepad';



import {Avatar, Box, AvatarGroup,Typography} from "@mui/material";
import Form from "./Form";
const Rightbar=()=>{
    return(
        <Box bgcolor={"skyblue"} flex={2} p={2} sx={{display:{xs:"none",sm:"block"}}} >
            <Typography variant="h3" align="center" color="white">Online</Typography>
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