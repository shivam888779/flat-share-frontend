// pages/PropertyForm.tsx
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
    Button,
    TextField,
    Typography,
    MenuItem,
    Box,
} from "@mui/material";
import { useState } from "react";
import {
    LocationSearch,
    CustomizedRoundedSelect,
    CustomizedSelectChip,
    SelectSingleOption,
} from "@/custom-component";
import { ILocation } from "@/types/property";

// ----------------------
// Type Definitions
// ----------------------
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

interface Props {
    type: string;
}

// ----------------------
// Initial Values
// ----------------------
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

// ----------------------
// Validation Schema
// ----------------------
const validationSchema = Yup.object({
    typeId: Yup.number().required("Property type is required"),
    partnerGender: Yup.string().required("Gender is required"),
    rentPrice: Yup.number()
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

const schema = [
    {
        name: "Male",
        key: "male"
    },
    {
        name: "Female",
        key: "female"
    },
    {
        name: "Any",
        key: "any"
    }
]
const propertyTypes = [
    {
        name: "Room",
        key: 1
    },
    {
        name: "Flat",
        key: 2
    },
    {
        name: "Villa",
        key:3
    }
]
 const resources = [
                { id: 1, name: "Gym", imgSrc: "https://www.flatmate.in/dumbbell.png" },
                { id: 2, name: "park", imgSrc: "https://www.flatmate.in/dumbbell.png" },
                { id: 3, name: "Swimming pool", imgSrc: "https://www.flatmate.in/dumbbell.png" },
                { id: 4, name: "made", imgSrc: "https://www.flatmate.in/dumbbell.png" },
                { id: 5, name: "AC", imgSrc: "https://www.flatmate.in/dumbbell.png" },
                { id: 6, name: "fan", imgSrc: "https://www.flatmate.in/dumbbell.png" },
                { id: 7, name: "cooler", imgSrc: "https://www.flatmate.in/dumbbell.png" },
                { id: 8, name: "water", imgSrc: "https://www.flatmate.in/dumbbell.png" },
        ]
const PropertyListingForm = ({ type }: Props) => {
    const [location, setLocation] = useState<ILocation>();
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (values: PropertyFormValues) => {
        console.log("Property Details", { ...values, location });
        setSubmitted(true);
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
                            <div className="mb-4">
                                <label className="font-semibold">Property Title</label>
                                <CustomizedRoundedSelect
                                    setFieldValue={setFieldValue}
                                    selectedHighLights={values.highLights}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="font-semibold">Location</label>
                                <LocationSearch setLocation={setLocation} />
                            </div>

                            <div className="mb-4">
                                <div className="mb-4">
                                <label className="font-semibold">Property Type</label>
                                <SelectSingleOption setFieldValue={setFieldValue} selectedValue={values?.typeId} fieldKey={"typeId"} schema={propertyTypes} />
                            </div>
                            </div>

                            <div className="mb-4">
                                <label className="font-semibold">Rent Price</label>
                                <TextField
                                    name="rentPrice"
                                    type="number"
                                    variant="outlined"
                                    fullWidth
                                    value={values.rentPrice}
                                    onChange={handleChange}
                                    error={touched.rentPrice && Boolean(errors.rentPrice)}
                                    helperText={touched.rentPrice && errors.rentPrice}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="font-semibold">Looking for</label>
                                <SelectSingleOption setFieldValue={setFieldValue} selectedValue={values?.partnerGender} fieldKey={"partnerGender"} schema={schema} />
                            </div>

                            <div className="mb-4">
                                <label className="font-semibold">Deposit</label>
                                <TextField
                                    name="deposit"
                                    type="number"
                                    variant="outlined"
                                    fullWidth
                                    value={values.deposit}
                                    onChange={handleChange}
                                    error={touched.deposit && Boolean(errors.deposit)}
                                    helperText={touched.deposit && errors.deposit}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="font-semibold">Amenities</label>
                                <CustomizedSelectChip
                                    setFieldValue={setFieldValue}
                                    selectedResources={values.resources}
                                    fieldKey = {"resources"}
                                    schema ={resources}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="font-semibold">Preferences</label>
                                <CustomizedSelectChip
                                    setFieldValue={setFieldValue}
                                    selectedResources={values.preferences}
                                    fieldKey = {"preferences"}
                                       schema ={resources}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="font-semibold">Available Date</label>
                                <TextField
                                    name="availableFrom"
                                    type="date"
                                    variant="outlined"
                                    fullWidth
                                    value={values.availableFrom}
                                    onChange={handleChange}
                                    error={touched.availableFrom && Boolean(errors.availableFrom)}
                                    helperText={touched.availableFrom && errors.availableFrom}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="font-semibold">Description</label>
                                <TextField
                                    name="description"
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    value={values.description}
                                    onChange={handleChange}
                                    error={touched.description && Boolean(errors.description)}
                                    helperText={touched.description && errors.description}
                                />
                            </div>

                            <div className="flex justify-center">
                                <Button variant="contained" color="primary" type="submit">
                                    Submit Property
                                </Button>
                            </div>

                            {submitted && (
                                <Typography variant="body1" className="text-green-500 mt-4 text-center">
                                    Property Listed Successfully!
                                </Typography>
                            )}
                        </Form>
                    )}
                </Formik>
            </Box>
        </Box>
    );
};

export default PropertyListingForm;
