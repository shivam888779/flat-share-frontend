import { Box, Paper, Stack, Typography } from "@mui/material";
import Image from "next/image";

interface Props {
        setFieldValue: any;
        selectedResources: Number[];
        fieldKey: string|undefined;
        schema: any
}

const CustomizedSelectChip = (props: Props) => {

        const { setFieldValue, selectedResources, fieldKey, schema } = props;

        const handleSelectedHighLights = (id: number) => {
                if (selectedResources?.includes(id)) {
                        setFieldValue(fieldKey, selectedResources?.filter((item: Number) => item !== id))
                } else {
                        setFieldValue(fieldKey, [...selectedResources, id])
                }
        }


        return <Stack my={3} direction={"row"} flexWrap={"wrap"} gap={2}>
                {schema?.map((item: any, index: number) => {
                        return <Box key={index} onClick={() => handleSelectedHighLights(item?.id)} className='cursor-pointer' >
                                <Paper elevation={selectedResources.includes(item?.id) ? 3 : 1} className={`bg-gray-200 px-3 py-1/2 rounded-full flex justify-center items-center min-w-24  ${selectedResources.includes(item?.id) ? " border-red-400 border-2" : ""} `} >
                                        <Typography variant="subtitle2" textAlign={"center"} my={1} >{item?.name}</Typography>
                                </Paper>
                        </Box>
                })}

        </Stack>

}
export default CustomizedSelectChip;