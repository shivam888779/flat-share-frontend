import { Box, Button, Divider, Stack, CircularProgress, Typography, Fade, Grow } from "@mui/material";
import { FilterNavbar, Footer, Header, PropertyDetailsCard } from "@/component";
import { KeyboardDoubleArrowDown } from "@mui/icons-material";
import { useGlobalContext } from "@/global-context";
import { useEffect, useState } from "react";
import { SearchPropertyCard } from "@/types/property";
import { searchPropertiesApi } from "@/api/property";
import { useRouter } from 'next/router';
import { generateDummyCards } from "@/component/UserDetailCard";

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
                    radiusKm: 5000
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
            mt={10}
            sx={{
                backgroundColor: '#f8f9fa',
                minHeight: '100vh',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Animated Background Buildings */}
            <Box
                sx={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '200px',
                    pointerEvents: 'none',
                    opacity: 0.05,
                    zIndex: 0,
                    '& .building': {
                        position: 'absolute',
                        bottom: 0,
                        background: 'linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)',
                        animation: 'float 6s ease-in-out infinite',
                    },
                    '@keyframes float': {
                        '0%, 100%': { transform: 'translateY(0)' },
                        '50%': { transform: 'translateY(-20px)' }
                    }
                }}
            >
                <Box className="building" sx={{ left: '5%', width: 60, height: 80 }} />
                <Box className="building" sx={{ left: '25%', width: 80, height: 100, animationDelay: '1s' }} />
                <Box className="building" sx={{ left: '50%', width: 70, height: 120, animationDelay: '2s' }} />
                <Box className="building" sx={{ right: '25%', width: 65, height: 90, animationDelay: '3s' }} />
                <Box className="building" sx={{ right: '5%', width: 75, height: 110, animationDelay: '4s' }} />
            </Box>

            <Box mx="auto" maxWidth="1240px" px={3} pt={4} position="relative" zIndex={1}>
                <FilterNavbar setLocation={setLocation} />

                <Divider sx={{ mb: 3, borderColor: 'rgba(108, 92, 231, 0.1)' }} />

                {/* Results Count */}
                {propertyList.length > 0 && (
                    <Fade in={true}>
                        <Typography
                            variant="body1"
                            sx={{
                                mb: 3,
                                color: '#636e72',
                                fontWeight: 500
                            }}
                        >
                            Found {propertyList.length} properties near you
                        </Typography>
                    </Fade>
                )}

                {/* Loading State */}
                {loading ? (
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        minHeight="400px"
                        flexDirection="column"
                        gap={2}
                    >
                        <CircularProgress
                            size={60}
                            sx={{ color: '#6c5ce7' }}
                        />
                        <Typography color="text.secondary">
                            Finding the best properties for you...
                        </Typography>
                    </Box>
                ) : (
                    <>
                        {/* Property Grid */}
                        <Box
                            display={"flex"}
                            flexWrap={"wrap"}
                            gap={2}
                            justifyContent={"space-between"}
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
                                ))
                            }
                        
                        </Box>

                        {/* Load More Button */}
                        {propertyList.length > 0 && (
                            <Box display="flex" justifyContent="center" my={4}>
                                <Button
                                    variant="contained"
                                    startIcon={<KeyboardDoubleArrowDown />}
                                    sx={{
                                        borderRadius: '50px',
                                        backgroundColor: '#6c5ce7',
                                        px: 4,
                                        py: 1.5,
                                        fontSize: '1rem',
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

                        {/* Empty State */}
                        {!loading && propertyList.length === 0 && location?.latitude && (
                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                justifyContent="center"
                                minHeight="400px"
                                gap={2}
                            >
                                <Typography
                                    variant="h5"
                                    color="text.secondary"
                                    sx={{ fontWeight: 600 }}
                                >
                                    No properties found
                                </Typography>
                                <Typography
                                    variant="body1"
                                    color="text.secondary"
                                    textAlign="center"
                                >
                                    Try adjusting your search filters or location
                                </Typography>
                            </Box>
                        )}
                    </>
                )}

            </Box>
        </Box>
    );
}