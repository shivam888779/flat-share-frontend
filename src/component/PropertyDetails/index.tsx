import { LocationCity } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import CustomizedCrousal from "../CustomizedCrousal";
import CustomizedRoundedIcon from "../CustomizedRoundedIcon";
import Chips from "../Chips";

const PropertyDetails = () => {

    return <Box className="shadow-md rounded-lg p-8">
        <Typography variant="h3">Property Location</Typography>
        <Typography variant="subtitle2" my={3}> <LocationCity /> GB Road Delhi</Typography>
        <hr />
        <Typography variant="h3" mt={4}>Requirement Information</Typography>
        <Stack direction={"row"} gap={8}>
            <Box my={3}>
                <Typography variant="h5" > <LocationCity /> Gender</Typography>
                <Typography variant="subtitle2" ml={3.5}>  GB Road Delhi</Typography>
            </Box>
            <Box my={3}>
                <Typography variant="h5" > <LocationCity /> Rent</Typography>
                <Typography variant="subtitle2" ml={3.5}>  GB Road Delhi</Typography>
            </Box>
            <Box my={3}>
                <Typography variant="h5" > <LocationCity /> Occupancy</Typography>
                <Typography variant="subtitle2" ml={3.5}>  GB Road Delhi</Typography>
            </Box>
            <Box my={3}>
                <Typography variant="h5" > <LocationCity /> Posted</Typography>
                <Typography variant="subtitle2" ml={3.5}>  1 month ago</Typography>
            </Box>
           
        </Stack>
        <hr />
        <Typography variant="h3" mt={4}>Pictures</Typography>
        <CustomizedCrousal/>
        <hr />
        <Typography variant="h3" mt={4}>My Preferences</Typography>
        {/* <CustomizedRoundedIcon/> */}
        <hr />
        <Typography variant="h3" mt={4}>Accommodations</Typography>
        <Chips/>
        <hr />
        <Typography variant="h3" mt={4}>About</Typography>
        <Typography variant="subtitle2" my={2} mx={0.5}>  1 month a lijefioe wlkpwokr fk rgi w ;fKLDJF DHFEIOJ  JIOJOgo</Typography>
    </Box>

}
export default PropertyDetails;