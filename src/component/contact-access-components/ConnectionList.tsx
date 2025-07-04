import React from "react";
import {
    Box,
    Typography,
    Stack,
    Button,
    Fade,
} from "@mui/material";
import { IConnection } from "@/types/connection";
import ConnectionCard from "./ConnectionCard";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';

interface ConnectionListProps {
    connections: IConnection[];
    currentUserId: number;
    onApprove: (connectionId: number) => void;
    onReject: (connectionId: number) => void;
    onCancel: (connectionId: number) => void;
}

const ConnectionList: React.FC<ConnectionListProps> = ({
    connections,
    currentUserId,
    onApprove,
    onReject,
    onCancel,
}) => {
    // If no filtered results, show empty state
    if (connections.length === 0) {
        return (
            <Fade in={true} timeout={500}>
                <Box
                    sx={{
                        py: 8,
                        px: 4,
                        textAlign: 'center',
                        backgroundColor: '#f9fafb',
                        borderRadius: '12px',
                        mt: 3,
                    }}
                >
                    <Box
                        sx={{
                            width: 100,
                            height: 100,
                            borderRadius: '50%',
                            backgroundColor: 'grey.200',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mx: 'auto',
                            mb: 3,
                        }}
                    >
                        <SearchOffIcon sx={{ fontSize: 48, color: 'grey.400' }} />
                    </Box>
                    <Typography
                        variant="h6"
                        fontWeight={600}
                        color="text.primary"
                        gutterBottom
                    >
                        No connections found
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 4, maxWidth: 400, mx: 'auto' }}
                    >
                        Try adjusting your filters or search criteria to find connections
                    </Typography>
                    <Stack direction="row" spacing={2} justifyContent="center">
                        <Button
                            variant="contained"
                            startIcon={<PersonSearchIcon />}
                            sx={{
                                borderRadius: '8px',
                                textTransform: 'none',
                                fontWeight: 600,
                                px: 3,
                            }}
                        >
                            Find Learners
                        </Button>
                        <Button
                            variant="outlined"
                            sx={{
                                borderRadius: '8px',
                                textTransform: 'none',
                                fontWeight: 500,
                            }}
                        >
                            Clear Filters
                        </Button>
                    </Stack>
                </Box>
            </Fade>
        );
    }

    return (
        <Stack spacing={2}>
            {connections.map((connection, index) => {
                // Determine if this is an incoming request for the current user
                const isIncoming = connection.receiverId === currentUserId;

                return (
                    <Fade
                        key={connection.id}
                        in={true}
                        timeout={300}
                        style={{ transitionDelay: `${index * 50}ms` }}
                    >
                        <Box>
                            <ConnectionCard
                                connection={connection}
                                isIncoming={isIncoming}
                                currentUserId={currentUserId}
                                onApprove={onApprove ? () => onApprove(connection.id) : undefined}
                                onReject={onReject ? () => onReject(connection.id) : undefined}
                                onCancel={onCancel ? () => onCancel(connection.id) : undefined}
                                showActions={true}
                            />
                        </Box>
                    </Fade>
                );
            })}
        </Stack>
    );
};

export default ConnectionList;