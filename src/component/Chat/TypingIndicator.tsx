import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';

interface TypingIndicatorProps {
    isTyping?: boolean;
    typingUser?: string;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({
    isTyping = false,
    typingUser = 'Someone'
}) => {
    const theme = useTheme();

    if (!isTyping) {
        return null;
    }

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                p: 1.5,
                maxWidth: '70%',
                alignSelf: 'flex-start'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    p: 1.5,
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: 1
                }}
            >
                <Typography
                    variant="body2"
                    sx={{
                        color: 'text.secondary',
                        fontSize: '0.875rem'
                    }}
                >
                    {typingUser} is typing
                </Typography>

                {/* Animated dots */}
                <Box
                    sx={{
                        display: 'flex',
                        gap: 0.25,
                        ml: 1
                    }}
                >
                    {[0, 1, 2].map((index) => (
                        <Box
                            key={index}
                            sx={{
                                width: 4,
                                height: 4,
                                borderRadius: '50%',
                                bgcolor: 'text.secondary',
                                animation: 'typing 1.4s infinite ease-in-out',
                                animationDelay: `${index * 0.2}s`
                            }}
                        />
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default TypingIndicator; 