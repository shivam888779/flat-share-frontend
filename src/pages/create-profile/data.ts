import { FormFieldSchema } from "@/custom-component/CustomizedSchemaBasedForm/formSchema";
import { ICreateProfilePayLoad } from "@/types/user";

export const genderOptions = [
    { name: "Male", key: "Male" },
    { name: "Female", key: "Female" },
    { name: "Other", key: "Other" }
];

// Create Profile Form Schema
export const createProfileFormSchema: FormFieldSchema[] = [
    {
        componentType: "textField",
        name: "firstName",
        type: "text",
        variant: "outlined",
        fullWidth: true,
        fieldKey: undefined,
        schema: undefined,
        inputLabel: "First Name",
        propsKey: ["handleChange"],
        required: true,
        placeholder: "Enter your first name"
    },
    {
        componentType: "textField",
        name: "lastName",
        type: "text",
        variant: "outlined",
        fullWidth: true,
        fieldKey: undefined,
        schema: undefined,
        inputLabel: "Last Name",
        propsKey: ["handleChange"],
        required: true,
        placeholder: "Enter your last name"
    },
    {
        componentType: "selectSingleOption",
        name: "gender",
        type: "tabSelect",
        variant: undefined,
        fullWidth: false,
        fieldKey: "gender",
        schema: genderOptions,
        inputLabel: "Gender",
        propsKey: ["setFieldValue"],
        required: true
    },
    {
        componentType: "imageUpload",
        name: "profileImage",
        type: "file",
        variant: undefined,
        fullWidth: false,
        fieldKey: undefined,
        schema: undefined,
        inputLabel: "Profile Image",
        propsKey: ["setSelectedFiles"],
        required: true
    }
];

// Initial values for the form
export const createProfileInitialValues: ICreateProfilePayLoad = {
    firstName: "",
    lastName: "",
    gender: "Male",
    profileImage: "",
};

// Validation schema
export const createProfileValidationSchema = {
    firstName: "First name is required",
    lastName: "Last name is required",
    gender: "Gender is required",
    profileImage: "Profile image is required"
}; 