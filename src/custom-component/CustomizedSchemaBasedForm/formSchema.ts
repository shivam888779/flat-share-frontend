// Form field schema definitions
export interface FormFieldSchema {
    componentType: 'roundedSelect' | 'locationSearch' | 'selectSingleOption' | 'textField' | 'selectChip' | 'imageUpload' | 'textArea';
    name: string;
    type: string;
    variant?: string;
    fullWidth?: boolean;
    fieldKey?: string;
    schema?: any[];
    inputLabel: string;
    propsKey: string[];
    multiline?: boolean;
    rows?: number;
    required?: boolean;
    validation?: any;
    placeholder?: string;
    min?: number;
    max?: number;
    step?: number;
    InputLabelProps?: any;
}

// Data schemas