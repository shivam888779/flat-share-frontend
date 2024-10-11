import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";

const CustomizedRoundedIcon =()=>{

    return <Stack my={3} direction={"row"} flexWrap={"wrap"} gap={4}>
        <Box>
           <Box p={3} className={"bg-gray-200 rounded-full w-24 h-24"} >
                   <img className="rounded-full" src="https://www.flatmate.in/dumbbell.png" height={50} width={50}/>
                   
           </Box>
           <Typography variant="subtitle2" textAlign={"center"} my={1} >bummble</Typography>
           </Box>
           <Box>
           <Box p={3} className={"bg-gray-300 rounded-full w-24 h-24 border-red-400 border-4"} >
                   <img className="rounded-full" src="https://www.flatmate.in/dumbbell.png" height={50} width={50}/>
           </Box>
           <Typography variant="subtitle2" textAlign={"center"} my={1} >bummble</Typography>
           </Box>
    </Stack>

}
export default CustomizedRoundedIcon;