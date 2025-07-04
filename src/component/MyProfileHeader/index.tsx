import React from 'react';
import {
    Box,
    Button,
    Stack,
    Typography,
    Avatar,
    Paper,
    Badge,
    IconButton,
    Chip,
    LinearProgress,
    Tooltip,
    useTheme,
    alpha,
    Menu,
    MenuItem,
    Fade,
} from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import VerifiedIcon from '@mui/icons-material/Verified';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import StarIcon from '@mui/icons-material/Star';

const MyProfileHeader = ({
    profileData,
    isEditMode,
    setIsEditMode,
    imagePreview,
    handleSetSelectedFiles,
    profileCompletion,
}: any) => {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // Mock stats - replace with real data
    const stats = {
        views: 234,
        likes: 45,
        rating: 4.5,
        connections: 12,
    };

    return (
        <Paper
            elevation={0}
            sx={{
                borderRadius: '16px',
                backgroundColor: 'white',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                overflow: 'hidden',
                position: 'relative',
            }}
        >
            {/* Enhanced Cover Image with Pattern */}
            <Box
                sx={{
                    height: { xs: 180, sm: 200 },
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* Decorative Pattern */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        opacity: 0.1,
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                />

                {/* Cover Actions */}
                <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                    }}
                >
                    <Tooltip title="Share Profile">
                        <IconButton
                            size="small"
                            sx={{
                                backgroundColor: alpha('#fff', 0.2),
                                color: 'white',
                                backdropFilter: 'blur(10px)',
                                '&:hover': {
                                    backgroundColor: alpha('#fff', 0.3),
                                },
                            }}
                        >
                            <ShareIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="More Options">
                        <IconButton
                            size="small"
                            onClick={handleClick}
                            sx={{
                                backgroundColor: alpha('#fff', 0.2),
                                color: 'white',
                                backdropFilter: 'blur(10px)',
                                '&:hover': {
                                    backgroundColor: alpha('#fff', 0.3),
                                },
                            }}
                        >
                            <MoreVertIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Stack>

                {/* Change Cover Photo Button */}
                {isEditMode && (
                    <Button
                        size="small"
                        startIcon={<CameraAltIcon />}
                        sx={{
                            position: 'absolute',
                            bottom: 16,
                            right: 16,
                            backgroundColor: alpha('#fff', 0.2),
                            color: 'white',
                            backdropFilter: 'blur(10px)',
                            '&:hover': {
                                backgroundColor: alpha('#fff', 0.3),
                            },
                        }}
                    >
                        Change Cover
                    </Button>
                )}
            </Box>

            <Box sx={{ px: { xs: 3, sm: 4 }, pb: 4 }}>
                {/* Profile Content */}
                <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    spacing={3}
                    alignItems={{ xs: 'center', md: 'flex-start' }}
                    sx={{ mt: { xs: -5, sm: -6 } }}
                >
                    {/* Enhanced Profile Avatar */}
                    <Box sx={{ position: 'relative' }}>
                        <Badge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            badgeContent={
                                isEditMode ? (
                                    <Tooltip title="Change Profile Picture">
                                        <IconButton
                                            size="small"
                                            sx={{
                                                backgroundColor: 'primary.main',
                                                color: 'white',
                                                border: '3px solid white',
                                                '&:hover': {
                                                    backgroundColor: 'primary.dark',
                                                    transform: 'scale(1.1)',
                                                },
                                                transition: 'all 0.2s ease',
                                            }}
                                            onClick={() => document.getElementById('profile-image-input')?.click()}
                                        >
                                            <CameraAltIcon sx={{ fontSize: 20 }} />
                                        </IconButton>
                                    </Tooltip>
                                ) : null
                            }
                        >
                            <Avatar
                                src={imagePreview || profileData?.profileImage || ""}
                                sx={{
                                    width: { xs: 100, sm: 120 },
                                    height: { xs: 100, sm: 120 },
                                    border: '4px solid white',
                                    boxShadow: '0 4px 14px 0 rgba(0, 0, 0, 0.1)',
                                    backgroundColor: 'primary.light',
                                    fontSize: '2.5rem',
                                    fontWeight: 600,
                                }}
                            >
                                {profileData?.firstName?.[0]?.toUpperCase()}
                            </Avatar>
                        </Badge>
                        {profileData?.verified && (
                            <Tooltip title="Verified Profile">
                                <VerifiedIcon
                                    sx={{
                                        position: 'absolute',
                                        bottom: 8,
                                        right: 8,
                                        color: 'primary.main',
                                        fontSize: 28,
                                        backgroundColor: 'white',
                                        borderRadius: '50%',
                                        padding: '2px',
                                    }}
                                />
                            </Tooltip>
                        )}
                    </Box>

                    <input
                        id="profile-image-input"
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleSetSelectedFiles(e.target.files ? Array.from(e.target.files) : [])}
                        style={{ display: 'none' }}
                    />

                    {/* Profile Info */}
                    <Box sx={{ flex: 1, width: '100%' }}>
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            justifyContent="space-between"
                            alignItems={{ xs: 'center', sm: 'flex-start' }}
                            spacing={2}
                        >
                            <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                                {/* Name and Title */}
                                <Typography variant="h4" fontWeight={700} gutterBottom>
                                    {profileData?.firstName} {profileData?.lastName}
                                </Typography>

                                {/* Professional Info */}
                                {(profileData?.profession || profileData?.company) && (
                                    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                                        {profileData?.profession && (
                                            <Chip
                                                icon={<WorkIcon />}
                                                label={profileData.profession}
                                                size="small"
                                                sx={{ backgroundColor: alpha(theme.palette.primary.main, 0.1) }}
                                            />
                                        )}
                                        {profileData?.company && (
                                            <Typography variant="body2" color="text.secondary">
                                                at {profileData.company}
                                            </Typography>
                                        )}
                                    </Stack>
                                )}

                                {/* Contact Info */}
                                <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
                                    {profileData?.email && (
                                        <Chip
                                            icon={<EmailIcon />}
                                            label={profileData.email}
                                            size="small"
                                            variant="outlined"
                                            sx={{ mb: 1 }}
                                        />
                                    )}
                                    {profileData?.phoneNo && (
                                        <Chip
                                            icon={<PhoneIcon />}
                                            label={profileData.phoneNo}
                                            size="small"
                                            variant="outlined"
                                            sx={{ mb: 1 }}
                                        />
                                    )}
                                    {profileData?.location && (
                                        <Chip
                                            icon={<LocationOnIcon />}
                                            label={profileData.location}
                                            size="small"
                                            variant="outlined"
                                            sx={{ mb: 1 }}
                                        />
                                    )}
                                </Stack>

                                {/* Stats */}
                                <Stack direction="row" spacing={3} sx={{ mt: 2 }}>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Stack direction="row" alignItems="center" spacing={0.5}>
                                            <VisibilityIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                            <Typography variant="h6" fontWeight={600}>
                                                {stats.views}
                                            </Typography>
                                        </Stack>
                                        <Typography variant="caption" color="text.secondary">
                                            Profile Views
                                        </Typography>
                                    </Box>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Stack direction="row" alignItems="center" spacing={0.5}>
                                            <FavoriteIcon sx={{ fontSize: 16, color: 'error.main' }} />
                                            <Typography variant="h6" fontWeight={600}>
                                                {stats.likes}
                                            </Typography>
                                        </Stack>
                                        <Typography variant="caption" color="text.secondary">
                                            Likes
                                        </Typography>
                                    </Box>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Stack direction="row" alignItems="center" spacing={0.5}>
                                            <StarIcon sx={{ fontSize: 16, color: 'warning.main' }} />
                                            <Typography variant="h6" fontWeight={600}>
                                                {stats.rating}
                                            </Typography>
                                        </Stack>
                                        <Typography variant="caption" color="text.secondary">
                                            Rating
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Box>

                            {/* Action Buttons */}
                            <Stack direction={{ xs: 'row', sm: 'column' }} spacing={1} alignItems="flex-end">
                                {!isEditMode ? (
                                    <Button
                                        variant="contained"
                                        startIcon={<EditIcon />}
                                        onClick={() => setIsEditMode(true)}
                                        sx={{
                                            borderRadius: '8px',
                                            textTransform: 'none',
                                            fontWeight: 600,
                                            px: 3,
                                        }}
                                    >
                                        Edit Profile
                                    </Button>
                                ) : (
                                    <Stack direction="row" spacing={1}>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            startIcon={<CancelIcon />}
                                            onClick={() => {
                                                setIsEditMode(false);
                                                // Reset other states
                                            }}
                                            sx={{
                                                borderRadius: '8px',
                                                textTransform: 'none',
                                                fontWeight: 500,
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                    </Stack>
                                )}

                                {/* Social Links */}
                                <Stack direction="row" spacing={0.5}>
                                    <IconButton size="small" sx={{ color: '#0077b5' }}>
                                        <LinkedInIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton size="small" sx={{ color: '#1da1f2' }}>
                                        <TwitterIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton size="small" sx={{ color: '#e4405f' }}>
                                        <InstagramIcon fontSize="small" />
                                    </IconButton>
                                </Stack>
                            </Stack>
                        </Stack>

                        {/* Profile Completion with Enhanced Design */}
                        <Fade in={profileCompletion < 100}>
                            <Box
                                sx={{
                                    mt: 3,
                                    p: 2,
                                    backgroundColor: alpha(theme.palette.primary.main, 0.04),
                                    borderRadius: 2,
                                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                                }}
                            >
                                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                                    <Stack direction="row" alignItems="center" spacing={1}>
                                        <Box
                                            sx={{
                                                width: 8,
                                                height: 8,
                                                borderRadius: '50%',
                                                backgroundColor: profileCompletion === 100 ? 'success.main' : 'warning.main',
                                            }}
                                        />
                                        <Typography variant="body2" fontWeight={500}>
                                            Profile Completion
                                        </Typography>
                                    </Stack>
                                    <Stack direction="row" alignItems="center" spacing={1}>
                                        <Typography variant="body2" fontWeight={600} color="primary.main">
                                            {profileCompletion}%
                                        </Typography>
                                        {profileCompletion < 100 && (
                                            <Typography variant="caption" color="text.secondary">
                                                ({100 - profileCompletion}% to go)
                                            </Typography>
                                        )}
                                    </Stack>
                                </Stack>
                                <LinearProgress
                                    variant="determinate"
                                    value={profileCompletion}
                                    sx={{
                                        height: 6,
                                        borderRadius: 3,
                                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                        '& .MuiLinearProgress-bar': {
                                            backgroundColor: profileCompletion === 100 ? 'success.main' : 'primary.main',
                                            borderRadius: 3,
                                            background: profileCompletion === 100
                                                ? undefined
                                                : `linear-gradient(90deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
                                        },
                                    }}
                                />
                                {profileCompletion < 100 && (
                                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                                        Complete your profile to unlock all features
                                    </Typography>
                                )}
                            </Box>
                        </Fade>
                    </Box>
                </Stack>
            </Box>

            {/* Options Menu */}
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleClose}>
                    <ShareIcon fontSize="small" sx={{ mr: 1 }} />
                    Share Profile
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <VisibilityIcon fontSize="small" sx={{ mr: 1 }} />
                    View Public Profile
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <CalendarTodayIcon fontSize="small" sx={{ mr: 1 }} />
                    Download Resume
                </MenuItem>
            </Menu>
        </Paper>
    );
};

export default MyProfileHeader;