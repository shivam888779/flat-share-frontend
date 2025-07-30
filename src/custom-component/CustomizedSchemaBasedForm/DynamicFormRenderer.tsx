import React from 'react';
import { TextField, Box, InputLabel } from '@mui/material';
import { FormFieldSchema } from './formSchema';
import {
    LocationSearch,
    CustomizedRoundedSelect,
    CustomizedSelectChip,
    SelectSingleOption,
} from "@/custom-component";
import { ImageUpload } from '@/component';
import { useGlobalContext } from '@/global-context';

interface DynamicFormRendererProps {
    schema: FormFieldSchema[];
    values: any;
    touched: any;
    errors: any;
    handleChange: (e: React.ChangeEvent<any>) => void;
    setFieldValue: (field: string, value: any) => void;
    setLocation: (location: any) => void;
    setSelectedFiles: (files: File[]) => void;
}

const DynamicFormRenderer: React.FC<DynamicFormRendererProps> = ({
    schema,
    values,
    touched,
    errors,
    handleChange,
    setFieldValue,
    setLocation,
    setSelectedFiles
}) => {
    const { state } = useGlobalContext();

    const renderField = (fieldSchema: FormFieldSchema) => {
        const { componentType, name, inputLabel, max, ...props } = fieldSchema;

        const getSchema = (key: string) => {
            switch (key) {
                case 'resources':
                    return state.resources;
                case 'preferences':
                    return state.preferences;
                default:
                    return null;
            }
        };

        switch (componentType) {
            case 'roundedSelect':
                return (
                    <CustomizedRoundedSelect
                        setFieldValue={setFieldValue}
                        selectedHighLights={values.highLights}
                    />
                );

            case 'locationSearch':
                return <LocationSearch setLocation={setLocation} />;

            case 'selectSingleOption':
                return (
                    <SelectSingleOption
                        setFieldValue={setFieldValue}
                        selectedValue={values[props.fieldKey || name]}
                        fieldKey={props.fieldKey || name}
                        schema={props.schema}
                    />
                );

            case 'selectChip':
                return (
                    <CustomizedSelectChip
                        setFieldValue={setFieldValue}
                        fieldKey={props.fieldKey || name}
                        schema={getSchema(props.fieldKey ?? "") || props.schema}
                        selectedResources={values[props.fieldKey || name]}
                    />
                );

            case 'textField':
                return (
                    <TextField
                        name={name}
                        type={props.type}
                        variant="outlined"
                        fullWidth={props.fullWidth}
                        value={values[name]}
                        onChange={handleChange}
                        error={touched[name] && Boolean(errors[name])}
                        helperText={touched[name] && errors[name]}
                        multiline={props.multiline}
                        rows={props.rows}
                        placeholder={props.placeholder}
                        size="small"
                        disabled={props.disabled}
                        // inputProps={{
                        //     min: props.min,
                        //     // max: props.max,
                        //     step: props.step,
                        // }}
                        InputLabelProps={props.InputLabelProps}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: '#f9fafb',
                                borderRadius: '8px',
                                '& fieldset': {
                                    borderColor: '#e5e7eb',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#9ca3af',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'primary.main',
                                    borderWidth: '1px',
                                },
                            },
                            '& .MuiInputBase-input': {
                                padding: '10px 14px',
                                fontSize: '0.875rem',
                            },
                            '& .MuiFormHelperText-root': {
                                marginLeft: 0,
                                fontSize: '0.75rem',
                            },
                        }}
                    />
                );

            case 'textArea':
                return (
                    <Box>
                        <TextField
                            name={name}
                            value={values[name] || ""}
                            onChange={handleChange}
                            placeholder={props.placeholder || "Describe your property in detail..."}
                            multiline
                            rows={props.rows || 4}
                            fullWidth
                            variant="outlined"
                            error={touched[name] && Boolean(errors[name])}
                            helperText={touched[name] && errors[name]}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: '#f9fafb',
                                    borderRadius: '8px',
                                    '& fieldset': {
                                        borderColor: '#e5e7eb',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#9ca3af',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'primary.main',
                                        borderWidth: '1px',
                                    },
                                },
                                '& .MuiInputBase-input': {
                                    padding: '10px 14px',
                                    fontSize: '0.875rem',
                                    lineHeight: 1.6,
                                },
                                '& .MuiFormHelperText-root': {
                                    marginLeft: 0,
                                    fontSize: '0.75rem',
                                },
                            }}
                        />
                    </Box>
                );

            case 'imageUpload':
                return <ImageUpload setSelectedFiles={setSelectedFiles} maxImages={max} />;

            default:
                return null;
        }
    };

    return (
        <>
            {schema.map((fieldSchema, index) => (
                <Box key={`${fieldSchema.name}-${index}`} sx={{ mb: 2 }}>
                    <InputLabel
                        shrink
                        sx={{
                            color: '#6b7280',
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            // mb: 0.5,
                            mt: 1,
                        }}
                    >
                        {fieldSchema.inputLabel}
                    </InputLabel>
                    {renderField(fieldSchema)}
                </Box>
            ))}
        </>
    );
};

export default DynamicFormRenderer;