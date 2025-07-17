import { FormFieldSchema } from "@/custom-component/CustomizedSchemaBasedForm/formSchema";
import { ICreateProfilePayLoad } from "@/types/user";

// Create Profile Form Schema

export const genderOptions = [
    { key: "Male", name: "Male" },
    { key: "Female", name: "Female" },
    { key: "Other", name: "Other" }
];
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
        required: true,
        max: 1
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


export const editProfileFormSchema: FormFieldSchema[] = [
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
        placeholder: "Enter your first name",
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
        placeholder: "Enter your last name",
    },

    {
        componentType: "textField",
        name: "phoneNo",
        type: "tel",
        variant: "outlined",
        fullWidth: true,
        fieldKey: undefined,
        schema: undefined,
        inputLabel: "Phone Number",
        propsKey: ["handleChange"],
        required: true,
        placeholder: "Enter your phone number",
        disabled: true,
        // disabled: true, // Phone number is usually not editable
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
        required: false,
        placeholder: "Write something about yourself..."
    },
];

// Subscription plan types
export const subscriptionPlans = {
    free: {
        name: "Free Plan",
        icon: "star",
        color: "#6b7280",
        features: [
            "Basic profile access",
            "View up to 5 listings per day",
            "Send up to 3 messages per day"
        ],
        price: "₹0",
        period: "Forever"
    },
    premium: {
        name: "Premium Plan",
        icon: "diamond",
        color: "#667eea",
        features: [
            "Unlimited profile access",
            "View unlimited listings",
            "Send unlimited messages",
            "Priority support",
            "Advanced filters"
        ],
        price: "₹299",
        period: "per month"
    },
    pro: {
        name: "Pro Plan",
        icon: "workspace_premium",
        color: "#764ba2",
        features: [
            "Everything in Premium",
            "Verified badge",
            "Background verification",
            "Featured listings",
            "Analytics dashboard",
            "API access"
        ],
        price: "₹599",
        period: "per month"
    }
};