import { AppBar, Box, Button, Dialog, Stack, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import Image from "next/image";
import { useState } from "react";
import SelectListingCard from "../SelectListingCard";

const Header = () => {

    const [openDialog, setOpenDialog] = useState(false);
    const handleDialogOpen = () => {
        setOpenDialog(!openDialog);
    };

    return <AppBar sx={{ bgcolor: "#fff" }} >
        <Dialog open={openDialog} onClose={() => handleDialogOpen()} >
            <Stack direction="row" justifyContent={"space-between"} gap={4} alignItems={"center"} maxWidth={1440} width={"100%"} mx={"auto"} p={2}>
                <SelectListingCard handleDialogOpen={handleDialogOpen} title="need roommate" image="https://mui.com/static/images/cards/paella.jpg" route={"/list-property/need-roommate"} />
                <SelectListingCard handleDialogOpen={handleDialogOpen} title="need room" image="https://mui.com/static/images/cards/paella.jpg" route={"/list-property/need-roommate"} />
            </Stack>
        </Dialog>
        <Stack direction="row" justifyContent={"space-between"} alignItems={"center"} maxWidth={1440} width={"100%"} mx={"auto"} p={2}>
            <Typography variant="h2">
                <b>Flat<strong style={{ color: "#ffc79c" }}> Share</strong></b>
            </Typography>
            <Box>
                <Stack direction="row" >
                    <Button color="secondary" onClick={handleDialogOpen}> Sign Up </Button>
                    <Button color="secondary" >Log In</Button>
                </Stack>
            </Box>
        </Stack>
    </AppBar>

}
export default Header;