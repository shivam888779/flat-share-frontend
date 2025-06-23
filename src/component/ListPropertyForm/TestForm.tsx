import React from 'react';
import { Box, Typography, Alert } from '@mui/material';
import SchemaBasedForm from './SchemaBasedForm';
import { propertyFormSchema } from './formSchema';

const TestForm: React.FC = () => {
    const handleSubmit = async (values: any, location: any, imageUrls: string[]) => {
        console.log('Form submitted successfully!');
        console.log('Values:', values);
        console.log('Location:', location);
        console.log('Image URLs:', imageUrls);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        alert('Form submitted successfully! Check console for details.');
    };

    const handleError = (error: any) => {
        console.error('Form submission error:', error);
        alert(`Error: ${error.message}`);
    };

    return (
        <Box sx={{ p: 3, maxWidth: '800px', margin: '0 auto' }}>
            <Typography variant="h4" gutterBottom>
                Schema-Based Form Test
            </Typography>

            <Alert severity="info" sx={{ mb: 3 }}>
                This is a test form to verify all components are working correctly, including the new textArea component.
            </Alert>

            <SchemaBasedForm
                type="property"
                formConfig={{
                    title: "Test Property Form",
                    submitButtonText: "Submit Test Form",
                    submittingButtonText: "Submitting...",
                    successMessage: "Test form submitted successfully!",
                    requireImages: false,
                    minImages: 0,
                    maxImages: 5,
                }}
                onSubmit={handleSubmit}
                onError={handleError}
            />
        </Box>
    );
};

export default TestForm; 