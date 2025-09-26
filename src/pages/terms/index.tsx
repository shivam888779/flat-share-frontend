import React from 'react';
import { Box, Typography, Container, Paper, Stack, Divider, Link } from '@mui/material';
import { Gavel, Security, Block, Warning, CheckCircle, Cancel } from '@mui/icons-material';

const TermsOfService: React.FC = () => {
    const sections = [
        {
            title: 'Acceptance of Terms',
            icon: <CheckCircle />,
            content: [
                'By accessing and using FlatShare, you accept and agree to be bound by these Terms of Service.',
                'If you do not agree to these terms, you must not use our services.',
                'We reserve the right to modify these terms at any time with notice.',
                'Continued use after changes constitutes acceptance of the new terms.'
            ]
        },
        {
            title: 'User Responsibilities',
            icon: <Security />,
            content: [
                'Provide accurate and complete information in your profile',
                'Maintain the security of your account credentials',
                'Respect other users and their privacy',
                'Report any suspicious or inappropriate behavior',
                'Comply with all applicable laws and regulations',
                'Use the platform for its intended purpose only'
            ]
        },
        {
            title: 'Prohibited Activities',
            icon: <Block />,
            content: [
                'Creating fake or misleading profiles',
                'Harassing, threatening, or discriminating against other users',
                'Sharing inappropriate, offensive, or illegal content',
                'Attempting to access other users\' accounts',
                'Using automated tools or bots on the platform',
                'Violating any applicable laws or regulations'
            ]
        },
        {
            title: 'Content and Communication',
            icon: <Warning />,
            content: [
                'You are responsible for all content you post or share',
                'We may remove content that violates our policies',
                'Private messages should remain confidential',
                'Report inappropriate content to our support team',
                'We monitor platform activity for safety and security',
                'Respect intellectual property rights of others'
            ]
        },
        {
            title: 'Service Limitations',
            icon: <Gavel />,
            content: [
                'We provide the platform "as is" without warranties',
                'We are not responsible for arrangements made between users',
                'We do not guarantee successful roommate matches',
                'Service availability may be limited due to maintenance',
                'We may suspend or terminate accounts for policy violations',
                'We reserve the right to modify or discontinue services'
            ]
        }
    ];

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
                            Terms of Service
                        </Typography>
                        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
                            Please read these terms carefully before using FlatShare. By using our services, you agree to these terms.
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                            Last updated: {new Date().toLocaleDateString()}
                        </Typography>
                    </Box>

                    {/* Terms Content */}
                    <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
                        <Stack spacing={4}>
                            {sections.map((section, index) => (
                                <Box key={index}>
                                    <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                                        <Box sx={{ color: 'primary.main' }}>
                                            {section.icon}
                                        </Box>
                                        <Typography variant="h5" sx={{ fontWeight: 600, color: 'text.primary' }}>
                                            {section.title}
                                        </Typography>
                                    </Stack>
                                    <Stack spacing={1}>
                                        {section.content.map((item, itemIndex) => (
                                            <Typography
                                                key={itemIndex}
                                                variant="body1"
                                                sx={{
                                                    color: 'text.secondary',
                                                    pl: 4,
                                                    position: 'relative',
                                                    '&::before': {
                                                        content: '""',
                                                        position: 'absolute',
                                                        left: 0,
                                                        top: '0.5rem',
                                                        width: '6px',
                                                        height: '6px',
                                                        borderRadius: '50%',
                                                        backgroundColor: 'primary.main'
                                                    }
                                                }}
                                            >
                                                {item}
                                            </Typography>
                                        ))}
                                    </Stack>
                                    {index < sections.length - 1 && (
                                        <Divider sx={{ mt: 3, borderColor: 'divider' }} />
                                    )}
                                </Box>
                            ))}
                        </Stack>
                    </Paper>

                    {/* Account Termination */}
                    <Paper elevation={1} sx={{ p: 3, borderRadius: 2, backgroundColor: 'error.50' }}>
                        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                            <Cancel sx={{ color: 'error.main' }} />
                            <Typography variant="h6" sx={{ color: 'error.main', fontWeight: 600 }}>
                                Account Termination
                            </Typography>
                        </Stack>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            We may terminate or suspend your account immediately, without prior notice, for:
                        </Typography>
                        <Stack spacing={1}>
                            <Typography variant="body2" color="text.secondary">
                                • Violation of these Terms of Service
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                • Fraudulent or illegal activities
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                • Harassment or inappropriate behavior
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                • Extended periods of inactivity
                            </Typography>
                        </Stack>
                    </Paper>

                    {/* Dispute Resolution */}
                    <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                            Dispute Resolution
                        </Typography>
                        <Stack spacing={2}>
                            <Typography variant="body2" color="text.secondary">
                                Any disputes arising from these terms will be resolved through binding arbitration in New York, NY.
                                You agree to waive any right to a jury trial or class action lawsuit.
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                For questions about these terms, please contact our legal team at legal@flatshare.com
                            </Typography>
                        </Stack>
                    </Paper>

                    {/* Contact Information */}
                    <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                            Contact Information
                        </Typography>
                        <Stack spacing={1}>
                            <Typography variant="body2" color="text.secondary">
                                Email: legal@flatshare.com
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Address: 123 Main Street, New York, NY 10001
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Phone: +1 (555) 123-4567
                            </Typography>
                        </Stack>
                    </Paper>

                    {/* Footer Links */}
                    <Box textAlign="center" pt={2}>
                        <Stack direction="row" spacing={3} justifyContent="center">
                            <Link href="/privacy" sx={{ color: 'primary.main', textDecoration: 'none' }}>
                                Privacy Policy
                            </Link>
                            <Link href="/contact" sx={{ color: 'primary.main', textDecoration: 'none' }}>
                                Contact Us
                            </Link>
                            <Link href="/help" sx={{ color: 'primary.main', textDecoration: 'none' }}>
                                Help Center
                            </Link>
                        </Stack>
                    </Box>
                </Stack>
            </Container>
        </Box>
    );
};

export default TermsOfService; 