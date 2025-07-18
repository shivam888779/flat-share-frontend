// pages/PropertyForm.tsx
import { Formik, Form } from "formik";
import {
    Button,
    Typography,
    Box,
    Stack,
    Paper,
    Divider,
    IconButton
} from "@mui/material";
import { useEffect, useState } from "react";
import { ILocation, IPropertyDetails, IPropertyFormValues } from "@/types/property";
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
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CloseIcon from '@mui/icons-material/Close';
import ImageUpload from "@/component/ImageUpload";

interface Props {
    type: string;
    isEdit?: boolean;
}

const ListPropertyForm = ({ type, isEdit }: Props) => {
    const [location, setLocation] = useState<ILocation>();
    const [submitted, setSubmitted] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [propType, setPropType] = useState("");
    const snackbar = useGlobalSnackbar();
    const router = useRouter();
    const { state } = useGlobalContext();
    const myProperty = state.myProperty;
    const [existingImages, setExistingImages] = useState<string[]>(isEdit ? myProperty?.images || [] : []);

    const isValidType = () => {
        return type === "requirement" || type === "property";
    };

    const isRequirementForm = () => {
        return propType === "requirement";
    };

    const formConfig = getFormConfig(
        isRequirementForm() ? 'requirement' : 'property',
        state
    );

    useEffect(() => {
        if (router.isReady) {
            if (!isValidType() && router.isReady && !isEdit) {
                router.push("/");
            } else {
                setPropType(type);
            }
        }
    }, [router, type]);

    const handleRemoveExistingImage = (url: string) => {
        setExistingImages((prev) => prev.filter((img) => img !== url));
    };

    const handleSubmit = async (values: PropertyFormValues | RequirementFormValues) => {
        const validation = isRequirementForm()
            ? await validateRequirementForm(values as RequirementFormValues)
            : await validatePropertyForm(values as PropertyFormValues);

        if (!validation.isValid) {
            console.error('Validation errors:', validation.errors);
            snackbar.error('Please fix the validation errors');
            return;
        }

        if (!isRequirementForm() && selectedFiles.length === 0 && existingImages.length === 0) {
            snackbar.error("Please select at least one image.");
            return;
        }

        setIsSubmitting(true);

        try {

            let imageUrls: string[] = isEdit ? myProperty?.images || [] : [...existingImages]; // Start with existing images

            if (!isRequirementForm() && selectedFiles.length > 0) {
                const uploadPromises = selectedFiles.map(file =>
                    generateSignedUrl({
                        entity: "property",
                        file: file,
                    })
                );

                const uploadResults = await Promise.all(uploadPromises);
                const newUrls = uploadResults
                    .filter(result => result && result.publicUrl)
                    .map(result => result.publicUrl);

                if (newUrls.length !== selectedFiles.length) {
                    console.error("Some images failed to upload.");
                    snackbar.warning("Some images failed to upload. Please try again.");
                }
                imageUrls = isEdit ? [...myProperty?.images || [], ...newUrls] : [...existingImages, ...newUrls];
            }

            const processedData = isRequirementForm()
                ? processRequirementFormData(values as RequirementFormValues)
                : processPropertyFormData(values as PropertyFormValues);

            console.log("selectedFiles", selectedFiles, myProperty?.images);
            console.log("imageUrls", imageUrls);
            const finalSubmission = {
                ...processedData,
                location,
                images: imageUrls,
            };

            const { data } = await listPropertyApi(finalSubmission);

            snackbar.success(data?.message || 'Successfully submitted!');
            setSubmitted(true);

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

    console.log(myProperty);
    return (
        propType && (
            <Box
                sx={{
                    minHeight: '100vh',
                    backgroundColor: '#f3f4f6',
                }}
            >
                <Box maxWidth="900px" mx="auto" px={2}>
                    <Typography
                        variant="h4"
                        sx={{
                            textAlign: 'center',
                            mb: 4,
                            fontWeight: 700,
                            color: 'text.primary',
                        }}
                    >
                        {isEdit ? 'Edit Your Property' : getFormTitle()}
                    </Typography>

                    <Paper
                        elevation={0}
                        sx={{
                            borderRadius: '16px',
                            backgroundColor: 'white',
                            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                            overflow: 'hidden',
                        }}
                    >
                        <Box sx={{ p: { xs: 3, sm: 4 } }}>
                            <Formik
                                initialValues={isEdit ? {
                                    ...myProperty,
                                    images: undefined // Reset images for edit mode since we can't convert string[] to File[]
                                } as PropertyFormValues : formConfig.initialValues}
                                validationSchema={formConfig.validationSchema}
                                onSubmit={handleSubmit}
                                enableReinitialize={true}
                            >
                                {({ handleChange, values, touched, errors, setFieldValue, isValid, dirty }) => (
                                    <Form>
                                        <Stack spacing={0}>
                                            {/* Form Fields */}
                                            <DynamicFormRenderer
                                                schema={formConfig.schema}
                                                values={values}
                                                touched={touched}
                                                errors={errors}
                                                handleChange={handleChange}
                                                setFieldValue={setFieldValue}
                                                setLocation={setLocation}
                                                setSelectedFiles={setSelectedFiles} // Remove this from DynamicFormRenderer if not needed
                                            />



                                            {/* Submit Button */}
                                            <Button
                                                variant="contained"
                                                type="submit"
                                                disabled={isSubmitting || !isValid || !dirty}
                                                fullWidth
                                                size="large"
                                                sx={{
                                                    mt: 3,
                                                    py: 1.5,
                                                    fontSize: '1rem',
                                                    fontWeight: 600,
                                                    textTransform: 'none',
                                                    borderRadius: '8px',
                                                    backgroundColor: 'primary.main',
                                                    boxShadow: 'none',
                                                    '&:hover': {
                                                        backgroundColor: 'primary.dark',
                                                        boxShadow: 'none',
                                                    },
                                                    '&:disabled': {
                                                        backgroundColor: '#e5e7eb',
                                                        color: '#9ca3af',
                                                    },
                                                }}
                                            >
                                                {getSubmitButtonText()}
                                            </Button>

                                            {/* Debug Panel */}
                                            {process.env.NODE_ENV === 'development' && (
                                                <Box
                                                    sx={{
                                                        mt: 2,
                                                        p: 2,
                                                        bgcolor: '#f3e8ff',
                                                        border: '1px solid #e9d5ff',
                                                        borderRadius: '8px',
                                                    }}
                                                >
                                                    <Typography
                                                        variant="subtitle2"
                                                        sx={{
                                                            mb: 1,
                                                            fontWeight: 600,
                                                            color: '#6b21a8',
                                                            fontFamily: 'monospace',
                                                        }}
                                                    >
                                                        FormIt Debug Panel
                                                    </Typography>
                                                    <pre style={{
                                                        fontSize: '0.75rem',
                                                        margin: 0,
                                                        color: '#6b21a8',
                                                        fontFamily: 'monospace',
                                                    }}>
                                                        {`{
  "errors": ${JSON.stringify(errors, null, 2).split('\n').slice(1).join('\n  ')},
  "isValid": ${isValid},
  "dirty": ${dirty}
}`}
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
                                        </Stack>
                                    </Form>
                                )}
                            </Formik>
                        </Box>

                        {/* Form Type Indicator */}
                        <Box
                            sx={{
                                p: 2,
                                bgcolor: '#e0e7ff',
                                textAlign: 'center',
                                borderTop: '1px solid #e5e7eb',
                            }}
                        >
                            <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="center"
                                spacing={1}
                            >
                                {isRequirementForm() ? (
                                    <AssignmentIcon sx={{ color: 'primary.main', fontSize: '1.25rem' }} />
                                ) : (
                                    <HomeIcon sx={{ color: 'primary.main', fontSize: '1.25rem' }} />
                                )}
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'primary.main',
                                        fontWeight: 500,
                                        fontSize: '0.875rem',
                                    }}
                                >
                                    {isRequirementForm()
                                        ? 'You are listing a requirement for a property'
                                        : 'You are listing a property for rent'
                                    }
                                </Typography>
                            </Stack>
                        </Box>
                    </Paper>
                </Box>
            </Box>
        )
    );
};

export default ListPropertyForm;