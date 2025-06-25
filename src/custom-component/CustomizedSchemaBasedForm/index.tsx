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
import { ILocation } from "@/types/property";
import generateSignedUrl from "@/utils/generateSignedUrl";
import DynamicFormRenderer from './DynamicFormRenderer';
import { propertyFormSchema } from './formSchema';
import ExampleUsage from "./ExampleUsage";

// ----------------------
// Type Definitions
// ----------------------
interface PropertyFormValues {
    typeId: number;
    rent: number;
    deposit: number;
    resources: number[];
    preferences: number[];
    highLights: number[];
    availableFrom: string;
    description: string;
    partnerGender: string;
}

interface Props {
    type: string;
}

// ----------------------
// Initial Values
// ----------------------
const initialValues: PropertyFormValues = {
    typeId: 0,
    rent: 0,
    deposit: 0,
    resources: [],
    preferences: [],
    availableFrom: "",
    description: "",
    highLights: [],
    partnerGender: "male"
};

// ----------------------
// Validation Schema
// ----------------------
const validationSchema = Yup.object({
    typeId: Yup.number().required("Property type is required"),
    partnerGender: Yup.string().required("Gender is required"),
    rent: Yup.number()
        .typeError("Rent price must be a number")
        .min(1, "Must be greater than 0")
        .required("Rent price is required"),
    deposit: Yup.number()
        .typeError("Deposit must be a number")
        .min(0, "Cannot be negative")
        .required("Deposit is required"),
    availableFrom: Yup.string().required("Available date is required"),
    description: Yup.string()
        .min(10, "Description should be at least 10 characters")
        .required("Description is required"),
});

const PropertyListingForm = ({ type }: Props) => {
    const [location, setLocation] = useState<ILocation>();
    const [submitted, setSubmitted] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (values: PropertyFormValues) => {
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
                    validationSchema={validationSchema}
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
                <ExampleUsage />
            </Box>
        </Box>
    );
};

export default PropertyListingForm;
