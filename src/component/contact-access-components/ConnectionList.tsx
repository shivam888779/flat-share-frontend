import React from "react";
import { Box, Typography } from "@mui/material";
import { IConnection } from "@/types/connection";
import ConnectionCard from "./ConnectionCard";

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
            <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Typography color="text.secondary">
                    No connections found.
                </Typography>
            </Box>
        );
    }

    return (
        <Box>
            {/* Single list of filtered connections */}
            {connections.map((connection) => {
                // Determine if this is an incoming request for the current user
                // An incoming request means the current user is the receiver (receiverId)
                const isIncoming = connection.receiverId === currentUserId;
                
                return (
                    <ConnectionCard
                        key={connection.id}
                        connection={connection}
                        isIncoming={isIncoming}
                        onApprove={onApprove ? () => onApprove(connection.id) : undefined}
                        onReject={onReject ? () => onReject(connection.id) : undefined}
                        onCancel={onCancel ? () => onCancel(connection.id) : undefined}
                        showActions={true}
                    />
                );
            })}
        </Box>
    );
};

export default ConnectionList; 