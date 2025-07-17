import { PropertyDetails } from "@/component";
import {
    Box,
    Stack,
    Container,
    Alert,
    AlertTitle,
    Fade,
    Skeleton
} from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { IPropertyDetails, IPropertyUser } from "@/types/property";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useGlobalContext } from "@/global-context";

const PropertyInfo = () => {
    const { setState } = useGlobalContext();
    const [propertyDetails, setPropertyDetails] = useState<IPropertyDetails>({
        "location": {
            "address": "H9G4+8WH, Morna, Sector 35, Noida, Uttar Pradesh 201307, India",
            "latitude": 28.5759152,
            "longitude": 77.35734479999999
        },
        "id": 16,
        "userId": 23,
        "description": "3e32r32wr3fd",
        "security": null,
        "availableFrom": "2025-07-17",
        "createdAt": "2025-07-02T15:58:35.406461",
        "rent": 234,
        "deposit": 322,
        "mobile": "5884845525",
        "isZeroDeposit": null,
        "partnerGender": "female",
        "typeId": 1,
        "highLights": [
            3,
            7
        ],
        "resources": [
            4,
            3,
            7
        ],
        "preferences": [
            2,
            6,
            7
        ],
        "images": [
            "http://35.232.250.35/api/upload/image/property-MTc1MTQ3MTkxMzkyNHdhbGxwYXBlcmZs.jpg"
        ],
        "userResponse": {
            "id": 23,
            "firstName": "aasw",
            "lastName": "scscc",
            "email": null,
            "phoneNo": "5884845525",
            "gender": "Female",
            "description": null,
            "profileImage": "http://35.232.250.35/api/upload/image/profile-MTc1MTQ3MTg1NjYzOHRleHQuamZpZmV5.jfif",
            "requirementListed": true,
            "createdAt": "2025-07-02T15:57:39.536189",
            "updatedAt": "2025-07-02T15:58:35.436275",
            // "connections": []
        },
        "occupancy": "double"
    });
    useEffect(() => {
        setState({ myProperty: propertyDetails });
    }, []);
    const [propertyUser, setPropertyUser] = useState<IPropertyUser>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { id } = router.query;

    // useEffect(() => {
    //     const fetchDetails = async () => {
    //         try {
    //             setLoading(true);
    //             const res = await getPropertyDetailsApi(id as string);
    //             setPropertyDetails(res?.data?.data);
    //             setError(null);
    //         } catch (err) {
    //             setError("Failed to fetch property details. Please try again later.");
    //             setPropertyDetails(undefined);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //     if (id) fetchDetails();
    // }, [id]);

    if (loading) {
        return (
            <Box
                sx={{
                    minHeight: '100vh',
                    backgroundColor: '#f3f4f6',
                    py: 4,
                }}
            >
                <Container maxWidth="xl">
                    <Stack spacing={3}>
                        {/* Loading Skeleton */}
                        <Skeleton variant="text" width={300} height={40} />
                        <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3}>
                            <Box sx={{ width: { xs: '100%', lg: '25%' } }}>
                                <Skeleton variant="rounded" height={400} />
                            </Box>
                            <Box sx={{ width: { xs: '100%', lg: '75%' } }}>
                                <Skeleton variant="rounded" height={600} />
                            </Box>
                        </Stack>
                    </Stack>
                </Container>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundColor: '#f3f4f6',
                py: 4,
            }}
        >
            <Container maxWidth="xl">
                <Fade in={true} timeout={600}>
                    <Stack spacing={3}>
                        {error && (
                            <Alert
                                severity="error"
                                icon={<ErrorOutlineIcon />}
                                sx={{
                                    borderRadius: '12px',
                                    '& .MuiAlert-icon': {
                                        fontSize: '28px',
                                    },
                                }}
                            >
                                <AlertTitle>Unable to load property</AlertTitle>
                                {error}
                            </Alert>
                        )}

                        {/* Main Content */}
                        {!error && (
                            <Stack
                                direction={{ xs: 'column', lg: 'row' }}
                                spacing={3}
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Box sx={{ flex: 1, width: '100%' }} maxWidth="1040px" mx="auto" >
                                    {propertyDetails?.id && (
                                        <PropertyDetails propertyDetails={propertyDetails as IPropertyDetails} isMyProperty={true} />
                                    )}
                                </Box>
                            </Stack>
                        )}
                    </Stack>
                </Fade>
            </Container>
        </Box>
    );
};

export default PropertyInfo;