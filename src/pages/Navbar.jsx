import React from "react";
import DeveloperBoard from '@mui/icons-material/DeveloperBoard'
import {ImageList,Box,InputBase, Avatar,AppBar,Toolbar ,styled ,Typography, Icon} from "@mui/material";

const Emmy=styled(Box)({
    display:"flex",
    padding:20
    
})

const StyledToolBar=styled(Toolbar)({
    display:"flex",
    justifyContent:'space-between',
    background:'skyblue'
})
const APPBAR=styled(AppBar)({
    borderRadius:"10px",
    position:"sticky"



})
const Search=styled(Box)(({theme})=>({
    backgroundColor:"white",
    padding:"0 10px",
    borderRadius:theme.shape.borderRadius,
    width:"40%"
}))




const Navbar=()=>{
    return(
        <APPBAR>
        <StyledToolBar>
            <img src="src/images/logo.png" alt="logo" padding="5px"  width={120} height={120}/>
            <Typography variant="h6" sx={{display:{xs:"none",sm:"block"}}} fontStyle="revert-layer" color="orange" fontWeight={120} fontSize={60} padding={0}>Gulu Buy</Typography>
            
            <Search><InputBase placeholder="search"></InputBase></Search>
            <DeveloperBoard/>
            
        </StyledToolBar>
        <Emmy>
            
        </Emmy>
       
       </APPBAR> 
    )
}
export default Navbar
