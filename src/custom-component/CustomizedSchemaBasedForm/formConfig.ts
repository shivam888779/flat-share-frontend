import { FormFieldSchema } from './formSchema';

// Form configuration interface
export interface FormConfig {
    title: string;
    submitButtonText: string;
    submittingButtonText: string;
    successMessage: string;
    requireImages: boolean;
    minImages: number;
    maxImages: number;
    allowedImageTypes: string[];
    maxImageSize: number; // in MB
}

// Default form configuration
export const defaultFormConfig: FormConfig = {
    title: "List Your Property",
    submitButtonText: "List Property",
    submittingButtonText: "Submitting...",
    successMessage: "Property listed successfully!",
    requireImages: true,
    minImages: 1,
    maxImages: 10,
    allowedImageTypes: ["image/jpeg", "image/png", "image/webp"],
    maxImageSize: 5, // 5MB
};

// Form field visibility configuration
export interface FieldVisibilityConfig {
    [fieldName: string]: {
        visible: boolean;
        required: boolean;
        dependsOn?: {
            field: string;
            value: any;
        };
    };
}

// Default field visibility configuration
export const defaultFieldVisibility: FieldVisibilityConfig = {
    highLights: { visible: true, required: true },
    location: { visible: true, required: true },
    typeId: { visible: true, required: true },
    rentPrice: { visible: true, required: true },
    deposit: { visible: true, required: true },
    availableFrom: { visible: true, required: true },
    partnerGender: { visible: true, required: true },
    resources: { visible: true, required: false },
    preferences: { visible: true, required: false },
    description: { visible: true, required: true },
    images: { visible: true, required: true },
};

// Utility function to filter schema based on visibility
export const filterSchemaByVisibility = (
    schema: FormFieldSchema[],
    visibilityConfig: FieldVisibilityConfig
): FormFieldSchema[] => {
    return schema.filter(field => {
        const config = visibilityConfig[field.name];
        return config?.visible !== false;
    });
};

// Utility function to update field requirements based on visibility config
export const updateSchemaRequirements = (
    schema: FormFieldSchema[],
    visibilityConfig: FieldVisibilityConfig
): FormFieldSchema[] => {
    return schema.map(field => {
        const config = visibilityConfig[field.name];
        if (config) {
            return {
                ...field,
                required: config.required
            };
        }
        return field;
    });
};

// Form layout configuration
export interface FormLayoutConfig {
    columns: number;
    spacing: number;
    maxWidth: string;
    padding: string;
    backgroundColor: string;
    borderRadius: string;
    boxShadow: string;
}

export const defaultLayoutConfig: FormLayoutConfig = {
    columns: 1,
    spacing: 3,
    maxWidth: "md",
    padding: "p-8",
    backgroundColor: "bg-white",
    borderRadius: "rounded-lg",
    boxShadow: "shadow-xl",
};

// Theme configuration for form styling
export interface FormThemeConfig {
    primaryColor: string;
    errorColor: string;
    successColor: string;
    textColor: string;
    borderColor: string;
    backgroundColor: string;
}

export const defaultThemeConfig: FormThemeConfig = {
    primaryColor: "#1976d2",
    errorColor: "#d32f2f",
    successColor: "#2e7d32",
    textColor: "#374151",
    borderColor: "#d1d5db",
    backgroundColor: "#ffffff",
}; 