import React, { use, useEffect, useState } from 'react';
import { Box, Container, useTheme } from '@mui/material';
import ChatContainer from '../../component/Chat/ChatContainer';
import { IUserData } from '../../types/user';
import { useGlobalContext } from '@/global-context';

const ChatPage: React.FC = () => {
    const theme = useTheme();
    const [userId, setUserId] = useState<number | null>(null);
    const [approvedConnections, setApprovedConnections] = useState<IUserData[]>([]);
    const [loading, setLoading] = useState(false);
    const { state,fetchConnections  , fetchChatRooms} = useGlobalContext();
    const userData = state?.userData;
    console.log(state);

    useEffect(() => {
        fetchChatRooms();
    }, []);

 useEffect(() => {
    fetchConnections();
 }, []);

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
            <ChatContainer />
        </Box>
    );
};

export default ChatPage; 