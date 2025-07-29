import {
    Card,
    CardContent,
    Box,
    Stack,
    Skeleton,
    useTheme,
} from '@mui/material';

const PropertyDetailsCardSkeleton = () => {
    const theme = useTheme();

    return (
        <Card
            sx={{
                width: '100%',
                minWidth: { xs: 2, sm: 2.5, md: 390 },
                maxWidth: { xs: "100%", sm: "100%", md: 390 },
                height: 'fit-content',
                position: 'relative',
                borderRadius: 2,
                boxShadow: theme.shadows[2],
                overflow: 'hidden',
            }}
        >
            {/* Building Icon Badge Skeleton - Hide on mobile */}
            <Box
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    position: 'absolute',
                    top: { sm: -8, md: -12 },
                    right: { sm: 12, md: 16 },
                    zIndex: 1
                }}
            >
                <Skeleton
                    variant="rounded"
                    sx={{
                        width: { sm: 40, md: 48 },
                        height: { sm: 40, md: 48 },
                        borderRadius: { sm: '8px', md: '12px' },
                    }}
                />
            </Box>

            {/* User Profile Section Skeleton */}
            <Box sx={{
                p: { xs: 2, sm: 2.5, md: 3 },
                pb: { xs: 1, sm: 1.5, md: 0 }
            }}>
                <Stack
                    direction="row"
                    spacing={{ xs: 1.5, sm: 2 }}
                    alignItems="center"
                    mb={{ xs: 1.5, sm: 2 }}
                >
                    {/* Avatar Skeleton */}
                    <Box sx={{ position: 'relative' }}>
                        <Skeleton
                            variant="circular"
                            sx={{
                                width: { xs: 48, sm: 56, md: 64 },
                                height: { xs: 48, sm: 56, md: 64 },
                            }}
                        />
                        {/* Status indicator skeleton */}
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                            }}
                        >
                            <Skeleton
                                variant="circular"
                                sx={{
                                    width: { xs: 16, sm: 18, md: 20 },
                                    height: { xs: 16, sm: 18, md: 20 },
                                }}
                            />
                        </Box>
                    </Box>

                    {/* User Info Skeleton */}
                    <Box flex={1} minWidth={0}>
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            alignItems={{ xs: 'flex-start', sm: 'center' }}
                            spacing={{ xs: 0.5, sm: 1 }}
                            mb={0.5}
                        >
                            {/* Name Skeleton */}
                            <Skeleton
                                variant="text"
                                sx={{
                                    width: { xs: 120, sm: 150, md: 180 },
                                    height: { xs: 24, sm: 28, md: 32 },
                                }}
                            />
                            {/* Status chip skeleton */}
                            <Skeleton
                                variant="rounded"
                                sx={{
                                    width: { xs: 60, sm: 80 },
                                    height: { xs: 20, sm: 24 },
                                    borderRadius: '12px'
                                }}
                            />
                        </Stack>
                        {/* Date skeleton */}
                        <Stack direction="row" alignItems="center" spacing={0.5}>
                            <Skeleton
                                variant="circular"
                                sx={{
                                    width: { xs: 12, sm: 14 },
                                    height: { xs: 12, sm: 14 },
                                }}
                            />
                            <Skeleton
                                variant="text"
                                sx={{
                                    width: { xs: 80, sm: 100 },
                                    height: { xs: 16, sm: 18 },
                                }}
                            />
                        </Stack>
                    </Box>

                    {/* Match Percentage Skeleton */}
                    <Box textAlign="center">
                        <Skeleton
                            variant="circular"
                            width={40}
                            height={40}
                        />
                        <Skeleton
                            variant="text"
                            width={30}
                            height={12}
                            sx={{ mt: 0.5 }}
                        />
                    </Box>
                </Stack>
            </Box>

            <CardContent sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                p: { xs: 2, sm: 2.5, md: 3 },
                pt: "0 !important",
                '&:last-child': { pb: { xs: 2, sm: 2.5, md: 3 } }
            }}>
                {/* Location Section Skeleton */}
                <Stack spacing={{ xs: 1, sm: 1.5, md: 2 }} mb={{ xs: 2, sm: 2.5, md: 3 }}>
                    {/* Location text skeleton */}
                    <Stack direction="row" alignItems="flex-start" spacing={0.5}>
                        <Skeleton
                            variant="circular"
                            sx={{
                                width: { xs: 16, sm: 18 },
                                height: { xs: 16, sm: 18 },
                                mt: 0.5
                            }}
                        />
                        <Skeleton
                            variant="text"
                            width="80%"
                            sx={{ height: { xs: 18, sm: 20 } }}
                        />
                    </Stack>

                    {/* Chips Section Skeleton */}
                    <Box>
                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing={{ xs: 0.5, sm: 1 }}
                            flexWrap="wrap"
                            gap={{ xs: 0.5, sm: 1 }}
                        >
                            <Skeleton
                                variant="rounded"
                                sx={{
                                    width: { xs: 80, sm: 100 },
                                    height: { xs: 20, sm: 24 },
                                    borderRadius: '12px'
                                }}
                            />
                            <Skeleton
                                variant="rounded"
                                sx={{
                                    width: { xs: 70, sm: 90 },
                                    height: { xs: 20, sm: 24 },
                                    borderRadius: '12px'
                                }}
                            />
                            <Skeleton
                                variant="rounded"
                                sx={{
                                    width: { xs: 60, sm: 80 },
                                    height: { xs: 20, sm: 24 },
                                    borderRadius: '12px'
                                }}
                            />
                        </Stack>
                    </Box>

                    {/* Price and Action Icons Skeleton */}
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        flexWrap="wrap"
                        gap={1}
                    >
                        {/* Price skeleton */}
                        <Box
                            sx={{
                                backgroundColor: theme.palette.action.hover,
                                borderRadius: { xs: '8px', sm: '12px' },
                                p: { xs: 1, sm: 1.5, md: 2 },
                                minWidth: 'fit-content'
                            }}
                        >
                            <Skeleton
                                variant="text"
                                sx={{
                                    width: { xs: 80, sm: 100, md: 120 },
                                    height: { xs: 28, sm: 32, md: 40 },
                                }}
                            />
                        </Box>

                        {/* Action Icons Skeleton - Mobile Only */}
                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{ display: { xs: 'flex', sm: 'none' } }}
                        >
                            <Skeleton
                                variant="rounded"
                                width={32}
                                height={32}
                                sx={{ borderRadius: '8px' }}
                            />
                            <Skeleton
                                variant="rounded"
                                width={32}
                                height={32}
                                sx={{ borderRadius: '8px' }}
                            />
                        </Stack>
                    </Stack>
                </Stack>

                {/* Action Buttons Skeleton */}
                <Box sx={{ mt: 'auto' }}>
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 1, sm: 1.5 }}
                    >
                        <Skeleton
                            variant="rounded"
                            width="100%"
                            sx={{
                                height: { xs: 36, sm: 42 },
                                borderRadius: theme.shape.borderRadius
                            }}
                        />
                        <Skeleton
                            variant="rounded"
                            width="100%"
                            sx={{
                                height: { xs: 36, sm: 42 },
                                borderRadius: theme.shape.borderRadius,
                                display: { xs: 'block', sm: 'block' }
                            }}
                        />
                    </Stack>
                </Box>
            </CardContent>
        </Card>
    );
};

export default PropertyDetailsCardSkeleton; 