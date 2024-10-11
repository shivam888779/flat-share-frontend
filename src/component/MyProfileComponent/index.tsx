import { Box, Button, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import SubscriptionDetailCard from "../SubscriptionDetailCard";

const MyProfileComponent = () => {
    const [age, setAge] = useState('');

    const handleChange = (event: any) => {
        setAge(event.target.value as string);
    };
    return <Box className="shadow-md rounded-lg p-8 my-16 mx-auto w-[55%] ">
        <Typography variant="h3" >Property Location</Typography>
        <hr className="my-6" />
        <Stack direction={"row"} gap={6} className="justify-between flex-wrap">
            <Box>
                <Typography variant="subtitle2" mb={0.5} ml={0.25} >First Name</Typography>
                <TextField placeholder="First Name..." />
            </Box>
            <Box>
                <Typography variant="subtitle2" mb={0.5} ml={0.25} >Last Name</Typography>
                <TextField placeholder="Last Name..." />
            </Box>
            <Box>
                <Typography variant="subtitle2" mb={0.5} ml={0.25} >Phone Number</Typography>
                <TextField placeholder="Phone Number..." />
            </Box>
            <Box>
                <Typography variant="subtitle2" mb={0.5} ml={0.25} >Email</Typography>
                <TextField placeholder="Email..." />
            </Box>
           
            <Box>
                <Typography variant="subtitle2" mb={0.5} ml={0.25} >Gender</Typography>
                    <Select
                        className="min-w-[200px] rounded-xl text-xl"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        onChange={handleChange}
                    >
                        <MenuItem className="text-xl" value={10}>Male</MenuItem>
                        <MenuItem className="text-xl" value={20}>Female</MenuItem>
                        <MenuItem className="text-xl" value={30}>Gay</MenuItem>
                    </Select>
               
            </Box>


        </Stack>
        <Button type="submit" variant="outlined"  className="mt-6">Save Chnages</Button>
        <hr className="my-6"/>
        <Typography variant="h3" >Subscription Details</Typography>
        <SubscriptionDetailCard/>
    </Box>
}
export default MyProfileComponent;