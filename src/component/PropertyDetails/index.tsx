import { LocationCity } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import CustomizedCrousal from "../CustomizedCrousal";
import Chips from "../Chips";
import { IPropertyDetails } from "@/types/property";
import { CustomizedRoundedSelect, CustomizedSelectChip } from "@/custom-component";
import { useGlobalContext } from "@/global-context";

interface IPropertyDetailsProps {
    propertyDetails: IPropertyDetails;
}   

const PropertyDetails = (props:IPropertyDetailsProps) => {
     const {propertyDetails} = props;
     const {state} = useGlobalContext()
     const {location,description,security,availableFrom,rent,deposit,mobile,isZeroDeposit,partnerGender,typeId,highLights,resources,preferences,images} = propertyDetails;
    const resourcesSchema = state.resources?.filter((data)=>resources?.includes(data.id));
    const preferencesSchema = state.preferences?.filter((data)=>preferences?.includes(data.id));
    return <Box className="shadow-md rounded-lg p-8">
        <Typography variant="h3">Property Location</Typography>
        <Typography variant="subtitle2" my={3}> <LocationCity /> {location?.address}</Typography>
        <hr />
        <Typography variant="h3" mt={4}>Requirement Information</Typography>
        <Stack direction={"row"} gap={8}>
            <Box my={3}>
                <Typography variant="h5" > <LocationCity /> Gender</Typography>
                <Typography variant="subtitle2" ml={3.5}>  {partnerGender}</Typography>
            </Box>
            <Box my={3}>
                <Typography variant="h5" > <LocationCity /> Rent</Typography>
                <Typography variant="subtitle2" ml={3.5}>  {rent}</Typography>
            </Box>
            <Box my={3}>
                <Typography variant="h5" > <LocationCity /> Occupancy</Typography>
                <Typography variant="subtitle2" ml={3.5}>  {availableFrom}</Typography>
            </Box>
            <Box my={3}>
                <Typography variant="h5" > <LocationCity /> Posted</Typography>
                <Typography variant="subtitle2" ml={3.5}>  {new Date(availableFrom).toLocaleDateString()}</Typography>
            </Box>
           
        </Stack>
        <hr />
        <Typography variant="h3" mt={4}>Pictures</Typography>
            <CustomizedCrousal images={images as string[]}/>
        <hr />
        <Typography variant="h3" mt={4}>My Preferences</Typography>
        <CustomizedSelectChip
                        setFieldValue={undefined}
                        fieldKey={undefined}
                        schema={preferencesSchema}
                        selectedResources={preferences}
                    />
        <hr />
        <Typography variant="h3" mt={4}>Highlights</Typography>
        <CustomizedRoundedSelect selectedHighLights={highLights} setFieldValue={undefined}/>
        <hr />
        <Typography variant="h3" mt={4}>Resources</Typography>
        <CustomizedSelectChip
                        setFieldValue={undefined}
                        fieldKey={undefined}
                        schema={resourcesSchema}
                        selectedResources={resources}
                    />
        <hr />
        <Typography variant="h3" mt={4}>About</Typography>
            <Typography variant="subtitle2" my={2} mx={0.5}> {description}</Typography>
    </Box>

}
export default PropertyDetails;