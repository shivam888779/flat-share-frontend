import { Box, Paper, Stack, Typography } from "@mui/material";
import Image from "next/image";

interface Props {
        handleChange: any;
        selectedHighLights: Array<Number>
}

const CustomizedRoundedIcon = (props: Props) => {

        const {handleChange , selectedHighLights}
        return <Stack my={3} direction={"row"} flexWrap={"wrap"} gap={4}>
                <Box>
                        <Paper  className={"bg-gray-200 p-3 rounded-full flex justify-center items-center w-24 h-24"} >
                                <img className="rounded-full" src="https://www.flatmate.in/dumbbell.png" height={50} width={50} />

                        </Paper>
                        <Typography variant="subtitle2" textAlign={"center"} my={1} >bummble</Typography>
                </Box>
                <Box>
                         <Paper  className={"bg-gray-200 p-3 rounded-full  flex justify-center items-center w-24 h-24 border-red-400 border-4"} >
                                <img className="rounded-full" src="https://www.flatmate.in/dumbbell.png" height={50} width={50} />

                        </Paper>
                        
                        <Typography variant="subtitle2" textAlign={"center"} my={1} >bummble</Typography>
                </Box>
        </Stack>

}
export default CustomizedRoundedIcon;