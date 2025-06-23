import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import SchemaBasedForm from './SchemaBasedForm';
import { FormFieldSchema } from './formSchema';
import {
    defaultFieldVisibility,
    FormConfig,
    FieldVisibilityConfig
} from './formConfig';

// Example 1: Basic Usage
export const BasicFormExample: React.FC = () => {
    return (
        <Box>
            <Typography variant="h5" gutterBottom>
                Basic Form Example
            </Typography>
            <SchemaBasedForm
                type="property"
                onSubmit={async (values, location, imageUrls) => {
                    console.log('Basic form submitted:', { values, location, imageUrls });
                }}
            />
        </Box>
    );
};

// Example 2: Custom Configuration
export const CustomConfigExample: React.FC = () => {
    const customFormConfig: Partial<FormConfig> = {
        title: "Custom Property Listing",
        submitButtonText: "Save Property",
        submittingButtonText: "Saving...",
        successMessage: "Property saved successfully!",
        requireImages: false,
        minImages: 0,
        maxImages: 5,
    };

    const customVisibility: FieldVisibilityConfig = {
        ...defaultFieldVisibility,
        deposit: { visible: false, required: false }, // Hide deposit field
        preferences: { visible: false, required: false }, // Hide preferences
        resources: { visible: true, required: true }, // Make resources required
    };

    return (
        <Box>
            <Typography variant="h5" gutterBottom>
                Custom Configuration Example
            </Typography>
            <SchemaBasedForm
                formConfig={customFormConfig}
                fieldVisibility={customVisibility}
                onSubmit={async (values, location, imageUrls) => {
                    console.log('Custom config form submitted:', { values, location, imageUrls });
                }}
            />
        </Box>
    );
};

// Example 3: Custom Schema
export const CustomSchemaExample: React.FC = () => {
    const customSchema: FormFieldSchema[] = [
        {
            componentType: "textField",
            name: "propertyName",
            type: "text",
            variant: "outlined",
            fullWidth: true,
            inputLabel: "Property Name",
            propsKey: ["handleChange"],
            required: true,
            placeholder: "Enter property name..."
        },
        {
            componentType: "textField",
            name: "contactNumber",
            type: "text",
            variant: "outlined",
            fullWidth: true,
            inputLabel: "Contact Number",
            propsKey: ["handleChange"],
            required: true,
            placeholder: "Enter contact number..."
        },
        {
            componentType: "textField",
            name: "email",
            type: "email",
            variant: "outlined",
            fullWidth: true,
            inputLabel: "Email Address",
            propsKey: ["handleChange"],
            required: true,
            placeholder: "Enter email address..."
        },
        {
            componentType: "textField",
            name: "notes",
            type: "text",
            variant: "outlined",
            fullWidth: true,
            inputLabel: "Additional Notes",
            propsKey: ["handleChange"],
            multiline: true,
            rows: 3,
            required: false,
            placeholder: "Any additional notes..."
        }
    ];

    return (
        <Box>
            <Typography variant="h5" gutterBottom>
                Custom Schema Example
            </Typography>
            <SchemaBasedForm
                customSchema={customSchema}
                formConfig={{
                    title: "Contact Information Form",
                    submitButtonText: "Submit Contact Info",
                    requireImages: false,
                    minImages: 0,
                }}
                onSubmit={async (values, location, imageUrls) => {
                    console.log('Custom schema form submitted:', { values, location, imageUrls });
                }}
            />
        </Box>
    );
};

// Example 4: Minimal Form
export const MinimalFormExample: React.FC = () => {
    const minimalSchema: FormFieldSchema[] = [
        {
            componentType: "textField",
            name: "title",
            type: "text",
            variant: "outlined",
            fullWidth: true,
            inputLabel: "Title",
            propsKey: ["handleChange"],
            required: true,
            placeholder: "Enter title..."
        },
        {
            componentType: "textField",
            name: "description",
            type: "text",
            variant: "outlined",
            fullWidth: true,
            inputLabel: "Description",
            propsKey: ["handleChange"],
            multiline: true,
            rows: 4,
            required: true,
            placeholder: "Enter description..."
        }
    ];

    return (
        <Box>
            <Typography variant="h5" gutterBottom>
                Minimal Form Example
            </Typography>
            <SchemaBasedForm
                customSchema={minimalSchema}
                formConfig={{
                    title: "Simple Form",
                    submitButtonText: "Submit",
                    requireImages: false,
                    minImages: 0,
                }}
                onSubmit={async (values, location, imageUrls) => {
                    console.log('Minimal form submitted:', { values, location, imageUrls });
                }}
            />
        </Box>
    );
};

// Example 5: Form with Error Handling
export const FormWithErrorHandlingExample: React.FC = () => {
    return (
        <Box>
            <Typography variant="h5" gutterBottom>
                Form with Error Handling Example
            </Typography>
            <SchemaBasedForm
                type="property"
                onSubmit={async (values, location, imageUrls) => {
                    // Simulate an error
                    throw new Error("Simulated submission error");
                }}
                onError={(error) => {
                    console.error('Form submission error:', error);
                    // You could show a toast notification here
                }}
            />
        </Box>
    );
};

// Main Example Component
const ExampleUsage: React.FC = () => {
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Schema-Based Form Examples
            </Typography>

            <Divider sx={{ my: 3 }} />

            <BasicFormExample />

            <Divider sx={{ my: 3 }} />

            <CustomConfigExample />

            <Divider sx={{ my: 3 }} />

            <CustomSchemaExample />

            <Divider sx={{ my: 3 }} />

            <MinimalFormExample />

            <Divider sx={{ my: 3 }} />

            <FormWithErrorHandlingExample />
        </Box>
    );
};

export default ExampleUsage; 