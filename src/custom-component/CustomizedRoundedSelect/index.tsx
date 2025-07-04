import { useGlobalContext } from "@/global-context";
import { Box, Paper, Stack, Typography, useTheme, alpha } from "@mui/material";
import Image from "next/image";
import { motion } from "framer-motion";

interface Props {
        setFieldValue: any;
        selectedHighLights: Number[];
}

const CustomizedRoundedSelect = (props: Props) => {
        const { state } = useGlobalContext();
        const theme = useTheme();
        const { setFieldValue, selectedHighLights } = props;
        const highLights = setFieldValue
                ? state.highLights
                : state.highLights.filter((data) => selectedHighLights.includes(data.id));

        const handleSelectedHighLights = (id: number) => {
                if (!setFieldValue) {
                        return;
                }
                if (selectedHighLights?.includes(id)) {
                        setFieldValue("highLights", selectedHighLights?.filter((item: Number) => item !== id));
                } else {
                        setFieldValue("highLights", [...selectedHighLights, id]);
                }
        };

        return (
                <Stack my={2} direction={"row"} flexWrap={"wrap"} gap={2}>
                        {highLights?.map((item, index) => {
                                const isSelected = selectedHighLights.includes(item?.id);

                                return (
                                        <motion.div
                                                key={index}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                        >
                                                <Box
                                                        onClick={() => handleSelectedHighLights(item?.id)}
                                                        sx={{
                                                                cursor: 'pointer',
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                alignItems: 'center',
                                                                gap: 1
                                                        }}
                                                >
                                                        <Paper
                                                                elevation={isSelected ? 8 : 2}
                                                                sx={{
                                                                        p: 2,
                                                                        borderRadius: 3,
                                                                        width: 80,
                                                                        height: 80,
                                                                        display: 'flex',
                                                                        justifyContent: 'center',
                                                                        alignItems: 'center',
                                                                        bgcolor: isSelected
                                                                                ? alpha(theme.palette.primary.main, 0.1)
                                                                                : theme.palette.background.paper,
                                                                        border: isSelected
                                                                                ? `2px solid ${theme.palette.primary.main}`
                                                                                : `1px solid ${theme.palette.divider}`,
                                                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                                        '&:hover': {
                                                                                bgcolor: isSelected
                                                                                        ? alpha(theme.palette.primary.main, 0.15)
                                                                                        : alpha(theme.palette.primary.main, 0.05),
                                                                                borderColor: theme.palette.primary.main,
                                                                                transform: 'translateY(-2px)',
                                                                        }
                                                                }}
                                                        >
                                                                <Image
                                                                        alt={item?.name}
                                                                        src={item?.imgSrc}
                                                                        height={40}
                                                                        width={40}
                                                                        style={{ borderRadius: '50%' }}
                                                                />
                                                        </Paper>
                                                        <Typography
                                                                variant="caption"
                                                                textAlign="center"
                                                                sx={{
                                                                        fontWeight: isSelected ? 600 : 400,
                                                                        color: isSelected
                                                                                ? theme.palette.primary.main
                                                                                : theme.palette.text.secondary,
                                                                        transition: 'color 0.3s ease'
                                                                }}
                                                        >
                                                                {item?.name}
                                                        </Typography>
                                                </Box>
                                        </motion.div>
                                );
                        })}
                </Stack>
        );
};

export default CustomizedRoundedSelect;