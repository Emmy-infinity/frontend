import React from "react";
import { Typography, Avatar, Box, Card, CardHeader, CardActions, CardMedia, CardContent, IconButton, InputBase } from "@mui/material";

import DeviceUnknown from '@mui/icons-material/DeviceUnknown';





const Feed = () => {
    return (
        <Box bgcolor={"pink"} flex={6} p={2} >
            <Card  >
                <CardHeader avatar={<Avatar sx={{ backgroundColor: "red" }}
                > R</Avatar>}
                    action={
                        <IconButton aria-label="settings">

                        </IconButton>
                    }
                ></CardHeader>
                <CardMedia component="img" image="src/images/nelly.jpg">

                </CardMedia>


                <CardContent>
                    <Typography variant="h6">

                    </Typography>
                </CardContent>

            </Card>
        
        </Box>
    )
}
export default Feed                                     
