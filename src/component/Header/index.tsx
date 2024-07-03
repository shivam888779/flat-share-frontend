import { AppBar, Box, Button, Stack, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import Image from "next/image";

const Header = () => {

    return <AppBar sx={{bgcolor:"#fff"}} >
        <Stack direction="row" justifyContent={"space-between"} alignItems={"center"} maxWidth={1440} width={"100%"} mx={"auto"} p={2}>
             <Typography variant="h2">
                <b>Flat<strong style={{color:"#ffc79c"}}> Share</strong></b>
             </Typography>
             <Box>
                <Stack direction="row" >
                    <Button color="secondary"> Sign Up </Button>
                    <Button color="secondary" >Log In</Button>
                </Stack>
             </Box>
        </Stack>
    </AppBar>

}
export default Header;