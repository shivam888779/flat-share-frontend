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
import { getPropertyDetailsApi } from "@/api/property";

const PropertyInfo = () => {
    const { setState, state: { userData } } = useGlobalContext();
    const [propertyDetails, setPropertyDetails] = useState<IPropertyDetails | null>(null);

    const [propertyUser, setPropertyUser] = useState<IPropertyUser>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                setLoading(true);
                const res = await getPropertyDetailsApi(userData?.propertySlug);
                setPropertyDetails(res?.data?.data);
                setState({ myProperty: {...res?.data?.data,availableFrom: res?.data?.data?.availableFrom.substring(0,10)} });
                setError(null);
            } catch (err) {
                setError("Failed to fetch property details. Please try again later.");
                setState({ myProperty: null });
                setPropertyDetails(null);
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, []);

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