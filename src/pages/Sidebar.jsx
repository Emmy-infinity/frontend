import {Typography,Avatar,Button,Box,Stack ,Snackbar,Card,CardMedia} from "@mui/material";
import PlotlyFromAPI from "./Chart";
const Sidebar=()=>{
    return(
        <Box bgcolor={"skyblue"} flex={1} p={2} sx={{display:{xs:"none",sm:"block"}}}>
            <Stack padding={3}>
                
                <Typography variant="h2" color="red">hello</Typography>
                
            <Snackbar
open={true}
message="CAN INSTITUTE OF PROFESSIONAL STUDIES AND EXECELLENCY"
ContentProps={{ variant: 'h1' }}
/>

                
            
            
            </Stack>
           
        </Box>
    )
}
export default Sidebar