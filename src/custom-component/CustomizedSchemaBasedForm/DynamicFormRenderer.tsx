import React from 'react';
import { InputLabel, TextField, TextFieldVariants } from '@mui/material';
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
    const renderField = (fieldSchema: FormFieldSchema) => {
        const { componentType, name, inputLabel, max, ...props  } = fieldSchema;

        const {state} = useGlobalContext();
        const getSchema = (key:string) =>{
            switch(key){
                case 'resources':
                    return state.resources;
                case 'preferences':
                     return state.preferences;
                default:
                        null;     
            }
        }

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
                        schema={getSchema(props.fieldKey??"")}
                        selectedResources={values[props.fieldKey || name]}
                    />
                );

            case 'textField':
                return (
                    <TextField
                        name={name}
                        type={props.type}
                        variant={props.variant as TextFieldVariants}
                        fullWidth={props.fullWidth}
                        value={values[name]}
                        onChange={handleChange}
                        error={touched[name] && Boolean(errors[name])}
                        helperText={touched[name] && errors[name]}
                        multiline={props.multiline}
                        rows={props.rows}
                        placeholder={props.placeholder}
                        inputProps={{
                            min: props.min,
                            // step: props.step,
                        }}
                        InputLabelProps={props.InputLabelProps}
                    />
                );

            case 'textArea':
                return (
                    <div>
                        <textarea
                            name={name}
                            value={values[name] || ""}
                            onChange={handleChange}
                            placeholder={props.placeholder || "Enter text..."}
                            rows={props.rows || 4}
                            className={`w-full border rounded-lg px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60 ${touched[name] && errors[name]
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-gray-300 focus:ring-blue-500'
                                }`}
                        />
                        {touched[name] && errors[name] && (
                            <div className="text-red-500 text-sm mt-1">{errors[name]}</div>
                        )}
                    </div>
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
                <div key={`${fieldSchema.name}-${index}`}>
                    <InputLabel shrink>{fieldSchema.inputLabel}</InputLabel>
                    {renderField(fieldSchema)}
                </div>
            ))}
        </>
    );
};

export default DynamicFormRenderer; 