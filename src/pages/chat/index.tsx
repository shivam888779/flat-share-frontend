import React, { useEffect, useState } from 'react';
import { Box, useTheme } from '@mui/material';
import ChatContainer from '../../component/Chat/ChatContainer';
import { useGlobalContext } from '@/global-context';
import { useRouter } from 'next/router';
import { getOrCreateChatRoom } from '@/api/chat';

const ChatPage: React.FC = () => {
    const { state, fetchConnections, fetchChatRooms } = useGlobalContext();
    const userData = state?.userData;

    const router = useRouter();
    const { id } = router.query;
    useEffect(() => {
        const fetchUserChatRoom = async () => {
            if (id) {
                const { data } = await getOrCreateChatRoom(Number(id));
                if (data?.status) {
                    console.log(data);
                    fetchChatRooms();
                }
            }
            else {
                fetchChatRooms();
            }
        }


        fetchUserChatRoom();
    }, [id, router]);



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