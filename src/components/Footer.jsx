import React from "react";
import Form from "./Form";
import DevicesOther from '@mui/icons-material/DevicesOther';
import Microsoft from '@mui/icons-material/Microsoft';
import Facebook from '@mui/icons-material/FacebookTwoTone';
import Google from '@mui/icons-material/Google';
import Gamepad from '@mui/icons-material/Gamepad';
import { Button } from "@mui/material";





import DeveloperBoard from '@mui/icons-material/DeveloperBoard';
import { Box, Toolbar, AppBar, styled, Typography, Grid2, responsiveFontSizes } from "@mui/material";

const StyledToolBar = styled(Toolbar)({
    backgroundColor: "orange"
})

const Buttonrounde = styled(Button)({
    background: "blue",
    text: "hello",



})

const StyledDeveloperBoard = styled(DeveloperBoard)({
    fontSize: 200
})
const StyledIcn = styled(Gamepad)({
    color: 'red',
    fontSize: 20
})
const MicrosoftStyled = styled(Microsoft)({
    color: 'blue',
    fontSize: 20,

})
const FacebookStyled = styled(Facebook)({
    color: 'blue',
    fontSize: 20
})
const GoogleStyled = styled(Google)({
    fontSize: 20,
    color: "white"
})
export default function Footer() {
    return (
        <StyledToolBar><Box flex={2} flexDirection={'row'} > <Typography variant="h6"> GLASS LIGHT PROMOTION</Typography>
            <Typography variant="">Copy right</Typography>
            <Gamepad></Gamepad>

            <StyledIcn></StyledIcn>


            <FacebookStyled></FacebookStyled>
            <MicrosoftStyled></MicrosoftStyled>
            <GoogleStyled></GoogleStyled>


            <Buttonrounde></Buttonrounde>



            <Typography variant="h1">  Gulu Sqoop  </Typography>


        </Box></StyledToolBar>
    )
}
