import * as Yup from "yup";
import { FormFieldSchema } from "./formSchema";

export const generateValidationSchema = (schema: FormFieldSchema[]): Yup.ObjectSchema<any> => {
    const validationFields: { [key: string]: any } = {};

    schema.forEach((field) => {
        if (!field.required) return;

        let fieldValidation: any;

        switch (field.type) {
            case "number":
                fieldValidation = Yup.number()
                    .typeError(`${field.inputLabel} must be a number`)
                    .required(`${field.inputLabel} is required`);

                if (field.min !== undefined) {
                    fieldValidation = fieldValidation.min(field.min, `${field.inputLabel} must be at least ${field.min}`);
                }
                if (field.max !== undefined) {
                    fieldValidation = fieldValidation.max(field.max, `${field.inputLabel} must be at most ${field.max}`);
                }
                break;

            case "text":
                fieldValidation = Yup.string()
                    .required(`${field.inputLabel} is required`);

                if (field.name === "description") {
                    fieldValidation = fieldValidation.min(10, `${field.inputLabel} should be at least 10 characters`);
                }
                break;

            case "date":
                fieldValidation = Yup.string()
                    .required(`${field.inputLabel} is required`);
                break;

            case "select":
            case "tabSelect":
                if (field.name === "typeId") {
                    fieldValidation = Yup.number()
                        .required(`${field.inputLabel} is required`);
                } else if (field.name === "partnerGender") {
                    fieldValidation = Yup.string()
                        .required(`${field.inputLabel} is required`);
                }
                break;

            case "multiSelect":
                // For multi-select fields, we might want to validate if at least one option is selected
                if (field.required) {
                    fieldValidation = Yup.array()
                        .min(1, `Please select at least one ${field.inputLabel.toLowerCase()}`)
                        .required(`${field.inputLabel} is required`);
                }
                break;

            default:
                fieldValidation = Yup.string()
                    .required(`${field.inputLabel} is required`);
        }

        if (fieldValidation) {
            validationFields[field.name] = fieldValidation;
        }
    });

    return Yup.object(validationFields);
};

// Custom validation for specific fields
export const customValidationSchema = Yup.object({
    partnerGender: Yup.string().required("Gender is required"),
    rent: Yup.number()
        .typeError("Rent price must be a number")
        .min(1, "Must be greater than 0")
        .max(1000000, "Rent price cannot exceed 1,000,000")
        .required("Rent price is required"),
    deposit: Yup.number()
        .typeError("Deposit must be a number")
        .min(0, "Cannot be negative")
        .max(1000000, "Deposit cannot exceed 1,000,000")
        .required("Deposit is required"),
    availableFrom: Yup.string().required("Available date is required"),
    description: Yup.string()
        .min(10, "Description should be at least 10 characters")
        .required("Description is required"),
    // Add validation for arrays if needed
    resources: Yup.array().of(Yup.number()),
    preferences: Yup.array().of(Yup.number()),
    highLights: Yup.array().of(Yup.number()),
}); 