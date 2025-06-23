import React, { useState } from 'react';
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
    Button,
    Typography,
    Box,
    Stack,
    Alert,
    Snackbar
} from "@mui/material";
import generateSignedUrl from "@/utils/generateSignedUrl";
import DynamicFormRenderer from './DynamicFormRenderer';
import { FormFieldSchema } from './formSchema';
import {
    FormConfig,
    defaultFormConfig,
    FieldVisibilityConfig,
    defaultFieldVisibility,
    filterSchemaByVisibility,
    updateSchemaRequirements,
    FormLayoutConfig,
    defaultLayoutConfig,
    FormThemeConfig,
    defaultThemeConfig
} from './formConfig';

interface GenericSchemaBasedFormProps<T = any> {
    title: string;
    initialValues: T;
    validationSchema: Yup.ObjectSchema<any>;
    schema: FormFieldSchema[];
    formConfig?: Partial<FormConfig>;
    fieldVisibility?: FieldVisibilityConfig;
    layoutConfig?: Partial<FormLayoutConfig>;
    themeConfig?: Partial<FormThemeConfig>;
    onSubmit: (values: T, imageUrls?: string[]) => Promise<void>;
    onError?: (error: any) => void;
    submitButtonText?: string;
    submittingButtonText?: string;
    successMessage?: string;
    requireImages?: boolean;
    minImages?: number;
    maxImages?: number;
}

const GenericSchemaBasedForm = <T extends Record<string, any>>({
    title,
    initialValues,
    validationSchema,
    schema,
    formConfig = {},
    fieldVisibility = defaultFieldVisibility,
    layoutConfig = {},
    themeConfig = {},
    onSubmit,
    onError,
    submitButtonText = "Submit",
    submittingButtonText = "Submitting...",
    successMessage = "Form submitted successfully!",
    requireImages = false,
    minImages = 0,
    maxImages = 10
}: GenericSchemaBasedFormProps<T>) => {
    const [submitted, setSubmitted] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Merge configurations with defaults
    const finalFormConfig = {
        ...defaultFormConfig,
        ...formConfig,
        title,
        submitButtonText,
        submittingButtonText,
        successMessage,
        requireImages,
        minImages,
        maxImages
    };
    const finalLayoutConfig = { ...defaultLayoutConfig, ...layoutConfig };
    const finalThemeConfig = { ...defaultThemeConfig, ...themeConfig };

    // Process schema based on visibility and requirements
    const visibleSchema = filterSchemaByVisibility(schema, fieldVisibility);
    const finalSchema = updateSchemaRequirements(visibleSchema, fieldVisibility);

    const handleSubmit = async (values: T) => {
        // Validate images if required
        if (finalFormConfig.requireImages && selectedFiles.length === 0) {
            setError("Please select at least one image.");
            return;
        }

        if (selectedFiles.length < finalFormConfig.minImages) {
            setError(`Please select at least ${finalFormConfig.minImages} image(s).`);
            return;
        }

        if (selectedFiles.length > finalFormConfig.maxImages) {
            setError(`Please select no more than ${finalFormConfig.maxImages} images.`);
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            let imageUrls: string[] = [];

            // Upload images if any are selected
            if (selectedFiles.length > 0) {
                const uploadPromises = selectedFiles.map(file =>
                    generateSignedUrl({
                        entity: "profile", // You can make this configurable
                        file: file,
                    })
                );

                const uploadResults = await Promise.all(uploadPromises);
                imageUrls = uploadResults
                    .filter(result => result && result.publicUrl)
                    .map(result => result.publicUrl);

                if (imageUrls.length !== selectedFiles.length) {
                    console.error("Some images failed to upload.");
                }
            }

            // Call the onSubmit function
            await onSubmit(values, imageUrls);
            setSubmitted(true);

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An error occurred";
            setError(errorMessage);
            onError?.(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCloseError = () => {
        setError(null);
    };

    return (
        <Box
            maxWidth={finalLayoutConfig.maxWidth}
            mt={8}
            mx="auto"
            sx={{
                backgroundColor: finalThemeConfig.backgroundColor,
                color: finalThemeConfig.textColor,
            }}
        >
            <Box
                className={`${finalLayoutConfig.padding} ${finalLayoutConfig.backgroundColor} ${finalLayoutConfig.borderRadius} ${finalLayoutConfig.boxShadow}`}
                sx={{
                    border: `1px solid ${finalThemeConfig.borderColor}`,
                }}
            >
                <Typography
                    variant="h4"
                    className="text-center mb-6 font-semibold"
                    sx={{ color: finalThemeConfig.textColor }}
                >
                    {finalFormConfig.title}
                </Typography>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ handleChange, values, touched, errors, setFieldValue }) => (
                        <Form>
                            <Stack spacing={finalLayoutConfig.spacing}>
                                <DynamicFormRenderer
                                    schema={finalSchema}
                                    values={values}
                                    touched={touched}
                                    errors={errors}
                                    handleChange={handleChange}
                                    setFieldValue={setFieldValue}
                                    setLocation={() => { }} // Not needed for profile form
                                    setSelectedFiles={setSelectedFiles}
                                />

                                <Button
                                    variant="contained"
                                    type="submit"
                                    disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                    sx={{
                                        backgroundColor: finalThemeConfig.primaryColor,
                                        '&:hover': {
                                            backgroundColor: finalThemeConfig.primaryColor,
                                            opacity: 0.9,
                                        },
                                    }}
                                >
                                    {isSubmitting ? finalFormConfig.submittingButtonText : finalFormConfig.submitButtonText}
                                </Button>

                                {submitted && (
                                    <Alert
                                        severity="success"
                                        sx={{
                                            backgroundColor: finalThemeConfig.successColor,
                                            color: 'white',
                                        }}
                                    >
                                        {finalFormConfig.successMessage}
                                    </Alert>
                                )}
                            </Stack>
                        </Form>
                    )}
                </Formik>
            </Box>

            <Snackbar
                open={!!error}
                autoHideDuration={6000}
                onClose={handleCloseError}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleCloseError}
                    severity="error"
                    sx={{
                        backgroundColor: finalThemeConfig.errorColor,
                        color: 'white',
                    }}
                >
                    {error}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default GenericSchemaBasedForm; 