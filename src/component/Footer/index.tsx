import {
    Box,
    Stack,
    Typography,
    IconButton,
    Divider,
    Link,
    Container,
    useTheme,
    useMediaQuery
} from "@mui/material";
import {
    Twitter,
    Facebook,
    Instagram,
    LinkedIn,
    Home,
    Email,
    Phone,
    LocationOn
} from '@mui/icons-material';

const Footer = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const footerLinks = {
        company: [
            { label: 'About Us', href: '/about' },
            { label: 'How It Works', href: '/how-it-works' },
            { label: 'Testimonials', href: '/testimonials' },
            { label: 'Blog', href: '/blog' }
        ],
        support: [
            { label: 'Help Center', href: '/help' },
            { label: 'Contact Us', href: '/contact' },
            { label: 'FAQs', href: '/faqs' },
            { label: 'Privacy Policy', href: '/privacy' }
        ],
        explore: [
            { label: 'Find Roommates', href: '/roommates' },
            { label: 'List Property', href: '/list' },
            { label: 'Popular Areas', href: '/areas' },
            { label: 'Student Housing', href: '/student' }
        ]
    };

    const socialLinks = [
        { icon: <Facebook />, href: '#', color: '#3b5998' },
        { icon: <Twitter />, href: '#', color: '#1da1f2' },
        { icon: <Instagram />, href: '#', color: '#e1306c' },
        { icon: <LinkedIn />, href: '#', color: '#0077b5' }
    ];

    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: '#2d3436',
                color: 'white',
          
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Decorative Wave */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '100px',
                    background: 'linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)',
                    opacity: 0.1,
                    transform: 'skewY(-2deg)',
                    transformOrigin: 'top left'
                }}
            />

            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                {/* Main Footer Content */}
                <Box pt={8} pb={4}>
                    <Stack
                        direction={{ xs: 'column', md: 'row' }}
                        spacing={4}
                        justifyContent="space-between"
                    >
                        {/* Brand Section */}
                        <Box flex={1}>
                            <Stack spacing={3}>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            fontWeight: 700,
                                            background: 'linear-gradient(135deg, #6c5ce7 0%, #00b894 100%)',
                                            backgroundClip: 'text',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent'
                                        }}
                                    >
                                        FlatShare
                                    </Typography>
                                    <Home sx={{ color: '#6c5ce7' }} />
                                </Stack>

                                <Typography
                                    variant="body2"
                                    sx={{ color: 'rgba(255,255,255,0.7)', maxWidth: 300 }}
                                >
                                    Find your perfect roommate and share amazing living spaces.
                                    Join thousands of happy flatmates today.
                                </Typography>

                                {/* Social Links */}
                                <Stack direction="row" spacing={1}>
                                    {socialLinks.map((social, index) => (
                                        <IconButton
                                            key={index}
                                            href={social.href}
                                            size="small"
                                            sx={{
                                                backgroundColor: 'rgba(255,255,255,0.1)',
                                                color: 'white',
                                                '&:hover': {
                                                    backgroundColor: social.color,
                                                    transform: 'translateY(-2px)'
                                                },
                                                transition: 'all 0.3s ease'
                                            }}
                                        >
                                            {social.icon}
                                        </IconButton>
                                    ))}
                                </Stack>
                            </Stack>
                        </Box>

                        {/* Links Sections */}
                        <Box flex={2}>
                            <Stack
                                direction={{ xs: 'column', sm: 'row' }}
                                spacing={4}
                                justifyContent="space-between"
                            >
                                <Box>
                                    <Typography
                                        variant="h6"
                                        sx={{ mb: 2, color: '#6c5ce7', fontWeight: 600 }}
                                    >
                                        Company
                                    </Typography>
                                    <Stack spacing={1.5}>
                                        {footerLinks.company.map((link) => (
                                            <Link
                                                key={link.label}
                                                href={link.href}
                                                sx={{
                                                    color: 'rgba(255,255,255,0.7)',
                                                    textDecoration: 'none',
                                                    fontSize: '0.9rem',
                                                    '&:hover': {
                                                        color: '#6c5ce7'
                                                    },
                                                    transition: 'color 0.2s ease'
                                                }}
                                            >
                                                {link.label}
                                            </Link>
                                        ))}
                                    </Stack>
                                </Box>

                                <Box>
                                    <Typography
                                        variant="h6"
                                        sx={{ mb: 2, color: '#00b894', fontWeight: 600 }}
                                    >
                                        Support
                                    </Typography>
                                    <Stack spacing={1.5}>
                                        {footerLinks.support.map((link) => (
                                            <Link
                                                key={link.label}
                                                href={link.href}
                                                sx={{
                                                    color: 'rgba(255,255,255,0.7)',
                                                    textDecoration: 'none',
                                                    fontSize: '0.9rem',
                                                    '&:hover': {
                                                        color: '#00b894'
                                                    },
                                                    transition: 'color 0.2s ease'
                                                }}
                                            >
                                                {link.label}
                                            </Link>
                                        ))}
                                    </Stack>
                                </Box>

                                <Box>
                                    <Typography
                                        variant="h6"
                                        sx={{ mb: 2, color: '#ffeaa7', fontWeight: 600 }}
                                    >
                                        Explore
                                    </Typography>
                                    <Stack spacing={1.5}>
                                        {footerLinks.explore.map((link) => (
                                            <Link
                                                key={link.label}
                                                href={link.href}
                                                sx={{
                                                    color: 'rgba(255,255,255,0.7)',
                                                    textDecoration: 'none',
                                                    fontSize: '0.9rem',
                                                    '&:hover': {
                                                        color: '#ffeaa7'
                                                    },
                                                    transition: 'color 0.2s ease'
                                                }}
                                            >
                                                {link.label}
                                            </Link>
                                        ))}
                                    </Stack>
                                </Box>
                            </Stack>
                        </Box>

                        {/* Contact Info */}
                        <Box flex={1}>
                            <Typography
                                variant="h6"
                                sx={{ mb: 2, color: '#fd79a8', fontWeight: 600 }}
                            >
                                Get in Touch
                            </Typography>
                            <Stack spacing={2}>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <Email sx={{ color: '#fd79a8', fontSize: 20 }} />
                                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                        hello@flatshare.com
                                    </Typography>
                                </Stack>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <Phone sx={{ color: '#fd79a8', fontSize: 20 }} />
                                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                        +1 (555) 123-4567
                                    </Typography>
                                </Stack>
                                <Stack direction="row" alignItems="flex-start" spacing={1}>
                                    <LocationOn sx={{ color: '#fd79a8', fontSize: 20 }} />
                                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                        123 Main Street<br />
                                        New York, NY 10001
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Box>
                    </Stack>
                </Box>

                <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 3 }} />

                {/* Bottom Bar */}
                <Box py={3}>
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}
                    >
                        <Typography
                            variant="body2"
                            sx={{ color: 'rgba(255,255,255,0.5)', textAlign: { xs: 'center', sm: 'left' } }}
                        >
                            © 2024 FlatShare. All rights reserved. Made with 💜 in NYC
                        </Typography>

                        <Stack direction="row" spacing={3}>
                            <Link
                                href="/terms"
                                sx={{
                                    color: 'rgba(255,255,255,0.5)',
                                    textDecoration: 'none',
                                    fontSize: '0.875rem',
                                    '&:hover': {
                                        color: 'white'
                                    }
                                }}
                            >
                                Terms of Service
                            </Link>
                            <Link
                                href="/privacy"
                                sx={{
                                    color: 'rgba(255,255,255,0.5)',
                                    textDecoration: 'none',
                                    fontSize: '0.875rem',
                                    '&:hover': {
                                        color: 'white'
                                    }
                                }}
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                href="/cookies"
                                sx={{
                                    color: 'rgba(255,255,255,0.5)',
                                    textDecoration: 'none',
                                    fontSize: '0.875rem',
                                    '&:hover': {
                                        color: 'white'
                                    }
                                }}
                            >
                                Cookie Policy
                            </Link>
                        </Stack>
                    </Stack>
                </Box>
            </Container>

            {/* Animated Building Silhouettes */}
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '60px',
                    overflow: 'hidden',
                    opacity: 0.05
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(to top, white 0%, transparent 100%)'
                    }}
                />
            </Box>
        </Box>
    );
};

export default Footer;