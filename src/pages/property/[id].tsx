import { ConnectUser, PropertyDetails } from "@/component";
import CustomizedCrousal from "@/component/CustomizedCrousal";
import { Box, Stack } from "@mui/material";

    const PropertyInfo = () =>{
        

        return <Stack direction="row" my={8}>
            <Box width={"25%"}>
                <ConnectUser/>
            </Box>
            <Box width={"75%"}>
            <PropertyDetails/>
           
            </Box>
        </Stack>

    }
    export default PropertyInfo;