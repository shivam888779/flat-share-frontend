import { Box, Stack, Typography } from "@mui/material";

interface Props {
        setFieldValue: any;
        selectedResources: Number[];
        fieldKey: string | undefined;
        schema: any;
}

const CustomizedSelectChip = (props: Props) => {
        const { setFieldValue, selectedResources, fieldKey, schema } = props;

        const handleSelectedHighLights = (id: number) => {
                if (selectedResources?.includes(id)) {
                        setFieldValue(fieldKey, selectedResources?.filter((item: Number) => item !== id));
                } else {
                        setFieldValue(fieldKey, [...selectedResources, id]);
                }
        };

        return (
                <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mt: 1 }}>
                        {schema?.map((item: any, index: number) => {
                                const isSelected = selectedResources.includes(item?.id);
                                return (
                                        <Box
                                                key={index}
                                                onClick={() => handleSelectedHighLights(item?.id)}
                                                sx={{
                                                        px: 1.75,
                                                        py: 0.5,
                                                        borderRadius: '20px',
                                                        backgroundColor: isSelected ? 'primary.main' : '#f3f4f6',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.2s ease',
                                                        border: '1px solid',
                                                        borderColor: isSelected ? 'primary.main' : '#e5e7eb',
                                                        '&:hover': {
                                                                backgroundColor: isSelected ? 'primary.dark' : '#e5e7eb',
                                                        },
                                                }}
                                        >
                                                <Typography
                                                        variant="body2"
                                                        sx={{
                                                                fontSize: '0.813rem',
                                                                color: isSelected ? 'white' : '#6b7280',
                                                                fontWeight: 500,
                                                        }}
                                                >
                                                        {item?.name}
                                                </Typography>
                                        </Box>
                                );
                        })}
                </Stack>
        );
};

export default CustomizedSelectChip;