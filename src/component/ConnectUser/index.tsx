import {
    Card,
    CardContent,
    IconButton,
    Stack,
    Typography,
    Avatar,
    Box,
    Button,
    Divider,
    Chip,
    Tooltip,
} from "@mui/material";
import { IPropertyUser } from "@/types/property";
import { Call, Chat, Person, Email, Phone, WhatsApp, Share, Favorite, FavoriteBorder } from '@mui/icons-material';
import { useState } from "react";

interface IConnectUserProps {
    propertyUser: IPropertyUser;
}

const ConnectUser = (props: IConnectUserProps) => {
    const { propertyUser } = props;
    const { firstName, lastName, gender, profileImage, email, phoneNo } = propertyUser;
    const [isFavorite, setIsFavorite] = useState(false);

    return (
        <Card
            elevation={0}
            sx={{
                borderRadius: '16px',
                backgroundColor: 'white',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                overflow: 'hidden',
                height: '100%',
            }}
        >
            {/* Header with gradient */}
            <Box
                sx={{
                    height: 80,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    position: 'relative',
                }}
            >
                {/* Action buttons */}
                <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                    }}
                >
                    <Tooltip title={isFavorite ? "Remove from favorites" : "Add to favorites"}>
                        <IconButton
                            size="small"
                            onClick={() => setIsFavorite(!isFavorite)}
                            sx={{
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                color: 'white',
                                backdropFilter: 'blur(10px)',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                                },
                            }}
                        >
                            {isFavorite ? <Favorite /> : <FavoriteBorder />}
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Share profile">
                        <IconButton
                            size="small"
                            sx={{
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                color: 'white',
                                backdropFilter: 'blur(10px)',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                                },
                            }}
                        >
                            <Share />
                        </IconButton>
                    </Tooltip>
                </Stack>
            </Box>

            <CardContent sx={{ textAlign: 'center', px: 3, pb: 3 }}>
                {/* Profile Image */}
                <Box sx={{ mt: -5, mb: 2 }}>
                    <Avatar
                        src={profileImage}
                        sx={{
                            width: 100,
                            height: 100,
                            border: '4px solid white',
                            boxShadow: '0 4px 14px 0 rgba(0, 0, 0, 0.1)',
                            margin: '0 auto',
                            backgroundColor: 'primary.light',
                        }}
                    >
                        {firstName?.[0]?.toUpperCase()}{lastName?.[0]?.toUpperCase()}
                    </Avatar>
                </Box>

                {/* Name and Verification */}
                <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} mb={1}>
                    <Typography variant="h6" fontWeight={700}>
                        {firstName} {lastName}
                    </Typography>
                    {/* {verified && (
                        <Tooltip title="Verified User">
                            <VerifiedIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                        </Tooltip>
                    )} */}
                </Stack>

                {/* Rating */}
                {/* {rating && (
                    <Stack direction="row" alignItems="center" justifyContent="center" spacing={0.5} mb={2}>
                        <StarIcon sx={{ color: 'warning.main', fontSize: 18 }} />
                        <Typography variant="body2" fontWeight={600}>
                            {rating}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            (24 reviews)
                        </Typography>
                    </Stack>
                )} */}

                {/* Gender Chip */}
                <Chip
                    icon={<Person />}
                    label={gender}
                    size="small"
                    sx={{
                        mb: 2,
                        backgroundColor: gender === 'Male' ? 'info.lighter' : 'secondary.lighter',
                        color: gender === 'Male' ? 'info.main' : 'secondary.main',
                        fontWeight: 500,
                    }}
                />

                {/* Location */}
                {/* {location && (
                    <Stack direction="row" alignItems="center" justifyContent="center" spacing={0.5} mb={2}>
                        <LocationOnIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                            {location}
                        </Typography>
                    </Stack>
                )} */}

                <Divider sx={{ my: 2 }} />

                {/* Contact Info */}
                <Stack spacing={1} mb={3}>
                    {email && (
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Email sx={{ fontSize: 18, color: 'text.secondary' }} />
                            <Typography variant="body2" color="text.secondary" sx={{ wordBreak: 'break-all' }}>
                                {email}
                            </Typography>
                        </Stack>
                    )}
                    {phoneNo && (
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Phone sx={{ fontSize: 18, color: 'text.secondary' }} />
                            <Typography variant="body2" color="text.secondary">
                                {phoneNo}
                            </Typography>
                        </Stack>
                    )}
                </Stack>

                {/* Connect Actions */}
                <Typography variant="subtitle2" color="text.secondary" mb={2}>
                    Connect with {firstName}
                </Typography>

                <Stack spacing={2}>
                    <Button
                        fullWidth
                        variant="contained"
                        startIcon={<Call />}
                        sx={{
                            borderRadius: '8px',
                            textTransform: 'none',
                            fontWeight: 600,
                            py: 1.25,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #5a67d8 0%, #6b42a2 100%)',
                            },
                        }}
                    >
                        Call Now
                    </Button>

                    <Stack direction="row" spacing={1}>
                        <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<Chat />}
                            sx={{
                                borderRadius: '8px',
                                textTransform: 'none',
                                fontWeight: 500,
                                py: 1,
                                borderColor: '#e5e7eb',
                                color: 'text.primary',
                                '&:hover': {
                                    borderColor: 'primary.main',
                                    backgroundColor: 'primary.50',
                                },
                            }}
                        >
                            Chat
                        </Button>

                        <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<WhatsApp />}
                            sx={{
                                borderRadius: '8px',
                                textTransform: 'none',
                                fontWeight: 500,
                                py: 1,
                                borderColor: '#e5e7eb',
                                color: '#25D366',
                                '&:hover': {
                                    borderColor: '#25D366',
                                    backgroundColor: 'rgba(37, 211, 102, 0.04)',
                                },
                            }}
                        >
                            WhatsApp
                        </Button>
                    </Stack>
                </Stack>

                {/* Trust Badge */}
                <Box
                    sx={{
                        mt: 3,
                        p: 1.5,
                        backgroundColor: 'success.lighter',
                        borderRadius: '8px',
                        border: '1px solid',
                        borderColor: 'success.light',
                    }}
                >
                    <Typography variant="caption" color="success.dark" fontWeight={500}>
                        ✓ Identity Verified • ✓ Active User
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ConnectUser;