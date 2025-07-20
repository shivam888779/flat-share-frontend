import { Box, Stack, Typography, Paper, Chip, Grid, IconButton, Tooltip, Card, Button } from "@mui/material";
import CustomizedCrousal from "../CustomizedCrousal";
import { IPropertyDetails } from "@/types/property";
import { CustomizedRoundedSelect, CustomizedSelectChip } from "@/custom-component";
import { useGlobalContext } from "@/global-context";
import { Share, LocationOn, ReportProblem, Home, CalendarToday, Payment, Group, Wc, Shield, Favorite, PhotoLibrary, Info, Star, Inventory, Person } from '@mui/icons-material';

import { useState } from "react";
import ListPropertyForm from "../ListPropertyForm";
import { getFormatedDate } from "@/utils/dataFormate";

interface IPropertyDetailsProps {
    propertyDetails: IPropertyDetails;
    isMyProperty?: boolean;
}

const PropertyDetails = (props: IPropertyDetailsProps) => {
    const { propertyDetails, isMyProperty } = props;
    const { state } = useGlobalContext();
    const [isReported, setIsReported] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const {
        location,
        description,
        security,
        availableFrom,
        rent,
        deposit,
        isZeroDeposit,
        partnerGender,
        highLights,
        resources,
        preferences,
        images,
        occupancy
    } = propertyDetails;

    const resourcesSchema = state.resources?.filter((data) => resources?.includes(data.id));
    const preferencesSchema = state.preferences?.filter((data) => preferences?.includes(data.id));

    // Calculate days since posted
    const daysSincePosted = Math.floor((new Date().getTime() - new Date(availableFrom).getTime()) / (1000 * 3600 * 24));

    const listingPreferenceSchema = [
        {
            icon: <Wc sx={{ color: 'primary.main', mb: 1 }} />,
            label: "Gender Preference",
            value: partnerGender
        },
        {
            icon: <Group sx={{ color: 'success.main', mb: 1 }} />,
            label: "Occupancy",
            value: occupancy
        },
        {
            icon: <Payment sx={{ color: 'warning.main', mb: 1 }} />,
            label: "Security Deposit",
            value: deposit
        },
        {
            icon: <CalendarToday sx={{ color: 'info.main', mb: 1 }} />,
            label: "Available From",
            value: getFormatedDate(new Date(availableFrom))
        }

    ]

    return (
        <Stack spacing={3}>
            {isEdit ? <ListPropertyForm type="property" isEdit={isEdit} /> :
                <>
                    {/* Main Property Card */}
                    <Paper
                        elevation={0}

                    >
                        {/* Header Section */}
                        <Box
                            p={3}

                            sx={{
                                background: 'linear-gradient(135deg, #667eea20 0%, #764ba220 100%)',
                                borderTopLeftRadius: 12,
                                borderTopRightRadius: 12,
                            }}
                            borderBottom='1px solid'
                            borderColor='divider'

                        >
                            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                                <Box>
                                    <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                                        <Chip
                                            label={"Property"}
                                            size="small"
                                            sx={{
                                                backgroundColor: 'primary.main',
                                                color: 'white',
                                                fontWeight: 600,
                                            }}
                                        />
                                        <Chip
                                            label={`Posted ${daysSincePosted} days ago`}
                                            size="small"
                                            variant="outlined"
                                        />
                                        {isZeroDeposit && (
                                            <Chip
                                                label="Zero Deposit"
                                                size="small"
                                                color="success"
                                            />
                                        )}
                                    </Stack>
                                    <Typography variant="h4" fontWeight={700} gutterBottom>
                                        ₹{rent?.toLocaleString()}/month
                                    </Typography>
                                    <Stack direction="row" alignItems="center" spacing={0.5}>
                                        <LocationOn sx={{ color: 'text.secondary', fontSize: 20 }} />
                                        <Typography variant="body1" color="text.secondary">
                                            {location?.address}
                                        </Typography>
                                    </Stack>
                                </Box>
                                {!isMyProperty ? <Stack direction="row" spacing={1}>
                                    <Tooltip title="Share property">
                                        <IconButton>
                                            <Share />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title={isReported ? "Reported" : "Report listing"}>
                                        <IconButton
                                            onClick={() => setIsReported(!isReported)}
                                            sx={{ color: isReported ? 'error.main' : 'inherit' }}
                                        >
                                            <ReportProblem />
                                        </IconButton>
                                    </Tooltip>
                                </Stack> :
                                    <Button variant="outlined" color="primary" onClick={() => setIsEdit(true)}>Edit</Button>
                                }
                            </Stack>
                        </Box>

                        {/* Quick Info Grid */}
                        <Box sx={{ p: 3 }}>
                            <Stack direction="row" justifyContent="space-between" flexWrap="wrap" gap={1} width="100%">
                                {listingPreferenceSchema.map((item, index) => (
                                    <Card
                                        key={index}
                                        sx={{
                                            maxWidth: '250px',
                                            minWidth: { xs: '150px', md: '250px' },
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            p: 2,
                                            textAlign: 'center',
                                            backgroundColor: '#f9fafb',
                                            boxShadow: 'none',
                                            border: '1px solid',
                                            borderColor: 'divider',
                                        }}
                                    >
                                        {item.icon}
                                        <Typography variant="caption" color="text.secondary" display="block">
                                            {item.label}
                                        </Typography>
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            {item.value}
                                        </Typography>
                                    </Card>
                                ))}

                            </Stack>

                        </Box>
                    </Paper>

                    {/* Property Gallery */}
                    {images && images.length > 0 && (
                        <Paper
                            elevation={0}
                            sx={{
                                borderRadius: '16px',
                                backgroundColor: 'white',
                                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                                overflow: 'hidden',
                                p: 3,
                            }}
                        >
                            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                                <PhotoLibrary sx={{ color: 'primary.main' }} />
                                <Typography variant="h6" fontWeight={600}>
                                    Property Gallery
                                </Typography>
                                <Chip label={`${images.length} photos`} size="small" />
                            </Stack>
                            <CustomizedCrousal images={images as string[]} />
                        </Paper>
                    )}

                    {/* Highlights Section */}
                    {highLights && highLights.length > 0 && (
                        <Paper
                            elevation={0}
                            sx={{
                                borderRadius: '16px',
                                backgroundColor: 'white',
                                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                                p: 3,
                            }}
                        >
                            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                                <Star sx={{ color: 'warning.main' }} />
                                <Typography variant="h6" fontWeight={600}>
                                    Property Highlights
                                </Typography>
                            </Stack>
                            <CustomizedRoundedSelect
                                selectedHighLights={highLights}
                                setFieldValue={undefined}
                            />
                        </Paper>
                    )}

                    {/* Resources and Preferences Row */}
                    <Stack direction={{ xs: "column", md: "row" }} spacing={3} justifyContent="space-between" alignItems="center">
                        {/* Resources */}
                        {resourcesSchema && resourcesSchema.length > 0 && (
                            <Paper

                                elevation={0}
                                sx={{
                                    p: 3,
                                    width: "100%",
                                }}
                            >
                                <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                                    <Inventory sx={{ color: 'secondary.main' }} />
                                    <Typography variant="h6" fontWeight={600}>
                                        Available Resources
                                    </Typography>
                                </Stack>
                                <CustomizedSelectChip
                                    setFieldValue={undefined}
                                    fieldKey={undefined}
                                    schema={resourcesSchema}
                                    selectedResources={resources}
                                />
                            </Paper>
                        )}

                        {/* Preferences */}
                        {preferencesSchema && preferencesSchema.length > 0 && (

                            <Paper
                                elevation={0}
                                sx={{
                                    p: 3,
                                    width: "100%",
                                }}
                            >
                                <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                                    <Person sx={{ color: 'info.main' }} />
                                    <Typography variant="h6" fontWeight={600}>
                                        Roommate Preferences
                                    </Typography>
                                </Stack>
                                <CustomizedSelectChip
                                    setFieldValue={undefined}
                                    fieldKey={undefined}
                                    schema={preferencesSchema}
                                    selectedResources={preferences}
                                />
                            </Paper>
                        )}
                    </Stack>

                    {/* About Section */}
                    {description && (
                        <Paper
                            elevation={0}
                            sx={{
                                borderRadius: '16px',
                                backgroundColor: 'white',
                                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                                p: 3,
                            }}
                        >
                            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                                <Info sx={{ color: 'primary.main' }} />
                                <Typography variant="h6" fontWeight={600}>
                                    About This Property
                                </Typography>
                            </Stack>
                            <Typography
                                variant="body1"
                                color="text.secondary"
                                sx={{
                                    lineHeight: 1.8,
                                    whiteSpace: 'pre-wrap',
                                }}
                            >
                                {description}
                            </Typography>
                        </Paper>
                    )}

                    {/* Security Features */}
                    {security && (
                        <Paper
                            elevation={0}
                            sx={{
                                borderRadius: '16px',
                                backgroundColor: 'success.lighter',
                                border: '1px solid',
                                borderColor: 'success.light',
                                p: 3,
                            }}
                        >
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Shield sx={{ color: 'success.main' }} />
                                <Typography variant="subtitle1" fontWeight={600} color="success.dark">
                                    Security Features
                                </Typography>
                            </Stack>
                            <Typography variant="body2" color="success.dark" sx={{ mt: 1 }}>
                                This property includes enhanced security measures for your safety and peace of mind.
                            </Typography>
                        </Paper>
                    )}
                </>
            }
        </Stack>
    );
};

export default PropertyDetails;