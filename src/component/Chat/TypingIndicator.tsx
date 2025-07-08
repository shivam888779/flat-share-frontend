import React from 'react';
import { Box, Typography, useTheme, keyframes } from '@mui/material';

interface TypingIndicatorProps {
    isTyping?: boolean;
    typingUser?: string;
}

// Keyframes for the typing animation
const typingAnimation = keyframes`
    0%, 60%, 100% {
        transform: translateY(0);
        opacity: 0.4;
    }
    30% {
        transform: translateY(-10px);
        opacity: 1;
    }
`;

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
                alignSelf: 'flex-start',
                mb: 1
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    p: 1.5,
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: 1,
                    border: `1px solid ${theme.palette.divider}`
                }}
            >
                <Typography
                    variant="body2"
                    sx={{
                        color: 'text.secondary',
                        fontSize: '0.875rem',
                        fontStyle: 'italic'
                    }}
                >
                    {typingUser} is typing
                </Typography>

                {/* Animated dots */}
                <Box
                    sx={{
                        display: 'flex',
                        gap: 0.25,
                        ml: 1,
                        alignItems: 'center'
                    }}
                >
                    {[0, 1, 2].map((index) => (
                        <Box
                            key={index}
                            sx={{
                                width: 6,
                                height: 6,
                                borderRadius: '50%',
                                bgcolor: theme.palette.primary.main,
                                animation: `${typingAnimation} 1.4s infinite ease-in-out`,
                                animationDelay: `${index * 0.2}s`,
                                opacity: 0.4
                            }}
                        />
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default TypingIndicator;