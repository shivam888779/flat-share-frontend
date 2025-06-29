import React from "react";
import { 
    Card, 
    CardContent, 
    Typography, 
    Button, 
    Box, 
    Avatar, 
    Chip,
    Stack
} from "@mui/material";
import { IConnection } from "@/types/connection";

interface ConnectionCardProps {
    connection: IConnection;
    isIncoming: boolean;
    onApprove?: () => void;
    onReject?: () => void;
    onCancel?: () => void;
    showActions?: boolean;
}

const ConnectionCard: React.FC<ConnectionCardProps> = ({
    connection,
    isIncoming,
    onApprove,
    onReject,
    onCancel,
    showActions = true,
}) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'APPROVED':
                return 'success';
            case 'REJECTED':
                return 'error';
            case 'PENDING':
                return 'warning';
            default:
                return 'default';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'APPROVED':
                return 'Approved';
            case 'REJECTED':
                return 'Rejected';
            case 'PENDING':
                return isIncoming ? 'Incoming Request' : 'Outgoing Request';
            default:
                return status;
        }
    };

    const getOtherUser = () => {
        // For incoming requests, the requester is the other user
        // For outgoing requests, the receiver is the other user
        return isIncoming ? connection.user1 : connection.user2;
    };

    const otherUser = getOtherUser();

    return (
        <Card sx={{ mb: 2, p: 2 }}>
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar 
                        src={otherUser?.profilePicture} 
                        sx={{ mr: 2, width: 56, height: 56 }}
                    >
                        {otherUser?.name?.charAt(0) || 'U'}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" component="div">
                            {otherUser?.name || 'Unknown User'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {otherUser?.email || 'No email available'}
                        </Typography>
                    </Box>
                    <Chip 
                        label={getStatusText(connection.status)} 
                        color={getStatusColor(connection.status) as any}
                        size="small"
                    />
                </Box>

                {connection.message && (
                    <Typography variant="body2" sx={{ mb: 2, fontStyle: 'italic' }}>
                        {connection.message}
                    </Typography>
                )}

                {showActions && connection.status === 'PENDING' && (
                    <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                        {isIncoming ? (
                            <>
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    size="small"
                                    onClick={onApprove}
                                >
                                    Approve
                                </Button>
                                <Button 
                                    variant="outlined" 
                                    color="error" 
                                    size="small"
                                    onClick={onReject}
                                >
                                    Reject
                                </Button>
                            </>
                        ) : (
                            <Button 
                                variant="outlined" 
                                color="error" 
                                size="small"
                                onClick={onCancel}
                            >
                                Cancel Request
                            </Button>
                        )}
                    </Stack>
                )}
            </CardContent>
        </Card>
    );
};

export default ConnectionCard; 