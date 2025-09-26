import React, { useState, useMemo } from 'react';
import { Box, Typography, Container, Paper, Stack, TextField, InputAdornment, Accordion, AccordionSummary, AccordionDetails, Chip, Grid } from '@mui/material';
import { Search, ExpandMore, Help, AccountCircle, Home, Chat, Security, Payment } from '@mui/icons-material';

interface IHelpTopic {
    id: string;
    title: string;
    content: string;
    category: string;
    tags: string[];
}

const HelpCenter: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');

    const helpTopics: IHelpTopic[] = [
        {
            id: 'account-creation',
            title: 'How do I create an account?',
            content: 'To create an account, click the "Sign Up" button on the homepage. You\'ll need to provide your email address, phone number, and create a password. We\'ll send you a verification code to confirm your phone number.',
            category: 'Account',
            tags: ['signup', 'registration', 'verification']
        },
        {
            id: 'profile-setup',
            title: 'How do I complete my profile?',
            content: 'After creating your account, go to "My Profile" to add your personal information, preferences, and photos. A complete profile increases your chances of finding compatible roommates.',
            category: 'Account',
            tags: ['profile', 'setup', 'preferences']
        },
        {
            id: 'find-roommates',
            title: 'How do I find roommates?',
            content: 'Use the search filters on the homepage to find potential roommates. You can filter by location, budget, lifestyle preferences, and more. Send connection requests to people you\'re interested in.',
            category: 'Finding Roommates',
            tags: ['search', 'filters', 'connections']
        },
        {
            id: 'list-property',
            title: 'How do I list my property?',
            content: 'Click "List Property" in the header menu. Fill out the property details including photos, rent, location, and available dates. Your listing will be visible to potential roommates.',
            category: 'Property',
            tags: ['listing', 'property', 'rent']
        },
        {
            id: 'chat-feature',
            title: 'How does the chat feature work?',
            content: 'Once you\'re connected with someone, you can start chatting. The chat feature supports text messages, photos, and real-time notifications. All conversations are private and secure.',
            category: 'Communication',
            tags: ['chat', 'messages', 'privacy']
        },
        {
            id: 'safety-tips',
            title: 'What safety measures are in place?',
            content: 'We verify all user accounts, provide secure messaging, and offer reporting tools. Always meet in public places first and trust your instincts. Report any suspicious behavior immediately.',
            category: 'Safety',
            tags: ['safety', 'verification', 'reporting']
        },
        {
            id: 'payment-options',
            title: 'What payment options are available?',
            content: 'We accept major credit cards, debit cards, and digital wallets. All payments are processed securely through our payment partners. You can update your payment method in your profile settings.',
            category: 'Payments',
            tags: ['payment', 'billing', 'security']
        },
        {
            id: 'account-deletion',
            title: 'How do I delete my account?',
            content: 'Go to your profile settings and select "Delete Account". This will permanently remove all your data including profile, messages, and connections. This action cannot be undone.',
            category: 'Account',
            tags: ['deletion', 'privacy', 'data']
        }
    ];

    const categories = [
        { name: 'Account', icon: <AccountCircle />, color: 'primary' },
        { name: 'Finding Roommates', icon: <Home />, color: 'success' },
        { name: 'Property', icon: <Home />, color: 'info' },
        { name: 'Communication', icon: <Chat />, color: 'warning' },
        { name: 'Safety', icon: <Security />, color: 'error' },
        { name: 'Payments', icon: <Payment />, color: 'secondary' }
    ];

    const filteredTopics = useMemo(() => {
        if (!searchQuery) return helpTopics;

        return helpTopics.filter(topic =>
            topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            topic.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
            topic.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    }, [searchQuery]);

    const groupedTopics = useMemo(() => {
        const grouped: Record<string, IHelpTopic[]> = {};
        filteredTopics.forEach(topic => {
            if (!grouped[topic.category]) {
                grouped[topic.category] = [];
            }
            grouped[topic.category].push(topic);
        });
        return grouped;
    }, [filteredTopics]);

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default', py: 4 }}>
            <Container maxWidth="lg">
                <Stack spacing={4}>
                    {/* Header */}
                    <Box textAlign="center" py={4}>
                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight: 700,
                                background: 'linear-gradient(135deg, #6c5ce7 0%, #00b894 100%)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                mb: 2
                            }}
                        >
                            Help Center
                        </Typography>
                        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
                            Find answers to common questions and learn how to use FlatShare effectively.
                        </Typography>
                    </Box>

                    {/* Search Bar */}
                    <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
                        <TextField
                            fullWidth
                            placeholder="Search for help topics..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search sx={{ color: 'text.secondary' }} />
                                    </InputAdornment>
                                )
                            }}
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                        />
                    </Paper>

                    {/* Categories */}
                    <Grid container spacing={2}>
                        {categories.map((category) => (
                            <Grid item xs={6} sm={4} md={2} key={category.name}>
                                <Paper
                                    elevation={1}
                                    sx={{
                                        p: 2,
                                        textAlign: 'center',
                                        borderRadius: 2,
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        '&:hover': {
                                            elevation: 3,
                                            transform: 'translateY(-2px)'
                                        }
                                    }}
                                >
                                    <Box sx={{ color: `${category.color}.main`, mb: 1 }}>
                                        {category.icon}
                                    </Box>
                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                        {category.name}
                                    </Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>

                    {/* Help Topics */}
                    <Stack spacing={3}>
                        {Object.entries(groupedTopics).map(([category, topics]) => (
                            <Paper key={category} elevation={2} sx={{ borderRadius: 3 }}>
                                <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
                                    <Stack direction="row" alignItems="center" spacing={2}>
                                        <Help sx={{ color: 'primary.main' }} />
                                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                            {category}
                                        </Typography>
                                        <Chip label={topics.length} size="small" color="primary" />
                                    </Stack>
                                </Box>
                                <Box>
                                    {topics.map((topic) => (
                                        <Accordion key={topic.id} sx={{ '&:before': { display: 'none' } }}>
                                            <AccordionSummary
                                                expandIcon={<ExpandMore />}
                                                sx={{ px: 3 }}
                                            >
                                                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                                                    {topic.title}
                                                </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails sx={{ px: 3, pb: 3 }}>
                                                <Stack spacing={2}>
                                                    <Typography variant="body1" color="text.secondary">
                                                        {topic.content}
                                                    </Typography>
                                                    <Stack direction="row" spacing={1} flexWrap="wrap">
                                                        {topic.tags.map((tag) => (
                                                            <Chip
                                                                key={tag}
                                                                label={tag}
                                                                size="small"
                                                                variant="outlined"
                                                                sx={{ fontSize: '0.75rem' }}
                                                            />
                                                        ))}
                                                    </Stack>
                                                </Stack>
                                            </AccordionDetails>
                                        </Accordion>
                                    ))}
                                </Box>
                            </Paper>
                        ))}
                    </Stack>

                    {/* Contact Support */}
                    <Paper elevation={1} sx={{ p: 4, borderRadius: 2, backgroundColor: 'primary.50' }}>
                        <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 600 }}>
                            Still Need Help?
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            Can&apos;t find what you&apos;re looking for? Our support team is here to help.
                        </Typography>
                        <Stack direction="row" spacing={2}>
                            <Typography variant="body2" color="text.secondary">
                                Email: support@flatshare.com
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Phone: +1 (555) 123-4567
                            </Typography>
                        </Stack>
                    </Paper>
                </Stack>
            </Container>
        </Box>
    );
};

export default HelpCenter; 