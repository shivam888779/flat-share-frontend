import { Box, Stack } from "@mui/material";
import { useState } from "react";

const SelectSingleOption = (props: any) => {
    const { schema, fieldKey, selectedValue, setFieldValue } = props;

    const handleChange = (newValue: string) => {
        setFieldValue(fieldKey, newValue);
    };

    return (
        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
            {schema?.map((value: any, index: number) => {
                const isSelected = selectedValue === value?.key;
                return (
                    <Box
                        key={index}
                        onClick={() => handleChange(value?.key)}
                        sx={{
                            px: 2,
                            py: 1,
                            borderRadius: '8px',
                            backgroundColor: isSelected ? 'primary.main' : '#f3f4f6',
                            color: isSelected ? 'white' : '#6b7280',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            border: '1px solid',
                            borderColor: isSelected ? 'primary.main' : '#e5e7eb',
                            '&:hover': {
                                backgroundColor: isSelected ? 'primary.dark' : '#e5e7eb',
                                color: isSelected ? 'white' : '#374151',
                            },
                        }}
                    >
                        {value?.name}
                    </Box>
                );
            })}
        </Stack>
    );
};

export default SelectSingleOption;