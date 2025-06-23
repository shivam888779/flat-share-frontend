import React, { useState } from 'react';
import { Formik, Form } from "formik";
import {
    Button,
    Typography,
    Box,
    Stack,
    Alert,
    Snackbar
} from "@mui/material";
import { ILocation } from "@/types/property";
import generateSignedUrl from "@/utils/generateSignedUrl";
import DynamicFormRenderer from './DynamicFormRenderer';
import { propertyFormSchema, FormFieldSchema } from './formSchema';
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
import { customValidationSchema } from './validationUtils';

interface PropertyFormValues {
    typeId: number;
    rentPrice: number;
    deposit: number;
    resources: number[];
    preferences: number[];
    highLights: number[];
    availableFrom: string;
    description: string;
    partnerGender: string;
}

interface SchemaBasedFormProps {
    type?: string;
    formConfig?: Partial<FormConfig>;
    fieldVisibility?: FieldVisibilityConfig;
    layoutConfig?: Partial<FormLayoutConfig>;
    themeConfig?: Partial<FormThemeConfig>;
    customSchema?: FormFieldSchema[];
    onSubmit?: (values: PropertyFormValues, location: ILocation, imageUrls: string[]) => Promise<void>;
    onError?: (error: any) => void;
}

const initialValues: PropertyFormValues = {
    typeId: 0,
    rentPrice: 0,
    deposit: 0,
    resources: [],
    preferences: [],
    availableFrom: "",
    description: "",
    highLights: [],
    partnerGender: "male"
};

const SchemaBasedForm: React.FC<SchemaBasedFormProps> = ({
    type = "property",
    formConfig = {},
    fieldVisibility = defaultFieldVisibility,
    layoutConfig = {},
    themeConfig = {},
    customSchema,
    onSubmit,
    onError
}) => {
    const [location, setLocation] = useState<ILocation>();
    const [submitted, setSubmitted] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Merge configurations with defaults
    const finalFormConfig = { ...defaultFormConfig, ...formConfig };
    const finalLayoutConfig = { ...defaultLayoutConfig, ...layoutConfig };
    const finalThemeConfig = { ...defaultThemeConfig, ...themeConfig };

    // Process schema based on visibility and requirements
    const baseSchema = customSchema || propertyFormSchema;
    const visibleSchema = filterSchemaByVisibility(baseSchema, fieldVisibility);
    const finalSchema = updateSchemaRequirements(visibleSchema, fieldVisibility);

    const handleSubmit = async (values: PropertyFormValues) => {
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
            // Upload images
            const uploadPromises = selectedFiles.map(file =>
                generateSignedUrl({
                    entity: "property",
                    file: file,
                })
            );

            const uploadResults = await Promise.all(uploadPromises);
            const imageUrls = uploadResults
                .filter(result => result && result.publicUrl)
                .map(result => result.publicUrl);

            if (imageUrls.length !== selectedFiles.length) {
                console.error("Some images failed to upload.");
            }

            // Call custom onSubmit if provided, otherwise use default behavior
            if (onSubmit) {
                await onSubmit(values, location!, imageUrls);
            } else {
                const finalSubmission = {
                    ...values,
                    location,
                    images: imageUrls,
                };
                console.log("Property Details with Image URLs", finalSubmission);
            }

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
                    validationSchema={customValidationSchema}
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
                                    setLocation={setLocation}
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

export default SchemaBasedForm; 