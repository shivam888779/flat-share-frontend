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
import { useState } from "react";
import { ILocation, IPropertyFormValues } from "@/types/property";
import generateSignedUrl from "@/utils/generateSignedUrl";
import DynamicFormRenderer from "@/custom-component/CustomizedSchemaBasedForm/DynamicFormRenderer";
import { initialValues, propertyFormSchema, PropertyFormValues, Props, validationSchema } from "@/pages/list-property/data";
import { useGlobalSnackbar } from "@/hooks/useSnackbar";

// ----------------------
// Type Definitions
// ----------------------


const PropertyListingForm = ({ type }: Props) => {
    const [location, setLocation] = useState<ILocation>();
    const [submitted, setSubmitted] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const snackbar = useGlobalSnackbar();

    const handleSubmit = async (values: IPropertyFormValues) => {
        if (selectedFiles.length === 0) {
            // Optional: Add user feedback about requiring images
            console.error("Please select at least one image.");
            return;
        }
        console.log("values", {
            ...values,
            location,
            images: ["https://www.flatmate.in/dumbbell.png"],
        })
        setIsSubmitting(true);

        try {
            const uploadPromises = selectedFiles.map(file =>
                generateSignedUrl({
                    entity: "property",
                    file: file,
                })
            );

            const uploadResults = await Promise.all(uploadPromises);

            // Filter out any failed uploads and get the public URLs
            const imageUrls = uploadResults
                .filter(result => result && result.publicUrl)
                .map(result => result.publicUrl);

            if (imageUrls.length !== selectedFiles.length) {
                // Optional: Handle partial upload failures
                console.error("Some images failed to upload.");
            }

            const finalSubmission = {
                ...values,
                location,
                images: imageUrls,
            };

            console.log("Property Details with Image URLs", finalSubmission);
                  const { data } = await listPropertyApi(finalSubmission);


      snackbar.success(data?.message)  
            setSubmitted(true);

        } catch (error) {
            console.error("Error uploading images:", error);
            // Optional: Show an error message to the user
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Box maxWidth="md" mt={8} mx="auto">
            <Box className="p-8 shadow-xl rounded-lg bg-white">
                <Typography variant="h4" className="text-center mb-6 font-semibold text-gray-700">
                    List Your Property
                </Typography>

                <Formik
                    initialValues={initialValues}
                    // validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ handleChange, values, touched, errors, setFieldValue }) => (
                        <Form>
                            <Stack spacing={3}>
                                <DynamicFormRenderer
                                    schema={propertyFormSchema}
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
                                    disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                >
                                    {isSubmitting ? 'Submitting...' : 'List Property'}
                                </Button>

                                {submitted && (
                                    <Typography
                                        variant="body1"
                                        sx={{ color: 'green', marginTop: 2, textAlign: 'center' }}
                                    >
                                        Property listed successfully!
                                    </Typography>
                                )}
                            </Stack>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Box>
    );
};

export default PropertyListingForm;
