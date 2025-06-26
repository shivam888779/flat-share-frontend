import { useGlobalContext } from "@/global-context";
import { Box, Paper, Stack, Typography } from "@mui/material";
import Image from "next/image";

interface Props {
        setFieldValue: any;
        selectedHighLights: Number[];
}

const CustomizedRoundedSelect = (props: Props) => {

        const{state} = useGlobalContext()
        const { setFieldValue, selectedHighLights } = props;
        const highLights = setFieldValue?state.highLights: state.highLights.filter((data)=>selectedHighLights.includes(data.id)) ;


        console.log(props)
        

        const handleSelectedHighLights = (id: number) => {
                if(!setFieldValue)
                {
                        return;
                }
                if (selectedHighLights?.includes(id)) {
                        setFieldValue("highLights", selectedHighLights?.filter((item: Number) => item !== id))
                } else {
                        setFieldValue("highLights", [...selectedHighLights, id])
                }
        }

       
        return <Stack my={3} direction={"row"} flexWrap={"wrap"} gap={4}>
                {highLights?.map((item, index) => {
                        return <Box key={index} onClick={() => handleSelectedHighLights(item?.id)} className='cursor-pointer' >
                                <Paper elevation={selectedHighLights.includes(item?.id) ? 3 : 1} className={`bg-gray-200 p-3 rounded-full flex justify-center items-center w-24 h-24 ${selectedHighLights.includes(item?.id) ? " border-red-400 border-4" : ""} `} >
                                        <Image alt={item?.name} className="rounded-full" src={item?.imgSrc} height={50} width={50} />

                                </Paper>
                                <Typography variant="subtitle2" textAlign={"center"} my={1} >{item?.name}</Typography>
                        </Box>
                })}

        </Stack>

}
export default CustomizedRoundedSelect;