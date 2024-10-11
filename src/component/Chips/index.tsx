import { Face } from "@mui/icons-material"
import { Chip, Stack } from "@mui/material"

const Chips =()=>{

    return <Stack my={3} direction={"row"} flexWrap={"wrap"} gap={2}>
        <Chip icon={<Face />} label="With Icon" />
        <Chip icon={<Face />} label="With Icon" variant="outlined" />
    </Stack>
}
export default Chips