import React, { useState, useMemo, useCallback } from 'react';
import { Box, List, ListItem, ListItemAvatar, ListItemText, Avatar, Typography, Badge, IconButton, Chip, Skeleton, Divider, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, useTheme, Paper, InputAdornment, Fade, Slide } from '@mui/material';
import { Delete, Circle, FiberManualRecord, Add, Search, Close } from '@mui/icons-material';
import { IChatRoom, IUserData, ChatSidebarProps } from '@/types/chat';
import { formatDistanceToNow } from 'date-fns';
import { useGlobalContext } from '@/global-context';
import { IConnection } from '@/types/connection';
import { useRouter } from 'next/router';

const ChatSidebar: React.FC<ChatSidebarProps> = ({
    chatRooms,
    unreadCount,
    isConnected,
    loading,
    onChatRoomSelect,
    onDeleteChatRoom,
    userData,
}) => {
    const theme = useTheme();
    const [showNewChatDialog, setShowNewChatDialog] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { state } = useGlobalContext();
    const router = useRouter();

    // Memoize filtered connections
    const filteredConnections = useMemo(() => {
        if (!Array.isArray(state?.connections)) return [];

        return state.connections
            .filter((connection: IConnection) => connection.status === 'APPROVED')
            .map((connection: IConnection) => {
                return connection.otherUser;
            })
            .filter((user: IUserData | undefined) => {
                if (!user) return false;

                const hasExistingChat = chatRooms.some(room => {
                    const otherUserId = room.user1Id === userData.id ? room.user2Id : room.user1Id;
                    return otherUserId === user?.id;
                });

                const matchesSearch = !searchQuery ||
                    `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchQuery.toLowerCase());

                return !hasExistingChat && matchesSearch;
            });
    }, [state?.connections, userData.id, chatRooms, searchQuery]);

    // Memoize getOtherUser function
    const getOtherUser = useCallback((chatRoom: IChatRoom): IUserData => {
        if (chatRoom.user1 && chatRoom.user2) {
            return chatRoom.user1Id === userData.id ? chatRoom.user2 : chatRoom.user1;
        }

        if (chatRoom.otherUser) {
            return chatRoom.otherUser;
        }

        return {
            id: chatRoom.user1Id === userData.id ? chatRoom.user2Id : chatRoom.user1Id,
            firstName: 'Unknown',
            lastName: 'User',
            profileImage: '',
            email: null,
            phoneNo: '',
            gender: 'Male' as const,
            description: null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            verified: false,
            isLoggedIn: false,
            requirementListed: false
        };
    }, [userData.id]);

    // Memoize utility functions
    const formatLastMessageTime = useCallback((timestamp: string) => {
        try {
            return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
        } catch {
            return 'Unknown time';
        }
    }, []);

    const truncateMessage = useCallback((message: string, maxLength: number = 50) => {
        return message.length > maxLength ? `${message.substring(0, maxLength)}...` : message;
    }, []);

    // Handle start new chat with useCallback
    const handleStartNewChat = useCallback((connectionId: number) => {
        router.push(`/chat?id=${connectionId}`).then(() => {
            setShowNewChatDialog(false);
            setSearchQuery('');
        });
    }, [router]);

    // Handle dialog actions with useCallback
    const handleOpenNewChatDialog = useCallback(() => {
        setShowNewChatDialog(true);
    }, []);

    const handleCloseNewChatDialog = useCallback(() => {
        setShowNewChatDialog(false);
        setSearchQuery('');
    }, []);

    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    }, []);

    const handleClearSearch = useCallback(() => {
        setSearchQuery('');
    }, []);

    // Handle chat room selection with useCallback
    const handleChatRoomSelect = useCallback((chatRoomId: string) => {
        onChatRoomSelect(chatRoomId);
    }, [onChatRoomSelect]);

    // Handle delete chat room with useCallback
    const handleDeleteChatRoom = useCallback((e: React.MouseEvent, chatRoomId: number) => {
        e.stopPropagation();
        onDeleteChatRoom(chatRoomId);
    }, [onDeleteChatRoom]);

    // Calculate total unread count from all chat rooms
    const totalUnreadCount = useMemo(() => {
        return chatRooms?.reduce((total, room) => total + (room.unreadCount || 0), 0) || 0;
    }, [chatRooms]);

    if (loading) {
        return (
            <Box sx={{ p: 3 }}>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
                    Conversations
                </Typography>
                {[...Array(5)].map((_, index) => (
                    <Paper
                        key={index}
                        elevation={1}
                        sx={{
                            p: 2,
                            mb: 2,
                            borderRadius: 2,
                            bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.50'
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Skeleton variant="circular" width={56} height={56} />
                            <Box sx={{ ml: 2, flex: 1 }}>
                                <Skeleton variant="text" width="70%" height={24} />
                                <Skeleton variant="text" width="50%" height={20} />
                            </Box>
                        </Box>
                    </Paper>
                ))}
            </Box>
        );
    }

    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <Box
                sx={{
                    p: 3,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    background: theme.palette.mode === 'dark'
                        ? 'linear-gradient(135deg, rgba(18, 18, 18, 0.9) 0%, rgba(24, 24, 24, 0.9) 100%)'
                        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)'
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary' }}>
                        Messages
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Chip
                            icon={
                                <Circle
                                    sx={{
                                        color: isConnected ? theme.palette.success.main : theme.palette.error.main,
                                        fontSize: '0.75rem'
                                    }}
                                />
                            }
                            label={isConnected ? 'Online' : 'Offline'}
                            size="small"
                            color={isConnected ? 'success' : 'error'}
                            variant="outlined"
                            sx={{
                                borderRadius: 2,
                                fontWeight: 500
                            }}
                        />
                        {totalUnreadCount > 0 && (
                            <Badge
                                badgeContent={totalUnreadCount}
                                color="primary"
                                sx={{
                                    '& .MuiBadge-badge': {
                                        fontSize: '0.75rem',
                                        minWidth: 20,
                                        height: 20,
                                        fontWeight: 600
                                    }
                                }}
                            />
                        )}
                    </Box>
                </Box>

                {/* Start New Chat Button */}
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    fullWidth
                    onClick={handleOpenNewChatDialog}
                    sx={{
                        py: 1.5,
                        borderRadius: 2,
                        fontWeight: 600,
                        fontSize: '1rem',
                        textTransform: 'none',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        boxShadow: theme.shadows[4],
                        '&:hover': {
                            background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                            boxShadow: theme.shadows[8],
                            transform: 'translateY(-1px)'
                        },
                        transition: 'all 0.3s ease'
                    }}
                >
                    Start New Chat
                </Button>
            </Box>

            {/* Chat Rooms List */}
            <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
                {chatRooms?.length === 0 ? (
                    <Fade in={true}>
                        <Paper
                            elevation={2}
                            sx={{
                                p: 4,
                                textAlign: 'center',
                                borderRadius: 3,
                                bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.50',
                                border: `1px dashed ${theme.palette.divider}`
                            }}
                        >
                            <Box
                                sx={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: '50%',
                                    bgcolor: 'primary.main',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mx: 'auto',
                                    mb: 2,
                                    opacity: 0.7
                                }}
                            >
                                <Box component="span" sx={{ fontSize: '1.5rem', color: 'white' }}>💬</Box>
                            </Box>
                            <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                                No conversations yet
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Start chatting with your approved connections
                            </Typography>
                        </Paper>
                    </Fade>
                ) : (
                    <List sx={{ p: 0, gap: 1, display: 'flex', flexDirection: 'column' }}>
                        {chatRooms?.map((chatRoom, index) => {
                            const otherUser = getOtherUser(chatRoom);
                            const isOnline = false; // TODO: Implement online status

                            return (
                                <Fade key={chatRoom.id} in={true} timeout={200 + index * 50}>
                                    <Paper
                                        elevation={1}
                                        sx={{
                                            borderRadius: 2,
                                            overflow: 'hidden',
                                            border: `1px solid ${theme.palette.divider}`,
                                            bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'background.paper',
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                elevation: 4,
                                                transform: 'translateY(-2px)',
                                                boxShadow: theme.shadows[8],
                                                '& .delete-button': {
                                                    opacity: 1
                                                }
                                            }
                                        }}
                                    >
                                        <ListItem
                                            button
                                            onClick={() => handleChatRoomSelect(chatRoom.id.toString())}
                                            sx={{
                                                p: 2,
                                                cursor: 'pointer'
                                            }}
                                        >
                                            <ListItemAvatar>
                                                <Badge
                                                    overlap="circular"
                                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                                    badgeContent={
                                                        <FiberManualRecord
                                                            sx={{
                                                                color: isOnline ? theme.palette.success.main : theme.palette.grey[400],
                                                                fontSize: '0.875rem',
                                                                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                                                            }}
                                                        />
                                                    }
                                                >
                                                    <Avatar
                                                        src={otherUser.profileImage}
                                                        alt={`${otherUser.firstName} ${otherUser.lastName}`}
                                                        sx={{
                                                            width: 56,
                                                            height: 56,
                                                            border: `2px solid ${chatRoom.unreadCount > 0 ? theme.palette.primary.main : 'transparent'}`,
                                                            boxShadow: theme.shadows[2]
                                                        }}
                                                    >
                                                        {otherUser.firstName?.charAt(0) || '?'}{otherUser.lastName?.charAt(0) || '?'}
                                                    </Avatar>
                                                </Badge>
                                            </ListItemAvatar>

                                            <ListItemText
                                                primary={
                                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
                                                        <Typography
                                                            variant="subtitle1"
                                                            sx={{
                                                                fontWeight: chatRoom.unreadCount > 0 ? 700 : 500,
                                                                color: 'text.primary',
                                                                fontSize: '1rem'
                                                            }}
                                                        >
                                                            {otherUser.firstName} {otherUser.lastName}
                                                        </Typography>
                                                        {chatRoom.lastMessage && (
                                                            <Typography
                                                                variant="caption"
                                                                sx={{
                                                                    color: 'text.secondary',
                                                                    fontSize: '0.75rem',
                                                                    fontWeight: 500
                                                                }}
                                                            >
                                                                {formatLastMessageTime(chatRoom.lastMessage.createdAt)}
                                                            </Typography>
                                                        )}
                                                    </Box>
                                                }
                                                secondary={
                                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                        <Typography
                                                            variant="body2"
                                                            sx={{
                                                                color: chatRoom.unreadCount > 0 ? 'text.primary' : 'text.secondary',
                                                                fontWeight: chatRoom.unreadCount > 0 ? 500 : 400,
                                                                maxWidth: 200,
                                                                overflow: 'hidden',
                                                                textOverflow: 'ellipsis',
                                                                whiteSpace: 'nowrap',
                                                                fontSize: '0.875rem'
                                                            }}
                                                        >
                                                            {chatRoom?.lastMessage ? truncateMessage(chatRoom.lastMessage.message) : 'No messages yet'}
                                                        </Typography>
                                                        {chatRoom.unreadCount > 0 && (
                                                            <Badge
                                                                badgeContent={chatRoom.unreadCount}
                                                                color="primary"
                                                                sx={{
                                                                    '& .MuiBadge-badge': {
                                                                        fontSize: '0.625rem',
                                                                        minWidth: 18,
                                                                        height: 18,
                                                                        fontWeight: 600,
                                                                        boxShadow: theme.shadows[2]
                                                                    }
                                                                }}
                                                            />
                                                        )}
                                                    </Box>
                                                }
                                            />

                                            <IconButton
                                                className="delete-button"
                                                size="small"
                                                onClick={(e) => handleDeleteChatRoom(e, chatRoom.id)}
                                                sx={{
                                                    opacity: 0,
                                                    transition: 'all 0.3s ease',
                                                    color: 'error.main',
                                                    '&:hover': {
                                                        bgcolor: 'error.light',
                                                        color: 'error.contrastText',
                                                        transform: 'scale(1.1)'
                                                    }
                                                }}
                                            >
                                                <Delete fontSize="small" />
                                            </IconButton>
                                        </ListItem>
                                    </Paper>
                                </Fade>
                            );
                        })}
                    </List>
                )}
            </Box>

            {/* New Chat Dialog */}
            <Dialog
                open={showNewChatDialog}
                onClose={handleCloseNewChatDialog}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: 3,
                        bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'background.paper',
                        backdropFilter: 'blur(20px)'
                    }
                }}
            >
                <DialogTitle sx={{
                    pb: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '1.5rem',
                    fontWeight: 700
                }}>
                    Start New Chat
                    <IconButton onClick={handleCloseNewChatDialog} size="small">
                        <Close />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ pt: 2 }}>
                    <TextField
                        fullWidth
                        placeholder="Search approved connections..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search sx={{ color: 'text.secondary' }} />
                                </InputAdornment>
                            ),
                            endAdornment: searchQuery && (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleClearSearch} size="small">
                                        <Close fontSize="small" />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        sx={{
                            mb: 3,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2
                            }
                        }}
                    />

                    <Box sx={{ maxHeight: 350, overflow: 'auto' }}>
                        {filteredConnections.length === 0 ? (
                            <Paper
                                elevation={1}
                                sx={{
                                    p: 4,
                                    textAlign: 'center',
                                    borderRadius: 2,
                                    bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.50'
                                }}
                            >
                                <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                                    {searchQuery ? 'No connections found' : 'No new connections available'}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {searchQuery ? 'Try a different search term' : 'All your connections already have active chats'}
                                </Typography>
                            </Paper>
                        ) : (
                            <List sx={{ p: 0 }}>
                                {filteredConnections.map((connection, index) => (
                                    <Slide key={connection?.id} in={true} direction="up" timeout={200 + index * 50}>
                                        <Paper
                                            elevation={1}
                                            sx={{
                                                mb: 1,
                                                borderRadius: 2,
                                                overflow: 'hidden',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    elevation: 4,
                                                    transform: 'translateY(-1px)',
                                                    bgcolor: 'action.hover'
                                                }
                                            }}
                                        >
                                            <ListItem
                                                button
                                                onClick={() => handleStartNewChat(connection?.id || 0)}
                                                sx={{ p: 2 }}
                                            >
                                                <ListItemAvatar>
                                                    <Avatar
                                                        src={connection?.profileImage}
                                                        alt={`${connection?.firstName} ${connection?.lastName}`}
                                                        sx={{
                                                            width: 48,
                                                            height: 48,
                                                            boxShadow: theme.shadows[2]
                                                        }}
                                                    >
                                                        {connection?.firstName?.charAt(0) || '?'}{connection?.lastName?.charAt(0) || '?'}
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={
                                                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                                            {connection?.firstName} {connection?.lastName}
                                                        </Typography>
                                                    }
                                                    secondary={
                                                        <Typography variant="body2" color="text.secondary">
                                                            {connection?.phoneNo}
                                                        </Typography>
                                                    }
                                                />
                                            </ListItem>
                                        </Paper>
                                    </Slide>
                                ))}
                            </List>
                        )}
                    </Box>
                </DialogContent>
                <DialogActions sx={{ p: 3, pt: 2 }}>
                    <Button
                        onClick={handleCloseNewChatDialog}
                        variant="outlined"
                        sx={{
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 600
                        }}
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ChatSidebar;