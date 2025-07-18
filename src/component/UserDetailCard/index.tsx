import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Stack,
  Chip,
  IconButton,
  Button,
  Avatar,
  Tooltip,
  LinearProgress,
  CircularProgress,
  Link
} from '@mui/material';
import {
  LocationOn,
  Favorite,
  FavoriteBorder,
  Share,
  Verified,
  Home,
  People,
  Chat,
  Phone,
  CalendarToday,
  Speed,
  PersonOutline
} from '@mui/icons-material';
import { useState } from 'react';
import { SearchPropertyCard } from '@/types/property';
import { RequestContact } from '../contact-access-components';
// Simple date formatting without external dependency
const formatDistanceToNow = (date: Date, options?: { addSuffix?: boolean }) => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return options?.addSuffix ? 'just now' : 'less than a minute';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return options?.addSuffix ? `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago` : `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''}`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return options?.addSuffix ? `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago` : `${diffInHours} hour${diffInHours > 1 ? 's' : ''}`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return options?.addSuffix ? `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago` : `${diffInDays} day${diffInDays > 1 ? 's' : ''}`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return options?.addSuffix ? `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago` : `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''}`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return options?.addSuffix ? `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago` : `${diffInMonths} month${diffInMonths > 1 ? 's' : ''}`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return options?.addSuffix ? `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago` : `${diffInYears} year${diffInYears > 1 ? 's' : ''}`;
};



interface PropertyDetailsCardProps {
  propertyDetails?: SearchPropertyCard;
  dummyIndex?: number;
}

export default function PropertyDetailsCard({ propertyDetails, dummyIndex = 0 }: PropertyDetailsCardProps) {
  // Use provided propertyDetails or fall back to dummy data
  const data = propertyDetails;
  const [isFavorite, setIsFavorite] = useState(false);

  // Format the date
  const formattedDate = formatDistanceToNow(new Date(data?.listedOn ?? ''), { addSuffix: true });

  // Get property type label
  const getPropertyType = (typeId: number) => {
    const types: { [key: number]: string } = {
      1: 'Apartment',
      2: 'House',
      3: 'Studio',
      4: 'Shared Room',
      5: 'Private Room'
    };
    return types[typeId] || 'Property';
  };

  // Get gender preference icon and color
  const getGenderPreference = (gender: string) => {
    switch (gender) {
      case 'male':
        return { label: 'Male Only', color: '#3498db' };
      case 'female':
        return { label: 'Female Only', color: '#e84393' };
      case 'any':
        return { label: 'Any Gender', color: '#6c5ce7' };
      default:
        return { label: 'Any Gender', color: '#6c5ce7' };
    }
  };

  const genderPref = getGenderPreference(data?.partnerGender ?? '');
  const [openRequestContact, setOpenRequestContact] = useState(false);

  return (<>
    <RequestContact open={openRequestContact} onClose={() => { setOpenRequestContact(false) }} userId={data?.userId ?? 0} />

    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '16px',
        overflow: 'visible',
        position: 'relative',
        transition: 'all 0.3s ease',
        border: '1px solid',
        borderColor: 'rgba(0,0,0,0.08)',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
          borderColor: 'rgba(108, 92, 231, 0.2)'
        }
      }}
    >
      {/* Building Icon Badge */}

      <Box
        sx={{
          position: 'absolute',
          top: -12,
          right: 16,
          width: 48,
          height: 48,
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(108, 92, 231, 0.3)',
          zIndex: 1
        }}
      >
        <Home sx={{ color: 'white' }} />
      </Box>

      {/* User Profile Section */}
      <Box sx={{ p: 3, pb: 0 }}>
        <Stack direction="row" spacing={2} alignItems="center" mb={2}>
          <Avatar
            src={data?.userImage ?? ''}
            alt={data?.userName ?? ''}
            sx={{
              width: 64,
              height: 64,
              border: '3px solid',
              borderColor: 'rgba(108, 92, 231, 0.2)'
            }}
          />
          <Box flex={1}>
            <Typography variant="h6" fontWeight={600} color="text.primary">
              {data?.userName ?? ''}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <CalendarToday sx={{ fontSize: 14, color: 'text.secondary' }} />
              <Typography variant="caption" color="text.secondary">
                Listed {formattedDate}
              </Typography>
            </Stack>
          </Box>

          {/* Match Percentage */}
          {data?.matchPercentage && (
            <Box textAlign="center">
              <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <CircularProgress
                  variant="determinate"
                  value={data?.matchPercentage ?? 0}
                  size={60}
                  thickness={4}
                  sx={{
                    color: data?.matchPercentage && data?.matchPercentage > 70 ? '#00b894' :
                      data?.matchPercentage && data?.matchPercentage > 40 ? '#fdcb6e' : '#e74c3c'
                  }}
                />
                <Box
                  sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="caption" component="div" color="text.primary" fontWeight={700}>
                    {`${Math.round(data?.matchPercentage ?? 0)}%`}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="caption" display="block" color="text.secondary" mt={0.5}>
                Match
              </Typography>
            </Box>
          )}
        </Stack>
      </Box>

      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', pt: 0 }}>
        {/* Location and Distance */}
        <Link href={`/property/${data?.slug}`}>
          <Stack spacing={1} mb={2}>
            <Stack direction="row" alignItems="flex-start" spacing={0.5}>
              <LocationOn sx={{ fontSize: 18, color: '#636e72', mt: 0.5 }} />
              <Typography className='truncate w-8 ' variant="body2" color="text.secondary" sx={{ flex: 1 }}>
                {data?.address ?? ''}
              </Typography>
            </Stack>

            <Stack direction="row" alignItems="center" spacing={2}>
              <Chip
                icon={<Speed sx={{ fontSize: 16 }} />}
                label={`${data?.distance?.toFixed(1) ?? 0} km away`}
                size="small"
                sx={{
                  backgroundColor: '#f3f0ff',
                  color: '#6c5ce7',
                  fontWeight: 500
                }}
              />
            </Stack>
          </Stack>
        </Link>
        {/* Price Section */}
        <Box
          sx={{
            backgroundColor: '#f8f9fa',
            borderRadius: '12px',
            p: 2,
            mb: 2
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: '#6c5ce7',
              fontWeight: 700
            }}
          >
            {data?.rent ?? 0}
            <Typography
              component="span"
              variant="body1"
              sx={{ color: '#636e72', fontWeight: 400 }}
            >
              /month
            </Typography>
          </Typography>
        </Box>

        {/* Property Details */}
        <Stack spacing={2} mb={2}>
          <Stack direction="row" spacing={1}>
            <Chip
              label={getPropertyType(data?.typeId ?? 0)}
              size="small"
              sx={{
                backgroundColor: '#e8f4ff',
                color: '#0984e3',
                fontWeight: 500
              }}
            />
            <Chip
              icon={<PersonOutline sx={{ fontSize: 16 }} />}
              label={genderPref.label}
              size="small"
              sx={{
                backgroundColor: `${genderPref.color}20`,
                color: genderPref.color,
                fontWeight: 500
              }}
            />
          </Stack>
        </Stack>


        <Stack direction="row" spacing={1} sx={{ mt: 'auto' }}>
          <Tooltip title="Save to favorites">
            <IconButton
              onClick={() => setIsFavorite(!isFavorite)}
              sx={{
                border: '2px solid',
                borderColor: isFavorite ? '#e84393' : '#e0e0e0',
                '&:hover': {
                  borderColor: '#e84393',
                  backgroundColor: 'rgba(232, 67, 147, 0.05)'
                }
              }}
            >
              {isFavorite ? (
                <Favorite sx={{ color: '#e84393' }} />
              ) : (
                <FavoriteBorder />
              )}
            </IconButton>
          </Tooltip>

          <Tooltip title="Share">
            <IconButton
              sx={{
                border: '2px solid #e0e0e0',
                '&:hover': {
                  borderColor: '#6c5ce7',
                  backgroundColor: 'rgba(108, 92, 231, 0.05)'
                }
              }}
            >
              <Share />
            </IconButton>
          </Tooltip>

          <Button
            variant="outlined"
            fullWidth
            startIcon={<Chat />}
            sx={{
              borderRadius: '12px',
              borderColor: '#6c5ce7',
              color: '#6c5ce7',
              textTransform: 'none',
              fontWeight: 500,
              '&:hover': {
                borderColor: '#5f4dd1',
                backgroundColor: 'rgba(108, 92, 231, 0.05)'
              }
            }}
          >
            Message
          </Button>

          <Button
            variant="contained"
            fullWidth
            startIcon={<Phone />}
            // href={`tel:${data?.phoneNo ?? ''}`}
            onClick={() => {
              setOpenRequestContact(true);
            }}
            sx={{
              borderRadius: '12px',
              backgroundColor: '#6c5ce7',
              textTransform: 'none',
              fontWeight: 500,
              boxShadow: '0 4px 20px rgba(108, 92, 231, 0.3)',
              '&:hover': {
                backgroundColor: '#5f4dd1',
                boxShadow: '0 6px 30px rgba(108, 92, 231, 0.4)'
              }
            }}
          >
            Call
          </Button>
        </Stack>
      </CardContent>

    </Card>
  </>
  );
}

// Helper function to generate multiple dummy cards
export const generateDummyCards = (count: number) => {
  return Array.from({ length: count }, (_, index) => (
    <PropertyDetailsCard key={`dummy-${index}`} dummyIndex={index} />
  ));
};