import { ConnectUser, PropertyDetails } from "@/component";
import CustomizedCrousal from "@/component/CustomizedCrousal";
import { Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { getPropertyDetailsApi } from "@/api/property";
import { useRouter } from "next/router";
import { IPropertyDetails, IPropertyUser } from "@/types/property";

const PropertyInfo = () => {
    const [propertyDetails, setPropertyDetails] = useState<IPropertyDetails>();
    const [propertyUser,setPropertyUser] = useState<IPropertyUser>();
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const res = await getPropertyDetailsApi(id as string);
                setPropertyDetails(res?.data?.data);
                setPropertyUser(res?.data?.data?.userResponse);
                setError(null);
            } catch (err) {
                setError("Failed to fetch property details.");
                setPropertyDetails(undefined);
            }
        };
        if (id) fetchDetails();
    }, [id]);

    return (
        <Stack direction="row" my={8}>
            <Box width={"25%"}>
               {propertyUser?.firstName && <ConnectUser propertyUser={propertyUser as IPropertyUser} />}
            </Box>
            <Box width={"75%"}>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                {propertyDetails?.id && <PropertyDetails propertyDetails={propertyDetails as IPropertyDetails} />}
            </Box>
        </Stack>
    );
};
export default PropertyInfo;