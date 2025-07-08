import React, { useEffect, useState } from 'react';
import { Box, Container, useTheme } from '@mui/material';
import ChatContainer from '../../component/Chat/ChatContainer';
import { IUserData } from '../../types/user';
import { useGlobalContext } from '@/global-context';
import { getConnectionsApi } from '../../api/connections';
import { IConnection } from '@/types/connection';

const ChatPage: React.FC = () => {
    const theme = useTheme();
    const [userId, setUserId] = useState<number | null>(null);
    const [approvedConnections, setApprovedConnections] = useState<IUserData[]>([]);
    const [loading, setLoading] = useState(false);
    const { state } = useGlobalContext();
    const userData = state?.userData;
    console.log(userData);

    useEffect(() => {
        const fetchApprovedConnections = async () => {
            console.log(userData?.id);
            if (userData?.id) {
                console.log(userData?.id);
                setLoading(true);
                try {
                    const response = await getConnectionsApi();
                    // Filter only approved connections
                    console.log(response);
                    const approved = response.data?.data?.map((connection: IConnection) =>
                        connection.status === 'APPROVED' ? connection.requester : undefined
                    ).filter((connection: IUserData) => connection !== undefined);

                    setApprovedConnections(approved);
                } catch (error) {
                    console.error('Error fetching connections:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchApprovedConnections();
    }, [userData?.id, state]);

    console.log(approvedConnections);

    if (!userData?.id) {
        return (
            <Box
                sx={{
                    height: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'background.default'
                }}
            >
                <Box sx={{ textAlign: 'center' }}>
                    <Box
                        component="h2"
                        sx={{
                            fontSize: '1.5rem',
                            fontWeight: 600,
                            mb: 1,
                            color: 'text.primary'
                        }}
                    >
                        Please log in to access chat
                    </Box>
                    <Box
                        component="p"
                        sx={{
                            color: 'text.secondary',
                            fontSize: '1rem'
                        }}
                    >
                        You need to be logged in to use the chat feature.
                    </Box>
                </Box>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                height: '100vh',
                bgcolor: 'background.default'
            }}
        >
            <ChatContainer
                userId={userData?.id ?? 0}
                userData={userData}
                approvedConnections={approvedConnections}
            />
        </Box>
    );
};

export default ChatPage; 