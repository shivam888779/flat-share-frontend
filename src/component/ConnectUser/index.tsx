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
import { Call, Chat, Person, Email, Phone, WhatsApp, Share, Favorite, FavoriteBorder, CheckCircle, Pending, PersonAdd } from '@mui/icons-material';
import { useState } from "react";
import Link from "next/link";
import { useGlobalContext } from "@/global-context";
import { useGlobalSnackbar } from "@/hooks/useSnackbar";
import { useRouter } from "next/router";
import { RequestContact } from "../contact-access-components";

interface IConnectUserProps {
    propertyUser: IPropertyUser;
    userStatus?: string; // Add userStatus prop
}

const ConnectUser = (props: IConnectUserProps) => {
    const { propertyUser } = props;
    const { firstName, lastName, gender, profileImage, email, phoneNo, id, userStatus = 'notConnected' } = propertyUser;
    const [isFavorite, setIsFavorite] = useState(false);
    const [openRequestContact, setOpenRequestContact] = useState(false);

    const { state, handleLoginDialog } = useGlobalContext();
    const { success } = useGlobalSnackbar();
    const { connections, userData } = state;
    const router = useRouter();

    // Get status configuration based on userStatus
    const getStatusConfig = (status: string) => {
        switch (status) {
            case 'connected':
                return {
                    icon: <CheckCircle sx={{ fontSize: 16 }} />,
                    label: 'Connected',
                    color: '#00b894',
                    backgroundColor: '#00b89420'
                };
            case 'pending':
                return {
                    icon: <Pending sx={{ fontSize: 16 }} />,
                    label: 'Pending',
                    color: '#fdcb6e',
                    backgroundColor: '#fdcb6e20'
                };
            case 'notConnected':
            default:
                return {
                    icon: <PersonAdd sx={{ fontSize: 16 }} />,
                    label: 'Connect',
                    color: '#6c5ce7',
                    backgroundColor: '#6c5ce720'
                };
        }
    };

    const statusConfig = getStatusConfig(userStatus);

    const handleContact = (type: "chat" | "phone" | "whatsapp") => {
        if (!userData.isLoggedIn) {
            handleLoginDialog(true);
            return;
        }

        // Handle based on userStatus
        if (userStatus === 'connected') {
            if (type === "phone") {
                const connectionData = connections.find(connection => connection.otherUser?.id === id);
                if (connectionData?.otherUser?.phoneNo) {
                    window.location.href = `tel:${connectionData.otherUser.phoneNo}`;
                } else if (phoneNo) {
                    window.location.href = `tel:${phoneNo}`;
                }
            } else if (type === "chat") {
                router.push(`/chat?id=${id}`);
            } else if (type === "whatsapp") {
                const connectionData = connections.find(connection => connection.otherUser?.id === id);
                const phone = connectionData?.otherUser?.phoneNo || phoneNo;
                if (phone) {
                    window.open(`https://wa.me/${phone.replace(/[^0-9]/g, '')}`, '_blank');
                }
            }
        } else if (userStatus === 'pending') {
            success('Connection request is pending approval');
            return;
        } else {
            // userStatus is 'notConnected'
            setOpenRequestContact(true);
        }
    };

    const handleCallNow = () => {
        handleContact("phone");
    };

    console.log(propertyUser);

    return (
        <>
            <RequestContact
                open={openRequestContact}
                onClose={() => { setOpenRequestContact(false) }}
                userId={id ?? 0}
            />

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
                    {/* Status indicator in header */}
                    {userStatus === 'connected' && (
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 8,
                                left: 8,
                            }}
                        >
                            <Chip
                                icon={statusConfig.icon}
                                label={statusConfig.label}
                                size="small"
                                sx={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                    color: statusConfig.color,
                                    fontWeight: 600,
                                }}
                            />
                        </Box>
                    )}
                </Box>

                <CardContent sx={{ textAlign: 'center', px: 3, pb: 3 }}>
                    {/* Profile Image */}
                    <Link href={`/user/${id}`}>
                        <Box sx={{ mt: -5, mb: 2, position: 'relative' }}>
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
                            {/* Status indicator on avatar for connected users */}
                            {userStatus === 'connected' && (
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        bottom: 0,
                                        right: '50%',
                                        transform: 'translateX(50%)',
                                        width: 24,
                                        height: 24,
                                        borderRadius: '50%',
                                        backgroundColor: '#00b894',
                                        border: '3px solid white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <CheckCircle sx={{
                                        fontSize: 14,
                                        color: 'white'
                                    }} />
                                </Box>
                            )}
                        </Box>

                        {/* Name and Status */}
                        <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} mb={1}>
                            <Typography variant="h6" fontWeight={700}>
                                {firstName} {lastName}
                            </Typography>
                        </Stack>

                        {/* Status Chip for all statuses */}
                        <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} mb={2}>
                            <Chip
                                icon={statusConfig.icon}
                                label={statusConfig.label}
                                size="small"
                                sx={{
                                    backgroundColor: statusConfig.backgroundColor,
                                    color: statusConfig.color,
                                    fontWeight: 600,
                                }}
                            />
                        </Stack>

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
                    </Link>

                    <Divider sx={{ my: 2 }} />

                    {/* Contact Info - Only show if connected */}
                    {userStatus === 'connected' && (
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
                    )}

                    {/* Connect Actions */}
                    <Typography variant="subtitle2" color="text.secondary" mb={2}>
                        {userStatus === 'connected' ? `Connect with ${firstName}` :
                            userStatus === 'pending' ? 'Connection Pending' :
                                `Connect with ${firstName}`}
                    </Typography>

                    <Stack spacing={2}>
                        {userStatus === 'connected' ? (
                            // Show all contact options when connected
                            <>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    startIcon={<Call />}
                                    onClick={handleCallNow}
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
                                        onClick={() => handleContact("chat")}
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
                                        onClick={() => handleContact("whatsapp")}
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
                            </>
                        ) : (
                            // Show status-based button for pending/not connected
                            <Button
                                fullWidth
                                variant="outlined"
                                startIcon={statusConfig.icon}
                                onClick={() => handleContact("chat")}
                                sx={{
                                    borderRadius: '8px',
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    py: 1.25,
                                    borderColor: statusConfig.color,
                                    color: statusConfig.color,
                                    backgroundColor: statusConfig.backgroundColor,
                                    '&:hover': {
                                        backgroundColor: statusConfig.backgroundColor,
                                        opacity: 0.8,
                                    },
                                }}
                            >
                                {statusConfig.label}
                            </Button>
                        )}
                    </Stack>
                </CardContent>
            </Card>
        </>
    );
};

export default ConnectUser;