// pages/PropertyForm.tsx
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
    Button,
    TextField,
    Typography,
    MenuItem,
    Box,
    InputLabel,
    Stack
} from "@mui/material";
import { useEffect, useState } from "react";
import { ILocation, IPropertyFormValues } from "@/types/property";
import generateSignedUrl from "@/utils/generateSignedUrl";
import DynamicFormRenderer from "@/custom-component/CustomizedSchemaBasedForm/DynamicFormRenderer";
import {
    getFormConfig,
    PropertyFormValues,
    RequirementFormValues,
    validatePropertyForm,
    validateRequirementForm,
    processPropertyFormData,
    processRequirementFormData
} from "@/api/property/list-property-data";
import { useGlobalSnackbar } from "@/hooks/useSnackbar";
import { listPropertyApi } from "@/api/property";
import { useRouter } from "next/router";
import { useGlobalContext } from "@/global-context";

// ----------------------
// Type Definitions
// ----------------------

interface Props {
    type: string;
}

const PropertyListingForm = ({ type }: Props) => {
    const [location, setLocation] = useState<ILocation>();
    const [submitted, setSubmitted] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [propType, setPropType] = useState("");
    const snackbar = useGlobalSnackbar();
    const router = useRouter();
    const { state } = useGlobalContext();

    const isValidType = () => {
        return type === "list-requirement" || type === "list-property";
    };

    const isRequirementForm = () => {
        return propType === "list-requirement";
    };

    // Get form configuration based on type and global state
    const formConfig = getFormConfig(
        isRequirementForm() ? 'requirement' : 'property',
        state
    );


    useEffect(() => {
        if (router.isReady) {
            if (!isValidType() && router.isReady) {
                router.push("/");
            } else {
                setPropType(type);
            }
        }
    }, [router, type]);

    const handleSubmit = async (values: PropertyFormValues | RequirementFormValues) => {
        // Validate form based on type
        const validation = isRequirementForm()
            ? await validateRequirementForm(values as RequirementFormValues)
            : await validatePropertyForm(values as PropertyFormValues);

        if (!validation.isValid) {
            console.error('Validation errors:', validation.errors);
            snackbar.error('Please fix the validation errors');
            return;
        }

        // Check for images only for property form
        if (!isRequirementForm() && selectedFiles.length === 0) {
            snackbar.error("Please select at least one image.");
            return;
        }

        console.log("values", {
            ...values,
            location,
            images: isRequirementForm() ? [] : ["https://www.flatmate.in/dumbbell.png"],
        });

        setIsSubmitting(true);

        try {
            let imageUrls: string[] = [];

            // Handle image uploads only for property form
            if (!isRequirementForm() && selectedFiles.length > 0) {
                const uploadPromises = selectedFiles.map(file =>
                    generateSignedUrl({
                        entity: "property",
                        file: file,
                    })
                );

                const uploadResults = await Promise.all(uploadPromises);

                // Filter out any failed uploads and get the public URLs
                imageUrls = uploadResults
                    .filter(result => result && result.publicUrl)
                    .map(result => result.publicUrl);

                if (imageUrls.length !== selectedFiles.length) {
                    console.error("Some images failed to upload.");
                    snackbar.warning("Some images failed to upload. Please try again.");
                }
            }

            // Process form data based on type
            const processedData = isRequirementForm()
                ? processRequirementFormData(values as RequirementFormValues)
                : processPropertyFormData(values as PropertyFormValues);

            const finalSubmission = {
                ...processedData,
                location,
                images: imageUrls,
            };

            const { data } = await listPropertyApi(finalSubmission);

            snackbar.success(data?.message || 'Successfully submitted!');
            setSubmitted(true);

            // Redirect after successful submission
            setTimeout(() => {
                router.push('/');
            }, 2000);

        } catch (error: any) {
            console.error("Error submitting form:", error);
            snackbar.error(error?.response?.data?.message || 'Failed to submit. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const getFormTitle = () => {
        return isRequirementForm() ? 'List Your Requirement' : 'List Your Property';
    };

    const getSubmitButtonText = () => {
        if (isSubmitting) return 'Submitting...';
        return isRequirementForm() ? 'List Requirement' : 'List Property';
    };

    return (
        propType && (
            <Box maxWidth="md" mt={8} mx="auto">
                <Box className="p-8 shadow-xl rounded-lg bg-white">
                    <Typography variant="h4" className="text-center mb-6 font-semibold text-gray-700">
                        {getFormTitle()}
                    </Typography>

                    <Formik
                        initialValues={formConfig.initialValues}
                        validationSchema={formConfig.validationSchema}
                        onSubmit={handleSubmit}
                        enableReinitialize={true}
                    >
                        {({ handleChange, values, touched, errors, setFieldValue, isValid, dirty }) => (

                            <Form>
                                <Stack spacing={3}>
                                    <DynamicFormRenderer
                                        schema={formConfig.schema}
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
                                        color="primary"
                                        type="submit"
                                        disabled={isSubmitting || !isValid || !dirty}
                                        fullWidth
                                        size="large"
                                        sx={{
                                            mt: 2,
                                            py: 1.5,
                                            fontSize: '1.1rem',
                                            fontWeight: 600,
                                            '&:disabled': {
                                                opacity: 0.6,
                                            }
                                        }}
                                    >
                                        {getSubmitButtonText()}
                                    </Button>

                                    {/* Debug Panel: Only show in development mode */}
                                    {process.env.NODE_ENV === 'development' && (
                                        <Box sx={{ mt: 2, p: 2, bgcolor: '#f5f5f5', border: '1px solid #ccc', borderRadius: 1 }}>
                                            <Typography variant="subtitle2" sx={{ mb: 1 }}>Formik Debug Panel</Typography>
                                            <pre style={{ fontSize: 12, margin: 0 }}>
                                                {JSON.stringify({ errors, isValid, dirty }, null, 2)}
                                            </pre>
                                        </Box>
                                    )}

                                    {submitted && (
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                color: 'success.main',
                                                marginTop: 2,
                                                textAlign: 'center',
                                                fontWeight: 500
                                            }}
                                        >
                                            {isRequirementForm()
                                                ? 'Requirement listed successfully!'
                                                : 'Property listed successfully!'
                                            }
                                        </Typography>
                                    )}

                                    {/* Form Type Indicator */}
                                    <Box sx={{
                                        mt: 2,
                                        p: 2,
                                        bgcolor: 'info.light',
                                        borderRadius: 1,
                                        textAlign: 'center'
                                    }}>
                                        <Typography variant="body2" color="info.contrastText">
                                            {isRequirementForm()
                                                ? '📋 You are listing a requirement for a property'
                                                : '🏠 You are listing a property for rent'
                                            }
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Box>
        )
    );
};

export default PropertyListingForm;
