import { ConnectUser, PropertyDetails } from "@/component";
import {
    Box,
    Stack,
    Container,
    CircularProgress,
    Alert,
    AlertTitle,
    Fade,
    Breadcrumbs,
    Link,
    Typography,
    Skeleton
} from "@mui/material";
import { useEffect, useState } from "react";
import { getPropertyDetailsApi } from "@/api/property";
import { useRouter } from "next/router";
import { IPropertyDetails, IPropertyUser } from "@/types/property";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const PropertyInfo = () => {
    const [propertyDetails, setPropertyDetails] = useState<IPropertyDetails>();
    const [propertyUser, setPropertyUser] = useState<IPropertyUser>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                setLoading(true);
                const res = await getPropertyDetailsApi(id as string);
                setPropertyDetails(res?.data?.data);
                setPropertyUser(res?.data?.data?.userResponse);
                setError(null);
            } catch (err) {
                setError("Failed to fetch property details. Please try again later.");
                setPropertyDetails(undefined);
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchDetails();
    }, [id]);

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
                        {/* Breadcrumbs */}
                        <Breadcrumbs
                            separator={<NavigateNextIcon fontSize="small" />}
                            sx={{ mb: 2 }}
                        >
                            <Link
                                underline="hover"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: 'text.secondary',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        color: 'primary.main',
                                    },
                                }}
                                onClick={() => router.push('/')}
                            >
                                <HomeIcon sx={{ mr: 0.5 }} fontSize="small" />
                                Home
                            </Link>
                            <Link
                                underline="hover"
                                sx={{
                                    color: 'text.secondary',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        color: 'primary.main',
                                    },
                                }}
                                onClick={() => router.push('/properties')}
                            >
                                Properties
                            </Link>
                            <Typography color="text.primary">
                                Property Details
                            </Typography>
                        </Breadcrumbs>

                        {/* Error State */}
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
                                alignItems="flex-start"
                            >
                                {/* Left Sidebar - User Info */}
                                <Box
                                    sx={{
                                        width: { xs: '100%', lg: '300px' },
                                        position: { lg: 'sticky' },
                                        top: { lg: 80 },
                                    }}
                                >
                                    {propertyUser?.firstName && (
                                        <ConnectUser propertyUser={propertyUser as IPropertyUser} />
                                    )}
                                </Box>

                                {/* Right Content - Property Details */}
                                <Box sx={{ flex: 1, width: '100%' }}>
                                    {propertyDetails?.id && (
                                        <PropertyDetails propertyDetails={propertyDetails as IPropertyDetails} isMyProperty={false} />
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