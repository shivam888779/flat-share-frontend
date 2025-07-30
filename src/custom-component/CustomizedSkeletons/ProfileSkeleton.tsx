import { Box, Paper, Stack, Skeleton, Divider, useTheme } from "@mui/material";

const ProfileSkeleton = () => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: (theme) => theme.palette.mode === 'dark'
                    ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
                    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                py: 4,
            }}
        >
            <Box maxWidth="1000px" mx="auto" px={2}>
                <Stack spacing={4}>
                    {/* Profile Header Card Skeleton */}
                    <Paper
                        elevation={0}
                        sx={{
                            borderRadius: 3,
                            background: (theme) => theme.palette.mode === 'dark'
                                ? 'linear-gradient(145deg, #2a2d3d 0%, #212332 100%)'
                                : 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                            boxShadow: (theme) => theme.palette.mode === 'dark'
                                ? '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.1)'
                                : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                            border: (theme) => `1px solid ${theme.palette.divider}`,
                            overflow: 'hidden',
                            position: 'relative',
                        }}
                    >
                        {/* Decorative Background Pattern */}
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                width: '300px',
                                height: '200px',
                                background: (theme) => theme.palette.mode === 'dark'
                                    ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.08) 100%)'
                                    : 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.05) 100%)',
                                borderRadius: '0 24px 0 100%',
                            }}
                        />

                        <Box sx={{ position: 'relative', p: { xs: 3, sm: 4 } }}>
                            {/* Profile Completion Bar Skeleton */}
                            <Box mb={4}>
                                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                                    <Skeleton variant="text" width={140} height={20} />
                                    <Skeleton variant="rounded" width={50} height={24} />
                                </Stack>
                                <Skeleton variant="rounded" width="100%" height={8} />
                            </Box>

                            {/* Profile Avatar Section Skeleton */}
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4} alignItems="center" mb={4}>
                                <Stack alignItems="center">
                                    <Box sx={{ position: 'relative' }}>
                                        <Skeleton variant="circular" width={140} height={140} />
                                        {/* Badge skeleton */}
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                bottom: 8,
                                                right: 8,
                                            }}
                                        >
                                            <Skeleton variant="circular" width={40} height={40} />
                                        </Box>
                                    </Box>
                                </Stack>

                                <Stack flex={1} alignItems={{ xs: 'center', sm: 'flex-start' }} textAlign={{ xs: 'center', sm: 'left' }}>
                                    <Skeleton variant="text" width={250} height={40} sx={{ mb: 1 }} />
                                    <Skeleton variant="text" width={350} height={24} sx={{ mb: 2 }} />
                                    <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent={{ xs: 'center', sm: 'flex-start' }}>
                                        <Skeleton variant="rounded" width={80} height={24} />
                                        <Skeleton variant="rounded" width={120} height={24} />
                                    </Stack>
                                </Stack>
                            </Stack>

                            {/* Action Buttons Skeleton */}
                            <Stack direction="row" justifyContent="flex-end" spacing={2}>
                                <Skeleton variant="rounded" width={120} height={40} />
                            </Stack>
                        </Box>
                    </Paper>

                    {/* Profile Details Card Skeleton */}
                    <Paper
                        elevation={0}
                        sx={{
                            borderRadius: 3,
                            bgcolor: 'background.paper',
                            boxShadow: (theme) => theme.palette.mode === 'dark'
                                ? '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.1)'
                                : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                            border: (theme) => `1px solid ${theme.palette.divider}`,
                            overflow: 'hidden',
                        }}
                    >
                        <Box sx={{ p: { xs: 3, sm: 4 } }}>
                            <Skeleton variant="text" width={200} height={32} sx={{ mb: 3 }} />

                            <Stack spacing={4}>
                                {/* Personal Information Section Skeleton */}
                                <Stack spacing={2}>
                                    <Stack direction="row" alignItems="center" spacing={1}>
                                        <Skeleton variant="circular" width={20} height={20} />
                                        <Skeleton variant="text" width={180} height={24} />
                                    </Stack>
                                    <Stack spacing={2}>
                                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                            <Box
                                                flex={1}
                                                sx={{
                                                    p: 2.5,
                                                    borderRadius: 2,
                                                    bgcolor: (theme) => theme.palette.mode === 'dark'
                                                        ? 'rgba(144, 202, 249, 0.08)'
                                                        : 'rgba(25, 118, 210, 0.04)',
                                                    border: (theme) => `1px solid ${theme.palette.primary.main}20`,
                                                }}
                                            >
                                                <Skeleton variant="text" width={80} height={16} sx={{ mb: 0.5 }} />
                                                <Skeleton variant="text" width={120} height={20} />
                                            </Box>
                                            <Box
                                                flex={1}
                                                sx={{
                                                    p: 2.5,
                                                    borderRadius: 2,
                                                    bgcolor: (theme) => theme.palette.mode === 'dark'
                                                        ? 'rgba(144, 202, 249, 0.08)'
                                                        : 'rgba(25, 118, 210, 0.04)',
                                                    border: (theme) => `1px solid ${theme.palette.primary.main}20`,
                                                }}
                                            >
                                                <Skeleton variant="text" width={80} height={16} sx={{ mb: 0.5 }} />
                                                <Skeleton variant="text" width={100} height={20} />
                                            </Box>
                                        </Stack>

                                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                            <Box
                                                flex={1}
                                                sx={{
                                                    p: 2.5,
                                                    borderRadius: 2,
                                                    bgcolor: (theme) => theme.palette.mode === 'dark'
                                                        ? 'rgba(144, 202, 249, 0.08)'
                                                        : 'rgba(25, 118, 210, 0.04)',
                                                    border: (theme) => `1px solid ${theme.palette.primary.main}20`,
                                                }}
                                            >
                                                <Skeleton variant="text" width={60} height={16} sx={{ mb: 0.5 }} />
                                                <Skeleton variant="text" width={80} height={20} />
                                            </Box>
                                            <Box
                                                flex={1}
                                                sx={{
                                                    p: 2.5,
                                                    borderRadius: 2,
                                                    bgcolor: (theme) => theme.palette.mode === 'dark'
                                                        ? 'rgba(144, 202, 249, 0.08)'
                                                        : 'rgba(25, 118, 210, 0.04)',
                                                    border: (theme) => `1px solid ${theme.palette.primary.main}20`,
                                                }}
                                            >
                                                <Skeleton variant="text" width={100} height={16} sx={{ mb: 0.5 }} />
                                                <Stack direction="row" alignItems="center" spacing={1}>
                                                    <Skeleton variant="circular" width={16} height={16} />
                                                    <Skeleton variant="text" width={120} height={20} />
                                                </Stack>
                                            </Box>
                                        </Stack>
                                    </Stack>
                                </Stack>

                                <Divider />

                                {/* Contact Information Section Skeleton */}
                                <Stack spacing={2}>
                                    <Stack direction="row" alignItems="center" spacing={1}>
                                        <Skeleton variant="circular" width={20} height={20} />
                                        <Skeleton variant="text" width={160} height={24} />
                                    </Stack>
                                    <Stack spacing={2}>
                                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                            <Box
                                                flex={1}
                                                sx={{
                                                    p: 2.5,
                                                    borderRadius: 2,
                                                    bgcolor: (theme) => theme.palette.mode === 'dark'
                                                        ? 'rgba(129, 199, 132, 0.08)'
                                                        : 'rgba(46, 125, 50, 0.04)',
                                                    border: (theme) => `1px solid ${theme.palette.success.main}20`,
                                                }}
                                            >
                                                <Skeleton variant="text" width={100} height={16} sx={{ mb: 0.5 }} />
                                                <Skeleton variant="text" width={180} height={20} />
                                            </Box>
                                            <Box
                                                flex={1}
                                                sx={{
                                                    p: 2.5,
                                                    borderRadius: 2,
                                                    bgcolor: (theme) => theme.palette.mode === 'dark'
                                                        ? 'rgba(129, 199, 132, 0.08)'
                                                        : 'rgba(46, 125, 50, 0.04)',
                                                    border: (theme) => `1px solid ${theme.palette.success.main}20`,
                                                }}
                                            >
                                                <Skeleton variant="text" width={100} height={16} sx={{ mb: 0.5 }} />
                                                <Stack direction="row" alignItems="center" spacing={1}>
                                                    <Skeleton variant="circular" width={16} height={16} />
                                                    <Skeleton variant="text" width={140} height={20} />
                                                </Stack>
                                            </Box>
                                        </Stack>
                                    </Stack>
                                </Stack>

                                <Divider />

                                {/* Description Section Skeleton */}
                                <Stack spacing={2}>
                                    <Stack direction="row" alignItems="center" spacing={1}>
                                        <Skeleton variant="circular" width={20} height={20} />
                                        <Skeleton variant="text" width={100} height={24} />
                                    </Stack>
                                    <Box
                                        sx={{
                                            p: 3,
                                            borderRadius: 2,
                                            bgcolor: (theme) => theme.palette.mode === 'dark'
                                                ? 'rgba(255, 183, 77, 0.08)'
                                                : 'rgba(245, 124, 0, 0.04)',
                                            border: (theme) => `1px solid ${theme.palette.warning.main}20`,
                                        }}
                                    >
                                        <Skeleton variant="text" width="100%" height={20} sx={{ mb: 1 }} />
                                        <Skeleton variant="text" width="80%" height={20} sx={{ mb: 1 }} />
                                        <Skeleton variant="text" width="60%" height={20} />
                                    </Box>
                                </Stack>
                            </Stack>
                        </Box>
                    </Paper>
                </Stack>
            </Box>
        </Box>
    );
};


export default ProfileSkeleton; 