# Schema-Based Form Architecture

This directory contains a comprehensive schema-based form architecture that allows you to define form fields declaratively and render them dynamically.

## Architecture Overview

The schema-based architecture consists of several key components:

1. **Form Schema** (`formSchema.ts`) - Defines the structure and configuration of form fields
2. **Dynamic Form Renderer** (`DynamicFormRenderer.tsx`) - Renders form fields based on schema
3. **Form Configuration** (`formConfig.ts`) - Provides configuration options for form behavior and appearance
4. **Validation Utils** (`validationUtils.ts`) - Generates validation schemas dynamically
5. **Schema-Based Form** (`SchemaBasedForm.tsx`) - Complete form component with all features
6. **Legacy Form** (`index.tsx`) - Original form component (now using schema-based approach)
7. **Test Form** (`TestForm.tsx`) - Test component to verify all features work correctly

## Key Features

- **Declarative Field Definition**: Define form fields using JSON-like schemas
- **Dynamic Rendering**: Automatically render different component types based on schema
- **Flexible Configuration**: Customize form behavior, appearance, and validation
- **Field Visibility Control**: Show/hide fields based on conditions
- **Custom Validation**: Generate validation rules dynamically
- **Theme Support**: Customize colors, spacing, and layout
- **Error Handling**: Comprehensive error handling and user feedback

## Usage Examples

### Basic Usage

```tsx
import SchemaBasedForm from './SchemaBasedForm';

function MyComponent() {
  return (
    <SchemaBasedForm 
      type="property"
      onSubmit={async (values, location, imageUrls) => {
        // Handle form submission
        console.log(values, location, imageUrls);
      }}
    />
  );
}
```

### Custom Configuration

```tsx
import SchemaBasedForm from './SchemaBasedForm';

function MyComponent() {
  const customConfig = {
    title: "Custom Property Form",
    submitButtonText: "Save Property",
    requireImages: false,
    minImages: 0,
    maxImages: 5,
  };

  const customVisibility = {
    highLights: { visible: true, required: true },
    location: { visible: true, required: true },
    typeId: { visible: true, required: true },
    rent: { visible: true, required: true },
    deposit: { visible: false, required: false }, // Hide deposit field
    availableFrom: { visible: true, required: true },
    partnerGender: { visible: true, required: true },
    resources: { visible: true, required: false },
    preferences: { visible: false, required: false }, // Hide preferences
    description: { visible: true, required: true },
    images: { visible: true, required: false },
  };

  return (
    <SchemaBasedForm 
      formConfig={customConfig}
      fieldVisibility={customVisibility}
      onSubmit={async (values, location, imageUrls) => {
        // Handle form submission
      }}
    />
  );
}
```

### Custom Schema

```tsx
import { FormFieldSchema } from './formSchema';

const customSchema: FormFieldSchema[] = [
  {
    componentType: "textField",
    name: "customField",
    type: "text",
    variant: "outlined",
    fullWidth: true,
    inputLabel: "Custom Field",
    propsKey: ["handleChange"],
    required: true,
    placeholder: "Enter custom value..."
  },
  {
    componentType: "textArea",
    name: "description",
    type: "text",
    fullWidth: true,
    inputLabel: "Description",
    propsKey: ["handleChange"],
    rows: 4,
    required: true,
    placeholder: "Enter description..."
  },
  // ... more fields
];

function MyComponent() {
  return (
    <SchemaBasedForm 
      customSchema={customSchema}
      onSubmit={async (values, location, imageUrls) => {
        // Handle form submission
      }}
    />
  );
}
```

## Schema Definition

### FormFieldSchema Interface

```typescript
interface FormFieldSchema {
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
```

### Component Types

1. **roundedSelect**: Custom rounded select component for highlights
2. **locationSearch**: Location autocomplete component
3. **selectSingleOption**: Single option selector (tabs)
4. **textField**: Standard text input field (Material-UI TextField)
5. **textArea**: Custom textarea component with Tailwind CSS styling
6. **selectChip**: Multi-select chip component
7. **imageUpload**: Image upload component

### Field Types

- **text**: Text input
- **number**: Numeric input
- **date**: Date picker
- **email**: Email input
- **select**: Single selection
- **tabSelect**: Tab-based selection
- **multiSelect**: Multiple selection
- **autoComplete**: Autocomplete input
- **file**: File upload

## Component-Specific Features

### TextArea Component

The `textArea` component provides a custom textarea with:

- **Tailwind CSS Styling**: Modern, responsive design
- **Error Handling**: Visual error states with red borders
- **Validation Support**: Displays validation errors below the field
- **Customizable**: Configurable rows, placeholder, and styling

```typescript
{
  componentType: "textArea",
  name: "description",
  type: "text",
  fullWidth: true,
  inputLabel: "Description",
  propsKey: ["handleChange"],
  rows: 4,
  required: true,
  placeholder: "Describe your property in detail..."
}
```

### TextField Component

The `textField` component uses Material-UI with:

- **Type Support**: text, number, date, email
- **Validation**: Built-in error handling
- **Props**: min, max, step for numeric fields
- **Styling**: Material-UI theming

```typescript
{
  componentType: "textField",
  name: "rent",
  type: "number",
  variant: "outlined",
  fullWidth: true,
  inputLabel: "Rent Price",
  propsKey: ["handleChange"],
  required: true,
  placeholder: "Enter rent amount",
  min: 1,
  max: 1000000,
  step: 100
}
```

## Configuration Options

### Form Configuration

```typescript
interface FormConfig {
  title: string;
  submitButtonText: string;
  submittingButtonText: string;
  successMessage: string;
  requireImages: boolean;
  minImages: number;
  maxImages: number;
  allowedImageTypes: string[];
  maxImageSize: number;
}
```

### Field Visibility Configuration

```typescript
interface FieldVisibilityConfig {
  [fieldName: string]: {
    visible: boolean;
    required: boolean;
    dependsOn?: {
      field: string;
      value: any;
    };
  };
}
```

### Layout Configuration

```typescript
interface FormLayoutConfig {
  columns: number;
  spacing: number;
  maxWidth: string;
  padding: string;
  backgroundColor: string;
  borderRadius: string;
  boxShadow: string;
}
```

### Theme Configuration

```typescript
interface FormThemeConfig {
  primaryColor: string;
  errorColor: string;
  successColor: string;
  textColor: string;
  borderColor: string;
  backgroundColor: string;
}
```

## Validation

The architecture supports both static and dynamic validation:

### Static Validation

```typescript
import { customValidationSchema } from './validationUtils';

// Use the predefined validation schema
<Formik validationSchema={customValidationSchema}>
```

### Dynamic Validation

```typescript
import { generateValidationSchema } from './validationUtils';

// Generate validation based on schema
const dynamicSchema = generateValidationSchema(propertyFormSchema);
<Formik validationSchema={dynamicSchema}>
```

### Validation Features

- **Number Validation**: min/max values, step increments
- **Text Validation**: minimum length, required fields
- **Date Validation**: required date fields
- **Array Validation**: multi-select field validation
- **Custom Messages**: Field-specific error messages

## Data Schemas

The architecture includes predefined data schemas for common use cases:

- **propertyTypes**: Room, Flat, Villa
- **partnerGenderSchema**: Male, Female, Any
- **resources**: Gym, Park, Swimming Pool, etc.
- **propertyHighlights**: Furnished, Pet Friendly, Balcony, etc.

## Testing

Use the `TestForm` component to verify all features:

```tsx
import TestForm from './TestForm';

function App() {
  return <TestForm />;
}
```

The test form includes:
- All component types
- Error handling
- Form submission simulation
- Console logging for debugging

## Migration from Legacy Form

To migrate from the legacy form to the schema-based approach:

1. Replace the form JSX with `<DynamicFormRenderer>`
2. Import the schema: `import { propertyFormSchema } from './formSchema'`
3. Pass the schema and form handlers to the renderer

### Before (Legacy)

```tsx
<div>
  <InputLabel shrink>Property Title</InputLabel>
  <CustomizedRoundedSelect
    setFieldValue={setFieldValue}
    selectedHighLights={values.highLights}
  />
</div>
```

### After (Schema-Based)

```tsx
<DynamicFormRenderer
  schema={propertyFormSchema}
  values={values}
  touched={touched}
  errors={errors}
  handleChange={handleChange}
  setFieldValue={setFieldValue}
  setLocation={setLocation}
  setSelectedFiles={setSelectedFiles}
/>
```

## Benefits

1. **Maintainability**: Centralized field definitions
2. **Reusability**: Schema can be reused across different forms
3. **Flexibility**: Easy to add, remove, or modify fields
4. **Consistency**: Standardized field rendering and validation
5. **Type Safety**: Full TypeScript support
6. **Configuration**: Extensive customization options
7. **Testing**: Easier to test individual components
8. **Error Handling**: Comprehensive error states and validation

## Best Practices

1. **Schema Organization**: Keep schemas in separate files for different form types
2. **Validation**: Use dynamic validation for complex forms
3. **Configuration**: Create reusable configuration presets
4. **Error Handling**: Implement proper error boundaries
5. **Performance**: Use React.memo for expensive components
6. **Accessibility**: Ensure all fields have proper labels and ARIA attributes
7. **Testing**: Use the TestForm component to verify functionality
8. **Styling**: Use consistent styling patterns across components 