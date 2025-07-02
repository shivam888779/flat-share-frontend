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

export const properyOccupancySchema = [
    { name: "Single", key: "single" },
    { name: "Double", key: "double" },
    { name: "Tripple", key: "tripple" },
    { name: "More than 3", key: "any" },
];

// Fallback data in case global context is not available
export const fallbackResources = [
    { id: 1, name: "Gym", imgSrc: "https://www.flatmate.in/dumbbell.png" },
    { id: 2, name: "Park", imgSrc: "https://www.flatmate.in/dumbbell.png" },
    { id: 3, name: "Swimming Pool", imgSrc: "https://www.flatmate.in/dumbbell.png" },
    { id: 4, name: "Maid Service", imgSrc: "https://www.flatmate.in/dumbbell.png" },
    { id: 5, name: "AC", imgSrc: "https://www.flatmate.in/dumbbell.png" },
    { id: 6, name: "Fan", imgSrc: "https://www.flatmate.in/dumbbell.png" },
    { id: 7, name: "Cooler", imgSrc: "https://www.flatmate.in/dumbbell.png" },
    { id: 8, name: "Water Supply", imgSrc: "https://www.flatmate.in/dumbbell.png" },
];

export const fallbackPropertyHighlights = [
    { id: 1, name: "Furnished", imgSrc: "https://www.flatmate.in/furnished.png" },
    { id: 2, name: "Semi-Furnished", imgSrc: "https://www.flatmate.in/semi-furnished.png" },
    { id: 3, name: "Unfurnished", imgSrc: "https://www.flatmate.in/unfurnished.png" },
    { id: 4, name: "Pet Friendly", imgSrc: "https://www.flatmate.in/pet-friendly.png" },
    { id: 5, name: "Balcony", imgSrc: "https://www.flatmate.in/balcony.png" },
    { id: 6, name: "Parking", imgSrc: "https://www.flatmate.in/parking.png" },
];

// Dynamic schema generation functions
export const createPropertySchema = (globalState?: any): FormFieldSchema[] => {
    const highlights = globalState?.highLights || fallbackPropertyHighlights;
    const resources = globalState?.resources || fallbackResources;
    const preferences = globalState?.preferences || fallbackResources;

    return [
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
            name: "rent",
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
            name: "occupancy",
            type: "tabSelect",
            variant: undefined,
            fullWidth: false,
            fieldKey: "occupancy",
            schema: properyOccupancySchema,
            inputLabel: "Occupancy",
            propsKey: ["setFieldValue"],
            required: true
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
            componentType: "roundedSelect",
            name: "highLights",
            type: "select",
            variant: undefined,
            fullWidth: false,
            fieldKey: undefined,
            schema: highlights,
            inputLabel: "Property Title",
            propsKey: ["setFieldValue", "selectedHighLights"],
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
            schema: preferences,
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
            required: true,
            max: 3
        }
    ];
};

export const createRequirementSchema = (globalState?: any): FormFieldSchema[] => {
    const highlights = globalState?.highLights || fallbackPropertyHighlights;
    const resources = globalState?.resources || fallbackResources;
    const preferences = globalState?.preferences || fallbackResources;

    return [
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
            componentType: "textField",
            name: "rent",
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
            componentType: "selectSingleOption",
            name: "occupancy",
            type: "tabSelect",
            variant: undefined,
            fullWidth: false,
            fieldKey: "occupancy",
            schema: properyOccupancySchema,
            inputLabel: "Occupancy",
            propsKey: ["setFieldValue"],
            required: true
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
            componentType: "roundedSelect",
            name: "highLights",
            type: "select",
            variant: undefined,
            fullWidth: false,
            fieldKey: undefined,
            schema: highlights,
            inputLabel: "Property Title",
            propsKey: ["setFieldValue", "selectedHighLights"],
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
            schema: preferences,
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
            placeholder: "Describe your requirement in detail..."
        }
    ];
};

// Legacy schemas for backward compatibility
export const propertyFormSchema: FormFieldSchema[] = createPropertySchema();
export const requirementFormSchema: FormFieldSchema[] = createRequirementSchema();

// Type definitions
export interface PropertyFormValues {
    typeId: number;
    rent: number | null;
    deposit: number | null;
    resources: number[];
    preferences: number[];
    highLights: number[];
    availableFrom: string;
    description: string;
    partnerGender: string;
    occupancy: string;
    images?: File[];
    location?: string;
}

export interface RequirementFormValues {
    rent: number | null;
    resources: number[];
    typeId: number,
    preferences: number[];
    highLights: number[];
    description: string;
    partnerGender: string;
    occupancy: string;
    location?: string;
}

export interface Props {
    type: string;
}

// Initial values
export const propertyInitialValues: PropertyFormValues = {
    typeId: 1,
    rent: null,
    deposit: null,
    resources: [],
    preferences: [],
    availableFrom: "",
    description: "",
    highLights: [],
    partnerGender: "male",
    occupancy: "single"
};

export const requirementInitialValues: RequirementFormValues = {
    rent: null,
    typeId: 2,
    resources: [],
    preferences: [],
    description: "",
    highLights: [],
    partnerGender: "male",
    occupancy: "single"
};

// Validation schemas
export const propertyValidationSchema = Yup.object({
    typeId: Yup.number()
        .min(1, "Please select a property type")
        .required("Property type is required"),
    partnerGender: Yup.string()
        .oneOf(["male", "female", "any"], "Please select a valid gender preference")
        .required("Gender preference is required"),
    rent: Yup.number()
        .typeError("Rent price must be a number")
        .min(1, "Rent must be greater than 0")
        .max(1000000, "Rent cannot exceed 1,000,000")
        .required("Rent price is required"),
    deposit: Yup.number()
        .typeError("Deposit must be a number")
        .min(0, "Deposit cannot be negative")
        .max(1000000, "Deposit cannot exceed 1,000,000")
        .required("Deposit is required"),
    availableFrom: Yup.string()
        .required("Available date is required"),
    description: Yup.string()
        .min(10, "Description should be at least 10 characters")
        .max(1000, "Description cannot exceed 1000 characters")
        .required("Description is required"),
    occupancy: Yup.string()
        .oneOf(["single", "double", "tripple", "any"], "Please select a valid occupancy")
        .required("Occupancy is required"),
    highLights: Yup.array()
        .min(1, "Please select at least one property highlight")
        .required("Property highlights are required"),
    // location: Yup.string()
    //     .required("Location is required"),\
});

export const requirementValidationSchema = Yup.object({
    partnerGender: Yup.string()
        .oneOf(["male", "female", "any"], "Please select a valid gender preference")
        .required("Gender preference is required"),
    rent: Yup.number()
        .typeError("Rent price must be a number")
        .min(1, "Rent must be greater than 0")
        .max(1000000, "Rent cannot exceed 1,000,000")
        .required("Rent price is required"),
    description: Yup.string()
        .min(10, "Description should be at least 10 characters")
        .max(1000, "Description cannot exceed 1000 characters")
        .required("Description is required"),
    occupancy: Yup.string()
        .oneOf(["single", "double", "tripple", "any"], "Please select a valid occupancy")
        .required("Occupancy is required"),
    highLights: Yup.array()
        .min(1, "Please select at least one property highlight")
        .required("Property highlights are required"),
    // location: Yup.string()
    //     .required("Location is required")
});

// Form validation and processing functions
export const validatePropertyForm = async (values: PropertyFormValues): Promise<{ isValid: boolean; errors: any }> => {
    try {
        await propertyValidationSchema.validate(values, { abortEarly: false });
        return { isValid: true, errors: {} };
    } catch (error: any) {
        const errors: any = {};
        if (error.inner) {
            error.inner.forEach((err: any) => {
                errors[err.path] = err.message;
            });
        }
        return { isValid: false, errors };
    }
};

export const validateRequirementForm = async (values: RequirementFormValues): Promise<{ isValid: boolean; errors: any }> => {
    try {
        await requirementValidationSchema.validate(values, { abortEarly: false });
        return { isValid: true, errors: {} };
    } catch (error: any) {
        const errors: any = {};
        if (error.inner) {
            error.inner.forEach((err: any) => {
                errors[err.path] = err.message;
            });
        }
        return { isValid: false, errors };
    }
};

// Form data processing functions
export const processPropertyFormData = (values: PropertyFormValues) => {
    return {
        ...values,
        rent: Number(values.rent),
        deposit: Number(values.deposit),
        // Add any additional processing here
    };
};

export const processRequirementFormData = (values: RequirementFormValues) => {
    return {
        ...values,
        rent: Number(values.rent),
        // Add any additional processing here
    };
};

// Utility functions for form handling
export const getFormConfig = (type: 'property' | 'requirement', globalState?: any) => {
    if (type === 'property') {
        return {
            schema: createPropertySchema(globalState),
            initialValues: propertyInitialValues,
            validationSchema: propertyValidationSchema,
            validate: validatePropertyForm,
            processData: processPropertyFormData
        };
    } else {
        return {
            schema: createRequirementSchema(globalState),
            initialValues: requirementInitialValues,
            validationSchema: requirementValidationSchema,
            validate: validateRequirementForm,
            processData: processRequirementFormData
        };
    }
};

// Legacy exports for backward compatibility
export const initialValues = propertyInitialValues;
export const validationSchema = propertyValidationSchema;