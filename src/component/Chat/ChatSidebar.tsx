import React, { useState } from 'react';
import {
    Box,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    Typography,
    Badge,
    IconButton,
    Chip,
    Skeleton,
    Divider,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    useTheme
} from '@mui/material';
import {
    Delete as DeleteIcon,
    Circle as CircleIcon,
    FiberManualRecord as FiberManualRecordIcon,
    Add as AddIcon,
    Search as SearchIcon
} from '@mui/icons-material';
import { IChatRoom, IUserData } from '../../types/chat';
import { formatDistanceToNow } from 'date-fns';

interface ChatSidebarProps {
    chatRooms: IChatRoom[];
    unreadCount: number;
    isConnected: boolean;
    loading: boolean;
    onChatRoomSelect: (otherUserId: number) => void;
    onDeleteChatRoom: (chatRoomId: number) => void;
    userData: IUserData;
    approvedConnections?: IUserData[];
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({
    chatRooms,
    unreadCount,
    isConnected,
    loading,
    onChatRoomSelect,
    onDeleteChatRoom,
    userData,
    approvedConnections = []
}) => {
    const theme = useTheme();
    const [showNewChatDialog, setShowNewChatDialog] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const getOtherUser = (chatRoom: IChatRoom) => {
        return chatRoom.otherUser ||
            (chatRoom.user1Id === userData.id ?
                { id: chatRoom.user2Id, firstName: 'Unknown', lastName: 'User', profileImage: '' } :
                { id: chatRoom.user1Id, firstName: 'Unknown', lastName: 'User', profileImage: '' });
    };

    const formatLastMessageTime = (timestamp: string) => {
        try {
            return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
        } catch {
            return 'Unknown time';
        }
    };

    const truncateMessage = (message: string, maxLength: number = 50) => {
        return message.length > maxLength ? `${message.substring(0, maxLength)}...` : message;
    };

    const handleStartNewChat = (connectionId: number) => {
        onChatRoomSelect(connectionId);
        setShowNewChatDialog(false);
        setSearchQuery('');
    };

    const filteredConnections = approvedConnections.filter(connection =>
        `${connection.firstName} ${connection.lastName}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return (
            <Box sx={{ p: 2 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Conversations
                </Typography>
                {[...Array(5)].map((_, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Skeleton variant="circular" width={40} height={40} />
                            <Box sx={{ ml: 2, flex: 1 }}>
                                <Skeleton variant="text" width="60%" />
                                <Skeleton variant="text" width="40%" />
                            </Box>
                        </Box>
                    </Box>
                ))}
            </Box>
        );
    }

    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <Box
                sx={{
                    p: 2,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Conversations
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip
                        icon={
                            <CircleIcon
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
                    />
                    {unreadCount > 0 && (
                        <Badge
                            badgeContent={unreadCount}
                            color="primary"
                            sx={{
                                '& .MuiBadge-badge': {
                                    fontSize: '0.75rem',
                                    minWidth: 20,
                                    height: 20
                                }
                            }}
                        />
                    )}
                </Box>
            </Box>

            {/* Start New Chat Button */}
            <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    fullWidth
                    onClick={() => setShowNewChatDialog(true)}
                    sx={{
                        bgcolor: 'primary.main',
                        color: 'white',
                        '&:hover': {
                            bgcolor: 'primary.dark'
                        }
                    }}
                >
                    Start New Chat
                </Button>
            </Box>

            {/* Chat Rooms List */}
            <Box sx={{ flex: 1, overflow: 'auto' }}>
                {chatRooms?.length === 0 ? (
                    <Box
                        sx={{
                            p: 3,
                            textAlign: 'center',
                            color: 'text.secondary'
                        }}
                    >
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            No conversations yet
                        </Typography>
                        <Typography variant="caption">
                            Start chatting with your approved connections
                        </Typography>
                    </Box>
                ) : (
                    <List sx={{ p: 0 }}>
                        {chatRooms?.map((chatRoom, index) => {
                            const otherUser = getOtherUser(chatRoom);
                            const isOnline = false; // TODO: Implement online status

                            return (
                                <React.Fragment key={chatRoom.id}>
                                    <ListItem
                                        button
                                        onClick={() => onChatRoomSelect(otherUser.id)}
                                        sx={{
                                            py: 1.5,
                                            px: 2,
                                            '&:hover': {
                                                bgcolor: 'action.hover'
                                            }
                                        }}
                                    >
                                        <ListItemAvatar>
                                            <Badge
                                                overlap="circular"
                                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                                badgeContent={
                                                    <FiberManualRecordIcon
                                                        sx={{
                                                            color: isOnline ? theme.palette.success.main : theme.palette.grey[400],
                                                            fontSize: '0.75rem'
                                                        }}
                                                    />
                                                }
                                            >
                                                <Avatar
                                                    src={otherUser.profileImage}
                                                    alt={`${otherUser.firstName} ${otherUser.lastName}`}
                                                    sx={{ width: 48, height: 48 }}
                                                >
                                                    {otherUser.firstName.charAt(0)}{otherUser.lastName.charAt(0)}
                                                </Avatar>
                                            </Badge>
                                        </ListItemAvatar>

                                        <ListItemText
                                            primary={
                                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                    <Typography
                                                        variant="subtitle2"
                                                        sx={{
                                                            fontWeight: chatRoom.unreadCount > 0 ? 600 : 400,
                                                            color: chatRoom.unreadCount > 0 ? 'text.primary' : 'text.primary'
                                                        }}
                                                    >
                                                        {otherUser.firstName} {otherUser.lastName}
                                                    </Typography>
                                                    {chatRoom.lastMessage && (
                                                        <Typography
                                                            variant="caption"
                                                            sx={{ color: 'text.secondary', fontSize: '0.75rem' }}
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
                                                            maxWidth: 150,
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            whiteSpace: 'nowrap'
                                                        }}
                                                    >
                                                        {chatRoom.lastMessage ? truncateMessage(chatRoom.lastMessage.content) : 'No messages yet'}
                                                    </Typography>
                                                    {chatRoom.unreadCount > 0 && (
                                                        <Badge
                                                            badgeContent={chatRoom.unreadCount}
                                                            color="primary"
                                                            sx={{
                                                                '& .MuiBadge-badge': {
                                                                    fontSize: '0.625rem',
                                                                    minWidth: 16,
                                                                    height: 16
                                                                }
                                                            }}
                                                        />
                                                    )}
                                                </Box>
                                            }
                                        />

                                        <IconButton
                                            size="small"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onDeleteChatRoom(chatRoom.id);
                                            }}
                                            sx={{
                                                opacity: 0,
                                                transition: 'opacity 0.2s',
                                                '&:hover': {
                                                    bgcolor: 'error.light',
                                                    color: 'error.contrastText'
                                                }
                                            }}
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </ListItem>
                                    {index < chatRooms.length - 1 && <Divider />}
                                </React.Fragment>
                            );
                        })}
                    </List>
                )}
            </Box>

            {/* New Chat Dialog */}
            <Dialog
                open={showNewChatDialog}
                onClose={() => setShowNewChatDialog(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>
                    Start New Chat
                </DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        placeholder="Search approved connections..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        InputProps={{
                            startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
                        }}
                        sx={{ mb: 2, mt: 1 }}
                    />

                    <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
                        {filteredConnections.length === 0 ? (
                            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                                {searchQuery ? 'No connections found' : 'No approved connections available'}
                            </Typography>
                        ) : (
                            <List>
                                {filteredConnections.map((connection) => (
                                    <ListItem
                                        key={connection.id}
                                        button
                                        onClick={() => handleStartNewChat(connection.id)}
                                        sx={{
                                            py: 1,
                                            '&:hover': {
                                                bgcolor: 'action.hover'
                                            }
                                        }}
                                    >
                                        <ListItemAvatar>
                                            <Avatar
                                                src={connection.profileImage}
                                                alt={`${connection.firstName} ${connection.lastName}`}
                                            >
                                                {connection.firstName.charAt(0)}{connection.lastName.charAt(0)}
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={`${connection.firstName} ${connection.lastName}`}
                                            secondary={connection.phoneNo}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        )}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowNewChatDialog(false)}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ChatSidebar; 