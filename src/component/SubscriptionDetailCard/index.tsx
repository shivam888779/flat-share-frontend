// components/SubscriptionDetailCard.tsx
import React from 'react';
import {
    Box,
    Paper,
    Typography,
    Stack,
    Button,
    Chip,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Card,
    CardContent,
    LinearProgress,
    Divider,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import DiamondIcon from '@mui/icons-material/Diamond';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { subscriptionPlans } from '@/api/profiles/profile-data';

interface SubscriptionDetailCardProps {
    currentPlan?: 'free' | 'premium' | 'pro';
    expiryDate?: string;
    usage?: {
        profileViews: { used: number; limit: number };
        messagesScent: { used: number; limit: number };
        listingsViewed: { used: number; limit: number };
    };
}

const SubscriptionDetailCard: React.FC<SubscriptionDetailCardProps> = ({
    currentPlan = 'free',
    expiryDate,
    usage = {
        profileViews: { used: 3, limit: 5 },
        messagesScent: { used: 2, limit: 3 },
        listingsViewed: { used: 4, limit: 5 },
    },
}) => {
    const getPlanIcon = (plan: string) => {
        switch (plan) {
            case 'free':
                return <StarIcon sx={{ fontSize: 28, color: '#6b7280' }} />;
            case 'premium':
                return <DiamondIcon sx={{ fontSize: 28, color: '#667eea' }} />;
            case 'pro':
                return <WorkspacePremiumIcon sx={{ fontSize: 28, color: '#764ba2' }} />;
            default:
                return <StarIcon sx={{ fontSize: 28 }} />;
        }
    };

    const currentPlanDetails = subscriptionPlans[currentPlan];

    const UsageItem = ({ label, used, limit }: { label: string; used: number; limit: number }) => {
        const percentage = (used / limit) * 100;
        const isNearLimit = percentage > 80;

        return (
            <Box>
                <Stack direction="row" justifyContent="space-between" mb={1}>
                    <Typography variant="body2" color="text.secondary">
                        {label}
                    </Typography>
                    <Typography
                        variant="body2"
                        fontWeight={600}
                        color={isNearLimit ? 'error.main' : 'text.primary'}
                    >
                        {used}/{limit}
                    </Typography>
                </Stack>
                <LinearProgress
                    variant="determinate"
                    value={percentage}
                    sx={{
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: '#e5e7eb',
                        '& .MuiLinearProgress-bar': {
                            backgroundColor: isNearLimit ? '#ef4444' : '#667eea',
                            borderRadius: 3,
                        },
                    }}
                />
            </Box>
        );
    };

    return (
        <Stack spacing={3}>
            <Paper
                elevation={0}
                sx={{
                    borderRadius: '16px',
                    backgroundColor: 'white',
                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                    overflow: 'hidden',
                }}
            >
                {/* Header with gradient background */}
                <Box
                    sx={{
                        background: `linear-gradient(135deg, ${currentPlanDetails.color}20 0%, ${currentPlanDetails.color}10 100%)`,
                        p: { xs: 3, sm: 4 },
                        borderBottom: '1px solid #e5e7eb',
                    }}
                >
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Stack direction="row" alignItems="center" spacing={2}>
                            {getPlanIcon(currentPlan)}
                            <Box>
                                <Typography variant="h5" fontWeight={600}>
                                    {currentPlanDetails.name}
                                </Typography>
                                <Stack direction="row" alignItems="center" spacing={1} mt={0.5}>
                                    {currentPlan !== 'free' && expiryDate && (
                                        <>
                                            <AccessTimeIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                            <Typography variant="body2" color="text.secondary">
                                                Expires on {new Date(expiryDate).toLocaleDateString()}
                                            </Typography>
                                        </>
                                    )}
                                    {currentPlan === 'free' && (
                                        <Chip
                                            label="Active"
                                            size="small"
                                            color="success"
                                            sx={{ fontWeight: 500 }}
                                        />
                                    )}
                                </Stack>
                            </Box>
                        </Stack>

                        {currentPlan !== 'pro' && (
                            <Button
                                variant="contained"
                                startIcon={<TrendingUpIcon />}
                                sx={{
                                    borderRadius: '8px',
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                }}
                            >
                                Upgrade Plan
                            </Button>
                        )}
                    </Stack>
                </Box>

                {/* Content */}
                <Box sx={{ p: { xs: 3, sm: 4 } }}>
                    <Grid container spacing={4}>
                        {/* Current Plan Features */}
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" fontWeight={600} mb={2}>
                                Plan Features
                            </Typography>
                            <List dense>
                                {currentPlanDetails.features.map((feature, index) => (
                                    <ListItem key={index} sx={{ px: 0 }}>
                                        <ListItemIcon sx={{ minWidth: 32 }}>
                                            <CheckCircleIcon sx={{ fontSize: 20, color: 'success.main' }} />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={feature}
                                            primaryTypographyProps={{
                                                variant: 'body2',
                                            }}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Grid>

                        {/* Usage Statistics */}
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" fontWeight={600} mb={2}>
                                Current Usage
                            </Typography>
                            <Stack spacing={3}>
                                <UsageItem
                                    label="Profile Views Today"
                                    used={usage.profileViews.used}
                                    limit={usage.profileViews.limit}
                                />
                                <UsageItem
                                    label="Messages Sent Today"
                                    used={usage.messagesScent.used}
                                    limit={usage.messagesScent.limit}
                                />
                                <UsageItem
                                    label="Listings Viewed Today"
                                    used={usage.listingsViewed.used}
                                    limit={usage.listingsViewed.limit}
                                />
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>

            {/* Available Plans */}
            {currentPlan !== 'pro' && (
                <Box>
                    <Typography variant="h5" fontWeight={600} mb={2}>
                        Available Plans
                    </Typography>
                    <Grid container spacing={2}>
                        {Object.entries(subscriptionPlans)
                            .filter(([key]) => key !== currentPlan)
                            .map(([key, plan]) => (
                                <Grid item xs={12} sm={6} key={key}>
                                    <Card
                                        sx={{
                                            height: '100%',
                                            borderRadius: '12px',
                                            border: '1px solid #e5e7eb',
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                borderColor: plan.color,
                                                transform: 'translateY(-2px)',
                                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                            },
                                        }}
                                    >
                                        <CardContent>
                                            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                                                {key === 'premium' && <DiamondIcon sx={{ color: plan.color }} />}
                                                {key === 'pro' && <WorkspacePremiumIcon sx={{ color: plan.color }} />}
                                                <Typography variant="h6" fontWeight={600}>
                                                    {plan.name}
                                                </Typography>
                                            </Stack>
                                            <Typography variant="h4" fontWeight={700} color={plan.color}>
                                                {plan.price}
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    color="text.secondary"
                                                    ml={0.5}
                                                >
                                                    {plan.period}
                                                </Typography>
                                            </Typography>
                                            <Divider sx={{ my: 2 }} />
                                            <List dense>
                                                {plan.features.slice(0, 3).map((feature, index) => (
                                                    <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                                                        <ListItemIcon sx={{ minWidth: 28 }}>
                                                            <CheckCircleIcon
                                                                sx={{ fontSize: 16, color: plan.color }}
                                                            />
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            primary={feature}
                                                            primaryTypographyProps={{
                                                                variant: 'caption',
                                                            }}
                                                        />
                                                    </ListItem>
                                                ))}
                                            </List>
                                            <Button
                                                fullWidth
                                                variant="outlined"
                                                sx={{
                                                    mt: 2,
                                                    borderColor: plan.color,
                                                    color: plan.color,
                                                    '&:hover': {
                                                        borderColor: plan.color,
                                                        backgroundColor: `${plan.color}10`,
                                                    },
                                                }}
                                            >
                                                Choose {plan.name}
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                    </Grid>
                </Box>
            )}
        </Stack>
    );
};

export default SubscriptionDetailCard;