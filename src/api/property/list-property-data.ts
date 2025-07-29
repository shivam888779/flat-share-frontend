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
    {
        "id": 1,
        "name": "Bed",
        "imgSrc": null
    },
    {
        "id": 2,
        "name": "Table",
        "imgSrc": null
    },
    {
        "id": 3,
        "name": "Chair",
        "imgSrc": null
    },
    {
        "id": 4,
        "name": "Fan",
        "imgSrc": null
    },
    {
        "id": 5,
        "name": "Wardrobe",
        "imgSrc": null
    },
    {
        "id": 6,
        "name": "Mattress",
        "imgSrc": null
    },
    {
        "id": 7,
        "name": "Refrigerator",
        "imgSrc": null
    },
    {
        "id": 8,
        "name": "Washing Machine",
        "imgSrc": null
    },
    {
        "id": 9,
        "name": "Curtains",
        "imgSrc": null
    },
    {
        "id": 10,
        "name": "TV",
        "imgSrc": null
    }
]

export const fallbackPropertyHighlights = [{
    "id": 1,
    "name": "Security",
    "imgSrc": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMiI+PHBhdGggZD0iTTEyIDJMMyA3bDkgMTcgOS0xN3oiLz48cGF0aCBkPSJNMTIgMnYyMCIvPjxwYXRoIGQ9Ik04IDExbDQgNCA4LTgiLz48L3N2Zz4="
},
{
    "id": 2,
    "name": "Furnished",
    "imgSrc": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMiI+PHBhdGggZD0iTTQgN1Y0YTIgMiAwIDAgMSAyLTJoMTJhMiAyIDAgMCAxIDIgMnYzIi8+PHBhdGggZD0iTTQgN2gxNiIvPjxwYXRoIGQ9Ik00IDd2MTFhMiAyIDAgMCAwIDIgMmgxMmEyIDIgMCAwIDAgMi0yVjciLz48cGF0aCBkPSJNOCAxMXY2Ii8+PHBhdGggZD0iTTE2IDExdjYiLz48cGF0aCBkPSJNMTIgMTF2NiIvPjwvc3ZnPg=="
},
{
    "id": 3,
    "name": "AC Room",
    "imgSrc": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMiI+PHJlY3QgeD0iMyIgeT0iMyIgd2lkdGg9IjE4IiBoZWlnaHQ9IjgiIHJ4PSIyIi8+PHBhdGggZD0iTTcgMTV2NCIvPjxwYXRoIGQ9Ik0xMiAxNXY0Ii8+PHBhdGggZD0iTTE3IDE1djQiLz48cGF0aCBkPSJNNyAxOWgxMCIvPjxjaXJjbGUgY3g9IjgiIGN5PSI3IiByPSIxIi8+PGNpcmNsZSBjeD0iMTYiIGN5PSI3IiByPSIxIi8+PC9zdmc+"
},
{
    "id": 4,
    "name": "WiFi",
    "imgSrc": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMiI+PHBhdGggZD0iTTUgMTNhMTAgMTAgMCAwIDEgMTQgMCIvPjxwYXRoIGQ9Ik04IDE2YTYgNiAwIDAgMSA4IDAiLz48cGF0aCBkPSJNMTEgMTlhMiAyIDAgMCAxIDIgMCIvPjxjaXJjbGUgY3g9IjEyIiBjeT0iMjAiIHI9IjEiLz48L3N2Zz4="
},
{
    "id": 5,
    "name": "Power Backup",
    "imgSrc": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMiI+PHJlY3QgeD0iNiIgeT0iNiIgd2lkdGg9IjEyIiBoZWlnaHQ9IjEyIiByeD0iMiIvPjxwYXRoIGQ9Ik04IDZWNGEyIDIgMCAwIDEgMi0yaDRhMiAyIDAgMCAxIDIgMnYyIi8+PHBhdGggZD0iTTEyIDEwdjQiLz48cGF0aCBkPSJNMTAgMTJoNCIvPjxwYXRoIGQ9Ik04IDE4aDgiLz48L3N2Zz4="
},
{
    "id": 6,
    "name": "Water Supply",
    "imgSrc": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMiI+PHBhdGggZD0iTTEyIDIuNjlsNS42NiA1LjY2YTggOCAwIDEgMS0xMS4zMSAweiIvPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTMiIHI9IjMiLz48L3N2Zz4="
},
{
    "id": 7,
    "name": "Parking",
    "imgSrc": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMiI+PHBhdGggZD0iTTE0IDE2SDltMTAgMGgzdjRhMSAxIDAgMCAxLTEgMUgzYTEgMSAwIDAgMS0xLTF2LTRoM20xMiAwVjZhMSAxIDAgMCAwLTEtMUg0YTEgMSAwIDAgMC0xIDF2MTAiLz48Y2lyY2xlIGN4PSI2LjUiIGN5PSIxNi41IiByPSIyLjUiLz48Y2lyY2xlIGN4PSIxNy41IiBjeT0iMTYuNSIgcj0iMi41Ii8+PC9zdmc+"
},
{
    "id": 8,
    "name": "Laundry",
    "imgSrc": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMiI+PHJlY3QgeD0iMyIgeT0iMyIgd2lkdGg9IjE4IiBoZWlnaHQ9IjE4IiByeD0iMiIvPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTMiIHI9IjUiLz48Y2lyY2xlIGN4PSI4IiBjeT0iNyIgcj0iMSIvPjxjaXJjbGUgY3g9IjExIiBjeT0iNyIgcj0iMSIvPjxwYXRoIGQ9Ik0xMiAxMHY2Ii8+PHBhdGggZD0iTTkgMTNoNiIvPjwvc3ZnPg=="
},
{
    "id": 9,
    "name": "Geyser",
    "imgSrc": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMiI+PHJlY3QgeD0iNiIgeT0iNCIgd2lkdGg9IjEyIiBoZWlnaHQ9IjE2IiByeD0iMiIvPjxjaXJjbGUgY3g9IjEyIiBjeT0iOSIgcj0iMiIvPjxwYXRoIGQ9Ik04IDE1aDgiLz48cGF0aCBkPSJNOCAxN2g4Ii8+PHBhdGggZD0iTTEwIDJ2MiIvPjxwYXRoIGQ9Ik0xNCAydjIiLz48cGF0aCBkPSJNMTIgNnY2Ii8+PC9zdmc+"
},
{
    "id": 10,
    "name": "CCTV",
    "imgSrc": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMiI+PHBhdGggZD0iTTE0LjgyOCAxNC44MjhhNCA0IDAgMCAxLTUuNjU2IDAiLz48cGF0aCBkPSJNOSA5YTMgMyAwIDEgMSA2IDAiLz48cGF0aCBkPSJNMTcuNSA2LjVMMTkgNSIvPjxwYXRoIGQ9Ik02IDZMNSA1Ii8+PHJlY3QgeD0iNCIgeT0iOCIgd2lkdGg9IjE2IiBoZWlnaHQ9IjEwIiByeD0iMiIvPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTMiIHI9IjMiLz48L3N2Zz4="
}
]
const fallbackPreferences = [
    {
        "id": 1,
        "name": "Non-smoker",
        "imgSrc": null
    },
    {
        "id": 2,
        "name": "Vegetarian",
        "imgSrc": null
    },
    {
        "id": 3,
        "name": "Working Professional",
        "imgSrc": null
    },
    {
        "id": 4,
        "name": "Student",
        "imgSrc": null
    },
    {
        "id": 5,
        "name": "Early Riser",
        "imgSrc": null
    },
    {
        "id": 6,
        "name": "Late Night Worker",
        "imgSrc": null
    },
    {
        "id": 7,
        "name": "Pet Friendly",
        "imgSrc": null
    },
    {
        "id": 8,
        "name": "Quiet Person",
        "imgSrc": null
    },
    {
        "id": 9,
        "name": "Friendly",
        "imgSrc": null
    },
    {
        "id": 10,
        "name": "Fitness Enthusiast",
        "imgSrc": null
    }
]

// Dynamic schema generation functions
export const createPropertySchema = (globalState?: any): FormFieldSchema[] => {
    const highlights = globalState?.highLights || fallbackPropertyHighlights;
    const resources = globalState?.resources || fallbackResources;
    const preferences = globalState?.preferences || fallbackPreferences;

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

export const getPropertyType = (typeId: number) => {
    const types: { [key: number]: string } = {
        1: 'Apartment',
        2: 'House',
        3: 'Studio',
        4: 'Shared Room',
        5: 'Private Room'
    };
    return types[typeId] || 'Property';
};

// Get gender preference icon and color
export const getGenderPreference = (gender: string) => {
    switch (gender) {
        case 'male':
            return { label: 'Male Only', color: '#3498db' };
        case 'female':
            return { label: 'Female Only', color: '#e84393' };
        case 'any':
            return { label: 'Any Gender', color: '#6c5ce7' };
        default:
            return { label: 'Any Gender', color: '#6c5ce7' };
    }
};
// Legacy exports for backward compatibility
export const initialValues = propertyInitialValues;
export const validationSchema = propertyValidationSchema;