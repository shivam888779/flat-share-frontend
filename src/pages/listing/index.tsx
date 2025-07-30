// Listing.tsx - Main listing page component
import { Box, Button, Divider, Stack, CircularProgress, Typography, Fade, Grow, Container } from "@mui/material";
import { FilterNavbar, Footer, Header, PropertyDetailsCard, PropertyDetailsCardSkeleton } from "@/component";
import { KeyboardDoubleArrowDown } from "@mui/icons-material";
import { useGlobalContext } from "@/global-context";
import { useEffect, useState } from "react";
import { SearchPropertyCard } from "@/types/property";
import { searchPropertiesApi } from "@/api/property";
import { useRouter } from 'next/router';

export default function Listing() {
    const { state } = useGlobalContext();
    const [location, setLocation] = useState<any>([]);
    const [propertyList, setPropetyList] = useState<Array<SearchPropertyCard>>([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // Restore location from query params on mount
    useEffect(() => {
        if (router.query.lat && router.query.lng) {
            setLocation({
                latitude: parseFloat(router.query.lat as string),
                longitude: parseFloat(router.query.lng as string),
                address: router.query.location as string
            });
        }
    }, [router.query.lat, router.query.lng]);

    // Update query params when location changes
    useEffect(() => {
        if (location?.latitude && location?.longitude) {
            router.replace({
                pathname: router.pathname,
                query: {
                    ...router.query,
                    lat: location.latitude,
                    lng: location.longitude,
                },
            }, undefined, { shallow: true });
        }
    }, [location]);

    useEffect(() => {
        const fetchProperties = async () => {
            if (!location?.longitude || !location?.latitude) return;
            setLoading(true);
            try {
                const payLoad = {
                    lng: location?.longitude,
                    lat: location?.latitude,
                    radiusKm: 1000
                };
                const response = await searchPropertiesApi(payLoad);
                setPropetyList(response?.data?.data);
            } finally {
                setLoading(false);
            }
        };
        fetchProperties();
    }, [location, setLocation]);

    return (
        <Box
            width="100%"

            sx={{
                backgroundColor: '#f8f9fa',
                minHeight: '100vh',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Animated Background Buildings - Responsive */}
            <Box
                sx={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: { xs: '120px', sm: '150px', md: '200px' },
                    pointerEvents: 'none',
                    opacity: { xs: 0.03, sm: 0.04, md: 0.05 },
                    zIndex: 0,
                    display: { xs: 'none', sm: 'block' }, // Hide on very small screens
                    '& .building': {
                        position: 'absolute',
                        bottom: 0,
                        background: 'linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)',
                        animation: 'float 6s ease-in-out infinite',
                        borderRadius: '4px 4px 0 0'
                    },
                    '@keyframes float': {
                        '0%, 100%': { transform: 'translateY(0)' },
                        '50%': { transform: 'translateY(-20px)' }
                    }
                }}
            >
                <Box className="building" sx={{
                    left: '5%',
                    width: { sm: 40, md: 60 },
                    height: { sm: 60, md: 80 }
                }} />
                <Box className="building" sx={{
                    left: '25%',
                    width: { sm: 50, md: 80 },
                    height: { sm: 80, md: 100 },
                    animationDelay: '1s'
                }} />
                <Box className="building" sx={{
                    left: '50%',
                    width: { sm: 45, md: 70 },
                    height: { sm: 90, md: 120 },
                    animationDelay: '2s'
                }} />
                <Box className="building" sx={{
                    right: '25%',
                    width: { sm: 35, md: 65 },
                    height: { sm: 70, md: 90 },
                    animationDelay: '3s'
                }} />
                <Box className="building" sx={{
                    right: '5%',
                    width: { sm: 55, md: 75 },
                    height: { sm: 85, md: 110 },
                    animationDelay: '4s'
                }} />
            </Box>

            {/* Main Content Container */}
            <Container
                maxWidth='xl'
                disableGutters
                sx={{
                    maxWidth: '1200px',
                    position: 'relative',
                    zIndex: 1,
                    px: { xs: 2, sm: 3, md: 4 },
                    pt: { xs: 2, sm: 3, md: 4 }
                }}
            >
                <FilterNavbar setLocation={setLocation} />

                <Divider sx={{
                    mb: { xs: 2, sm: 3 },
                    borderColor: 'rgba(108, 92, 231, 0.1)'
                }} />

                {/* Results Count - Responsive Typography */}
                {propertyList.length > 0 && (
                    <Fade in={true}>
                        <Typography
                            variant="body1"
                            sx={{
                                mb: { xs: 2, sm: 3 },
                                color: '#636e72',
                                fontWeight: 500,
                                fontSize: { xs: '0.875rem', sm: '1rem' }
                            }}
                        >
                            Found {propertyList.length} properties near you
                        </Typography>
                    </Fade>
                )}

                {/* Loading State */}
                {loading ? (
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: {
                                xs: '1fr', // 1 column on mobile
                                sm: 'repeat(2, 1fr)', // 2 columns on small tablets
                                md: 'repeat(2, 1fr)', // 2 columns on medium screens
                                lg: 'repeat(3, 1fr)', // 3 columns on large screens
                                xl: 'repeat(4, 1fr)' // 4 columns on extra large screens
                            },
                            gap: { xs: 2, sm: 2.5, md: 3 },
                            mb: { xs: 3, sm: 4 }
                        }}
                    >
                        {Array.from({ length: 10 }).map((_, index) => (
                            <PropertyDetailsCardSkeleton key={index} />
                        ))}
                    </Box>
                ) : (
                    <>
                        {/* Property Grid - Fully Responsive */}
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: {
                                    xs: '1fr', // 1 column on mobile
                                    sm: 'repeat(2, 1fr)', // 2 columns on small tablets
                                    md: 'repeat(2, 1fr)', // 2 columns on medium screens
                                    lg: 'repeat(3, 1fr)', // 3 columns on large screens
                                    xl: 'repeat(4, 1fr)' // 4 columns on extra large screens
                                },
                                gap: { xs: 2, sm: 2.5, md: 3 },
                                mb: { xs: 3, sm: 4 }
                            }}
                        >
                            {propertyList.map((data, index) => (
                                <Grow
                                    in={true}
                                    key={index}
                                    style={{ transformOrigin: '0 0 0' }}
                                    timeout={300 + index * 100}
                                >
                                    <Box>
                                        <PropertyDetailsCard propertyDetails={data as SearchPropertyCard} />
                                    </Box>
                                </Grow>
                            ))}
                        </Box>

                        {/* Load More Button - Responsive */}
                        {propertyList.length > 0 && (
                            <Box display="flex" justifyContent="center" mb={{ xs: 3, sm: 4 }}>
                                <Button
                                    variant="contained"
                                    startIcon={<KeyboardDoubleArrowDown />}
                                    sx={{
                                        borderRadius: '50px',
                                        backgroundColor: '#6c5ce7',
                                        px: { xs: 3, sm: 4 },
                                        py: { xs: 1.2, sm: 1.5 },
                                        fontSize: { xs: '0.875rem', sm: '1rem' },
                                        textTransform: 'none',
                                        boxShadow: '0 4px 20px rgba(108, 92, 231, 0.3)',
                                        '&:hover': {
                                            backgroundColor: '#5f4dd1',
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0 6px 30px rgba(108, 92, 231, 0.4)',
                                        },
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    Load More Properties
                                </Button>
                            </Box>
                        )}

                        {/* Empty State - Responsive */}
                        {!loading && propertyList.length === 0 && location?.latitude && (
                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                justifyContent="center"
                                minHeight={{ xs: '300px', sm: '400px' }}
                                gap={2}
                                px={2}
                            >
                                <Typography
                                    variant="h5"
                                    color="text.secondary"
                                    sx={{
                                        fontWeight: 600,
                                        fontSize: { xs: '1.25rem', sm: '1.5rem' },
                                        textAlign: 'center'
                                    }}
                                >
                                    No properties found
                                </Typography>
                                <Typography
                                    variant="body1"
                                    color="text.secondary"
                                    textAlign="center"
                                    sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
                                >
                                    Try adjusting your search filters or location
                                </Typography>
                            </Box>
                        )}
                    </>
                )}
            </Container>
        </Box>
    );
}
