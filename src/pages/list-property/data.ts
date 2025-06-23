import { FormFieldSchema } from "@/custom-component/CustomizedSchemaBasedForm/formSchema";
import * as Yup from "yup";

export const propertyTypes = [
    { name: "Room", key: 1 },
    { name: "Flat", key: 2 },
    { name: "Villa", key: 3 }
];

export const partnerGenderSchema = [
    { name: "Male", key: "male" },
    { name: "Female", key: "female" },
    { name: "Any", key: "any" }
];

export const resources = [
    { id: 1, name: "Gym", imgSrc: "https://www.flatmate.in/dumbbell.png" },
    { id: 2, name: "Park", imgSrc: "https://www.flatmate.in/dumbbell.png" },
    { id: 3, name: "Swimming Pool", imgSrc: "https://www.flatmate.in/dumbbell.png" },
    { id: 4, name: "Maid Service", imgSrc: "https://www.flatmate.in/dumbbell.png" },
    { id: 5, name: "AC", imgSrc: "https://www.flatmate.in/dumbbell.png" },
    { id: 6, name: "Fan", imgSrc: "https://www.flatmate.in/dumbbell.png" },
    { id: 7, name: "Cooler", imgSrc: "https://www.flatmate.in/dumbbell.png" },
    { id: 8, name: "Water Supply", imgSrc: "https://www.flatmate.in/dumbbell.png" },
];

export const propertyHighlights = [
    { id: 1, name: "Furnished", imgSrc: "https://www.flatmate.in/furnished.png" },
    { id: 2, name: "Semi-Furnished", imgSrc: "https://www.flatmate.in/semi-furnished.png" },
    { id: 3, name: "Unfurnished", imgSrc: "https://www.flatmate.in/unfurnished.png" },
    { id: 4, name: "Pet Friendly", imgSrc: "https://www.flatmate.in/pet-friendly.png" },
    { id: 5, name: "Balcony", imgSrc: "https://www.flatmate.in/balcony.png" },
    { id: 6, name: "Parking", imgSrc: "https://www.flatmate.in/parking.png" },
];

// Main form schema
export const propertyFormSchema: FormFieldSchema[] = [
    {
        componentType: "roundedSelect",
        name: "highLights",
        type: "select",
        variant: undefined,
        fullWidth: false,
        fieldKey: undefined,
        schema: propertyHighlights,
        inputLabel: "Property Title",
        propsKey: ["setFieldValue", "selectedHighLights"],
        required: true
    },
    {
        componentType: "locationSearch",
        name: "location",
        type: "autoComplete",
        variant: undefined,
        fullWidth: false,
        fieldKey: undefined,
        schema: undefined,
        inputLabel: "Location",
        propsKey: ["setLocation"],
        required: true
    },
    {
        componentType: "selectSingleOption",
        name: "typeId",
        type: "tabSelect",
        variant: undefined,
        fullWidth: false,
        fieldKey: "typeId",
        schema: propertyTypes,
        inputLabel: "Property Type",
        propsKey: ["setFieldValue"],
        required: true
    },
    {
        componentType: "textField",
        name: "rentPrice",
        type: "number",
        variant: "outlined",
        fullWidth: true,
        fieldKey: undefined,
        schema: undefined,
        inputLabel: "Rent Price",
        propsKey: ["handleChange"],
        required: true,
        placeholder: "Enter rent amount",
        min: 1,
        max: 1000000,
        step: 100
    },
    {
        componentType: "textField",
        name: "deposit",
        type: "number",
        variant: "outlined",
        fullWidth: true,
        fieldKey: undefined,
        schema: undefined,
        inputLabel: "Deposit",
        propsKey: ["handleChange"],
        required: true,
        placeholder: "Enter deposit amount",
        min: 0,
        max: 1000000,
        step: 100
    },
    {
        componentType: "textField",
        name: "availableFrom",
        type: "date",
        variant: "outlined",
        fullWidth: true,
        fieldKey: undefined,
        schema: undefined,
        inputLabel: "Available From",
        propsKey: ["handleChange"],
        required: true,
        InputLabelProps: { shrink: true }
    },
    {
        componentType: "selectSingleOption",
        name: "partnerGender",
        type: "tabSelect",
        variant: undefined,
        fullWidth: false,
        fieldKey: "partnerGender",
        schema: partnerGenderSchema,
        inputLabel: "Partner Gender",
        propsKey: ["setFieldValue"],
        required: true
    },
    {
        componentType: "selectChip",
        name: "resources",
        type: "multiSelect",
        variant: undefined,
        fullWidth: false,
        fieldKey: "resources",
        schema: resources,
        inputLabel: "Resources",
        propsKey: ["setFieldValue"],
        required: false
    },
    {
        componentType: "selectChip",
        name: "preferences",
        type: "multiSelect",
        variant: undefined,
        fullWidth: false,
        fieldKey: "preferences",
        schema: resources,
        inputLabel: "Preferences",
        propsKey: ["setFieldValue"],
        required: false
    },
    {
        componentType: "textArea",
        name: "description",
        type: "text",
        variant: undefined,
        fullWidth: true,
        fieldKey: undefined,
        schema: undefined,
        inputLabel: "Description",
        propsKey: ["handleChange"],
        rows: 4,
        required: true,
        placeholder: "Describe your property in detail..."
    },
    {
        componentType: "imageUpload",
        name: "images",
        type: "file",
        variant: undefined,
        fullWidth: false,
        fieldKey: undefined,
        schema: undefined,
        inputLabel: "Upload Images",
        propsKey: ["setSelectedFiles"],
        required: true
    }
];

export interface PropertyFormValues {
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

export interface Props {
    type: string;
}

// ----------------------
// Initial Values
// ----------------------
export const initialValues: PropertyFormValues = {
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
export const validationSchema = Yup.object({
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