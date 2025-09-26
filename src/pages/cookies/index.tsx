import React from 'react';
import { Box, Typography, Container, Paper, Stack, Divider, Link, Chip } from '@mui/material';
import { Cookie, Security, Settings, Info } from '@mui/icons-material';

const CookiePolicy: React.FC = () => {
    const cookieTypes = [
        {
            name: 'Essential Cookies',
            description: 'These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas.',
            examples: ['Authentication cookies', 'Session management', 'Security features'],
            necessary: true
        },
        {
            name: 'Analytics Cookies',
            description: 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.',
            examples: ['Google Analytics', 'Page view tracking', 'User behavior analysis'],
            necessary: false
        },
        {
            name: 'Functional Cookies',
            description: 'These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings.',
            examples: ['Language preferences', 'Search history', 'Custom settings'],
            necessary: false
        },
        {
            name: 'Marketing Cookies',
            description: 'These cookies are used to track visitors across websites to display relevant and engaging advertisements.',
            examples: ['Social media pixels', 'Advertising networks', 'Retargeting'],
            necessary: false
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
                            Cookie Policy
                        </Typography>
                        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
                            This policy explains how FlatShare uses cookies and similar technologies to enhance your experience.
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                            Last updated: {new Date().toLocaleDateString()}
                        </Typography>
                    </Box>

                    {/* What are Cookies */}
                    <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
                        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                            <Cookie sx={{ color: 'primary.main' }} />
                            <Typography variant="h5" sx={{ fontWeight: 600 }}>
                                What are Cookies?
                            </Typography>
                        </Stack>
                        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                            Cookies are small text files that are stored on your device when you visit our website.
                            They help us provide you with a better experience by remembering your preferences,
                            analyzing how you use our site, and personalizing content and advertisements.
                        </Typography>
                    </Paper>

                    {/* Cookie Types */}
                    <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
                        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                            Types of Cookies We Use
                        </Typography>
                        <Stack spacing={3}>
                            {cookieTypes.map((type, index) => (
                                <Box key={index}>
                                    <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                            {type.name}
                                        </Typography>
                                        {type.necessary && (
                                            <Chip label="Necessary" size="small" color="primary" />
                                        )}
                                    </Stack>
                                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
                                        {type.description}
                                    </Typography>
                                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                                        Examples:
                                    </Typography>
                                    <Stack direction="row" spacing={1} flexWrap="wrap">
                                        {type.examples.map((example, exampleIndex) => (
                                            <Chip
                                                key={exampleIndex}
                                                label={example}
                                                size="small"
                                                variant="outlined"
                                                sx={{ fontSize: '0.75rem' }}
                                            />
                                        ))}
                                    </Stack>
                                    {index < cookieTypes.length - 1 && (
                                        <Divider sx={{ mt: 3, borderColor: 'divider' }} />
                                    )}
                                </Box>
                            ))}
                        </Stack>
                    </Paper>

                    {/* Cookie Management */}
                    <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
                        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                            <Settings sx={{ color: 'primary.main' }} />
                            <Typography variant="h5" sx={{ fontWeight: 600 }}>
                                Managing Your Cookie Preferences
                            </Typography>
                        </Stack>
                        <Stack spacing={3}>
                            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                                You can control and manage cookies in several ways:
                            </Typography>
                            <Stack spacing={2}>
                                <Box>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                                        Browser Settings
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Most browsers allow you to manage cookies through their settings. You can delete
                                        existing cookies, prevent new ones from being set, and choose which types of
                                        cookies to accept.
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                                        Cookie Consent
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        When you first visit our site, you&apos;ll see a cookie consent banner. You can
                                        choose which types of cookies to accept or decline.
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                                        Third-Party Opt-Out
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        For third-party cookies (like advertising), you can opt out through the
                                        respective provider&apos;s website or through industry opt-out programs.
                                    </Typography>
                                </Box>
                            </Stack>
                        </Stack>
                    </Paper>

                    {/* Data Protection */}
                    <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
                        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                            <Security sx={{ color: 'primary.main' }} />
                            <Typography variant="h5" sx={{ fontWeight: 600 }}>
                                Data Protection & Privacy
                            </Typography>
                        </Stack>
                        <Stack spacing={2}>
                            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                                We are committed to protecting your privacy and ensuring the security of your data.
                                Our cookie usage complies with applicable data protection laws, including GDPR.
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                                • We only use cookies for legitimate purposes
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                                • We obtain your consent before setting non-essential cookies
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                                • We provide clear information about our cookie usage
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                                • You can withdraw your consent at any time
                            </Typography>
                        </Stack>
                    </Paper>

                    {/* Third-Party Cookies */}
                    <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
                        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                            Third-Party Cookies
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
                            Some cookies on our site are set by third-party services that we use to enhance your
                            experience. These include:
                        </Typography>
                        <Stack spacing={2}>
                            <Box>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                                    Google Analytics
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Helps us understand how visitors use our website and improve our services.
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                                    Social Media Platforms
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Enable social sharing and integration features.
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                                    Advertising Networks
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Help us show relevant advertisements and measure their effectiveness.
                                </Typography>
                            </Box>
                        </Stack>
                    </Paper>

                    {/* Contact Information */}
                    <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
                        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                            <Info sx={{ color: 'primary.main' }} />
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                Questions About Cookies?
                            </Typography>
                        </Stack>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            If you have any questions about our use of cookies, please contact us:
                        </Typography>
                        <Stack spacing={1}>
                            <Typography variant="body2" color="text.secondary">
                                Email: privacy@flatshare.com
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
                            <Link href="/terms" sx={{ color: 'primary.main', textDecoration: 'none' }}>
                                Terms of Service
                            </Link>
                            <Link href="/contact" sx={{ color: 'primary.main', textDecoration: 'none' }}>
                                Contact Us
                            </Link>
                        </Stack>
                    </Box>
                </Stack>
            </Container>
        </Box>
    );
};

export default CookiePolicy; 