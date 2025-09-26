import React, { useState } from 'react';
import { Box, Typography, Container, Paper, Stack, Accordion, AccordionSummary, AccordionDetails, Chip, Grid } from '@mui/material';
import { ExpandMore, QuestionAnswer, TrendingUp, Security, Payment, AccountCircle } from '@mui/icons-material';

interface IFAQ {
    id: string;
    question: string;
    answer: string;
    category: string;
    popular?: boolean;
}

const FAQs: React.FC = () => {
    const [expanded, setExpanded] = useState<string | false>(false);

    const faqs: IFAQ[] = [
        {
            id: 'how-to-signup',
            question: 'How do I create a FlatShare account?',
            answer: 'Creating an account is easy! Click the "Sign Up" button on our homepage, enter your email and phone number, and we\'ll send you a verification code. Once verified, you can complete your profile and start finding roommates.',
            category: 'Getting Started',
            popular: true
        },
        {
            id: 'profile-completion',
            question: 'Why should I complete my profile?',
            answer: 'A complete profile helps you find better matches and shows other users that you\'re serious about finding a roommate. Include photos, your lifestyle preferences, and what you\'re looking for in a roommate.',
            category: 'Getting Started'
        },
        {
            id: 'find-roommates',
            question: 'How do I find compatible roommates?',
            answer: 'Use our search filters to find people with similar budgets, lifestyles, and preferences. You can filter by location, rent budget, smoking preferences, pet policies, and more. Send connection requests to people you\'re interested in.',
            category: 'Finding Roommates',
            popular: true
        },
        {
            id: 'safety-measures',
            question: 'What safety measures does FlatShare have?',
            answer: 'We verify all user accounts, provide secure messaging, and offer reporting tools. Always meet potential roommates in public places first, and trust your instincts. Report any suspicious behavior through our support system.',
            category: 'Safety & Security',
            popular: true
        },
        {
            id: 'chat-privacy',
            question: 'Are my messages private?',
            answer: 'Yes, all messages are private and encrypted. Only you and the person you\'re chatting with can see your conversations. We don\'t monitor or store message content for any purpose other than providing the service.',
            category: 'Safety & Security'
        },
        {
            id: 'list-property',
            question: 'How do I list my property for rent?',
            answer: 'Click "List Property" in the header menu and fill out the property details. Include photos, rent amount, location, available dates, and any specific requirements. Your listing will be visible to potential roommates.',
            category: 'Property Management'
        },
        {
            id: 'payment-methods',
            question: 'What payment methods do you accept?',
            answer: 'We accept all major credit cards, debit cards, and digital wallets like PayPal and Apple Pay. All payments are processed securely through our trusted payment partners.',
            category: 'Payments & Billing'
        },
        {
            id: 'account-deletion',
            question: 'How do I delete my account?',
            answer: 'Go to your profile settings and select "Delete Account". This will permanently remove all your data including profile, messages, and connections. This action cannot be undone.',
            category: 'Account Management'
        },
        {
            id: 'report-user',
            question: 'How do I report inappropriate behavior?',
            answer: 'Use the "Report" button on any user profile or contact our support team directly. Provide as much detail as possible about the incident. We take all reports seriously and investigate promptly.',
            category: 'Safety & Security'
        },
        {
            id: 'data-privacy',
            question: 'How do you protect my personal information?',
            answer: 'We use industry-standard encryption and security measures to protect your data. We never sell your personal information and only share it with your explicit consent. Read our Privacy Policy for full details.',
            category: 'Safety & Security'
        },
        {
            id: 'success-rate',
            question: 'What\'s your success rate for finding roommates?',
            answer: 'Our platform has helped thousands of people find compatible roommates. Success depends on completing your profile, being active on the platform, and being open to different living arrangements.',
            category: 'Platform Usage'
        },
        {
            id: 'customer-support',
            question: 'How can I contact customer support?',
            answer: 'You can reach our support team via email at support@flatshare.com, phone at +1 (555) 123-4567, or through the contact form on our website. We typically respond within 24 hours.',
            category: 'Support'
        }
    ];

    const categories = [
        { name: 'Getting Started', icon: <AccountCircle />, color: 'primary' },
        { name: 'Finding Roommates', icon: <TrendingUp />, color: 'success' },
        { name: 'Safety & Security', icon: <Security />, color: 'error' },
        { name: 'Property Management', icon: <AccountCircle />, color: 'info' },
        { name: 'Payments & Billing', icon: <Payment />, color: 'warning' },
        { name: 'Account Management', icon: <AccountCircle />, color: 'secondary' },
        { name: 'Platform Usage', icon: <TrendingUp />, color: 'primary' },
        { name: 'Support', icon: <QuestionAnswer />, color: 'success' }
    ];

    const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    const groupedFaqs = faqs.reduce((acc, faq) => {
        if (!acc[faq.category]) {
            acc[faq.category] = [];
        }
        acc[faq.category].push(faq);
        return acc;
    }, {} as Record<string, IFAQ[]>);

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
                            Frequently Asked Questions
                        </Typography>
                        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
                            Find quick answers to the most common questions about FlatShare.
                        </Typography>
                    </Box>

                    {/* Popular FAQs */}
                    <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
                        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                            Popular Questions
                        </Typography>
                        <Stack spacing={2}>
                            {faqs.filter(faq => faq.popular).map((faq) => (
                                <Accordion
                                    key={faq.id}
                                    expanded={expanded === faq.id}
                                    onChange={handleAccordionChange(faq.id)}
                                    sx={{ '&:before': { display: 'none' } }}
                                >
                                    <AccordionSummary
                                        expandIcon={<ExpandMore />}
                                        sx={{ px: 3 }}
                                    >
                                        <Stack direction="row" alignItems="center" spacing={2}>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                                                {faq.question}
                                            </Typography>
                                            <Chip label="Popular" size="small" color="primary" />
                                        </Stack>
                                    </AccordionSummary>
                                    <AccordionDetails sx={{ px: 3, pb: 3 }}>
                                        <Typography variant="body1" color="text.secondary">
                                            {faq.answer}
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                        </Stack>
                    </Paper>

                    {/* All FAQs by Category */}
                    <Stack spacing={3}>
                        {Object.entries(groupedFaqs).map(([category, categoryFaqs]) => (
                            <Paper key={category} elevation={2} sx={{ borderRadius: 3 }}>
                                <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
                                    <Stack direction="row" alignItems="center" spacing={2}>
                                        <QuestionAnswer sx={{ color: 'primary.main' }} />
                                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                            {category}
                                        </Typography>
                                        <Chip label={categoryFaqs.length} size="small" color="primary" />
                                    </Stack>
                                </Box>
                                <Box>
                                    {categoryFaqs.map((faq) => (
                                        <Accordion
                                            key={faq.id}
                                            expanded={expanded === faq.id}
                                            onChange={handleAccordionChange(faq.id)}
                                            sx={{ '&:before': { display: 'none' } }}
                                        >
                                            <AccordionSummary
                                                expandIcon={<ExpandMore />}
                                                sx={{ px: 3 }}
                                            >
                                                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                                                    {faq.question}
                                                </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails sx={{ px: 3, pb: 3 }}>
                                                <Typography variant="body1" color="text.secondary">
                                                    {faq.answer}
                                                </Typography>
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
                            Still Have Questions?
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            Can&apos;t find the answer you&apos;re looking for? Our support team is ready to help.
                        </Typography>
                        <Stack direction="row" spacing={3}>
                            <Typography variant="body2" color="text.secondary">
                                Email: support@flatshare.com
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Phone: +1 (555) 123-4567
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Response time: Within 24 hours
                            </Typography>
                        </Stack>
                    </Paper>
                </Stack>
            </Container>
        </Box>
    );
};

export default FAQs; 