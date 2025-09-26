import React, { useState } from 'react';
import { Box, Typography, Container, Paper, Stack, TextField, Button, Grid, Alert } from '@mui/material';
import { Email, Phone, LocationOn, Send, CheckCircle } from '@mui/icons-material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useGlobalSnackbar } from '@/hooks/useSnackbar';

interface IContactForm {
    name: string;
    email: string;
    subject: string;
    message: string;
}

const contactValidationSchema = Yup.object({
    name: Yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    subject: Yup.string().required('Subject is required').min(5, 'Subject must be at least 5 characters'),
    message: Yup.string().required('Message is required').min(10, 'Message must be at least 10 characters')
});

const ContactUs: React.FC = () => {
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const snackbar = useGlobalSnackbar();
    const contactInfo = [
        {
            icon: <Email />,
            title: 'Email',
            value: 'hello@flatshare.com',
            description: 'We&apos;ll respond within 24 hours'
        },
        {
            icon: <Phone />,
            title: 'Phone',
            value: '+1 (555) 123-4567',
            description: 'Mon-Fri, 9AM-6PM EST'
        },
        {
            icon: <LocationOn />,
            title: 'Office',
            value: '123 Main Street, New York, NY 10001',
            description: 'Visit us during business hours'
        }
    ];

    const handleSubmit = async (values: IContactForm, { setSubmitting, resetForm }: any) => {
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            snackbar.success('Thank you for your message! We&apos;ll get back to you soon.');
            setIsSubmitted(true);
            resetForm();
        } catch (error) {
            snackbar.error(error as string);
        } finally {
            setSubmitting(false);
        }
    };

    const initialValues: IContactForm = {
        name: '',
        email: '',
        subject: '',
        message: ''
    };

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
                            Contact Us
                        </Typography>
                        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
                            Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
                        </Typography>
                    </Box>

                    {/* Contact Information */}
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
                        {contactInfo.map((info, index) => (
                            <Paper key={index} elevation={2} sx={{ p: 3, borderRadius: 2, textAlign: 'center', flex: 1 }}>
                                <Box sx={{ color: 'primary.main', mb: 2 }}>
                                    {info.icon}
                                </Box>
                                <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                                    {info.title}
                                </Typography>
                                <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                                    {info.value}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {info.description}
                                </Typography>
                            </Paper>
                        ))}
                    </Stack>

                    {/* Contact Form */}
                    <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
                        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, textAlign: 'center' }}>
                            Send us a Message
                        </Typography>

                        {isSubmitted && (
                            <Alert severity="success" sx={{ mb: 3 }}>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <CheckCircle />
                                    <Typography>
                                        Thank you! Your message has been sent successfully. We&apos;ll get back to you soon.
                                    </Typography>
                                </Stack>
                            </Alert>
                        )}

                        <Formik
                            initialValues={initialValues}
                            validationSchema={contactValidationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ values, errors, touched, isSubmitting, handleChange, handleBlur }) => (
                                <Form>
                                    <Stack spacing={3}>
                                        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
                                            <TextField
                                                fullWidth
                                                name="name"
                                                label="Full Name"
                                                value={values.name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={touched.name && Boolean(errors.name)}
                                                helperText={touched.name && errors.name}
                                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                            />
                                            <TextField
                                                fullWidth
                                                name="email"
                                                label="Email Address"
                                                type="email"
                                                value={values.email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={touched.email && Boolean(errors.email)}
                                                helperText={touched.email && errors.email}
                                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                            />
                                        </Stack>

                                        <TextField
                                            fullWidth
                                            name="subject"
                                            label="Subject"
                                            value={values.subject}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.subject && Boolean(errors.subject)}
                                            helperText={touched.subject && errors.subject}
                                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                        />

                                        <TextField
                                            fullWidth
                                            name="message"
                                            label="Message"
                                            multiline
                                            rows={6}
                                            value={values.message}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.message && Boolean(errors.message)}
                                            helperText={touched.message && errors.message}
                                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                        />

                                        <Box textAlign="center" pt={2}>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                size="large"
                                                disabled={isSubmitting}
                                                startIcon={<Send />}
                                                sx={{
                                                    px: 4,
                                                    py: 1.5,
                                                    borderRadius: 2,
                                                    background: 'linear-gradient(135deg, #6c5ce7 0%, #00b894 100%)',
                                                    '&:hover': {
                                                        background: 'linear-gradient(135deg, #5a4fcf 0%, #00a085 100%)'
                                                    }
                                                }}
                                            >
                                                {isSubmitting ? 'Sending...' : 'Send Message'}
                                            </Button>
                                        </Box>
                                    </Stack>
                                </Form>
                            )}
                        </Formik>
                    </Paper>

                    {/* FAQ Section */}
                    <Paper elevation={1} sx={{ p: 4, borderRadius: 2 }}>
                        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                            Frequently Asked Questions
                        </Typography>
                        <Stack spacing={2}>
                            <Box>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                                    How do I report a user?
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Use the &quot;Report&quot; button on any user profile or contact us directly with details.
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                                    Can I delete my account?
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Yes, you can delete your account from your profile settings. All data will be permanently removed.
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                                    How do I update my payment information?
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Go to your profile settings and select &quot;Payment Methods&quot; to update your information.
                                </Typography>
                            </Box>
                        </Stack>
                    </Paper>
                </Stack>
            </Container>
        </Box>
    );
};

export default ContactUs; 