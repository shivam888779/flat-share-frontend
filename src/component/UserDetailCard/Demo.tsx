import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import PropertyDetailsCard, { generateDummyCards } from './index';

const UserDetailCardDemo: React.FC = () => {
    return (
        <Box p={3}>
            <Typography variant="h4" gutterBottom>
                Property Details Card Demo
            </Typography>

            <Typography variant="h6" gutterBottom mt={3}>
                Single Card with Dummy Data:
            </Typography>
            <Box mb={3}>
                <PropertyDetailsCard />
            </Box>

            <Typography variant="h6" gutterBottom mt={3}>
                Multiple Cards with Different Dummy Data:
            </Typography>
            <Stack direction="row" gap={2} flexWrap="wrap">
                {generateDummyCards(5)}
            </Stack>

            <Typography variant="h6" gutterBottom mt={3}>
                Custom Dummy Index:
            </Typography>
            <Stack direction="row" gap={2} flexWrap="wrap">
                <PropertyDetailsCard dummyIndex={1} />
                <PropertyDetailsCard dummyIndex={2} />
                <PropertyDetailsCard dummyIndex={3} />
            </Stack>
        </Box>
    );
};

export default UserDetailCardDemo; 