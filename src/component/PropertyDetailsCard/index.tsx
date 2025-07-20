import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  Chip,
  IconButton,
  Button,
  Avatar,
  Tooltip,
  CircularProgress,
  Link
} from '@mui/material';
import {
  LocationOn,
  Favorite,
  FavoriteBorder,
  Share,
  Home,
  Chat,
  Phone,
  CalendarToday,
  Speed,
  PersonOutline
} from '@mui/icons-material';
import { useState } from 'react';
import { SearchPropertyCard } from '@/types/property';
import { RequestContact } from '../contact-access-components';
import { formatDistanceToNow } from '@/utils/dataFormate';
import { getGenderPreference, getPropertyType } from '@/api/property/list-property-data';
import { useGlobalContext } from '@/global-context';
import { useGlobalSnackbar } from '@/hooks/useSnackbar';
import { useRouter } from 'next/router';

// Simple date formatting without external dependency



interface PropertyDetailsCardProps {
  propertyDetails?: SearchPropertyCard;
  dummyIndex?: number;
}

export default function PropertyDetailsCard({ propertyDetails, dummyIndex = 0 }: PropertyDetailsCardProps) {
  // Use provided propertyDetails or fall back to dummy data
  const data = propertyDetails;
  const [isFavorite, setIsFavorite] = useState(false);
  const { state, handleLoginDialog } = useGlobalContext();
  const { success } = useGlobalSnackbar()
  const { connections, userData } = state;
  const router = useRouter();
  // Format the date
  const formattedDate = formatDistanceToNow(new Date(data?.listedOn ?? ''), { addSuffix: true });

  // Get property type label


  const genderPref = getGenderPreference(data?.partnerGender ?? '');
  const [openRequestContact, setOpenRequestContact] = useState(false);

  const handleContact = (type: "chat" | "phone") => {
    if (!userData.isLoggedIn) {
      handleLoginDialog(true);
      return;
    }
    if (userData.connections.includes(data?.userId ?? 0)) {
      if (type === "phone") {

        const connectionData = connections.find(connection => connection.otherUser?.id === data?.userId);
        if (connectionData?.otherUser?.phoneNo) {
          window.location.href = `tel:${connectionData.otherUser.phoneNo}`;
        }

      }

      else if (type === "chat") {
        console.log(data);
        router.push(`/chat?id=${data?.userId}`);
      }
    }
    else {
      setOpenRequestContact(true);
    }
  }
  const handleRoute = (path: string) => {
    if (!userData.isLoggedIn) {
      handleLoginDialog(true);
      return;
    }
    router.push(path);
  }

  return (<>
    <RequestContact open={openRequestContact} onClose={() => { setOpenRequestContact(false) }} userId={data?.userId ?? 0} />

    <Card>
      {/* Building Icon Badge */}

      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          position: 'absolute',
          top: -12,
          right: 16,
          width: 48,
          height: 48,
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)',

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
        <div onClick={() => handleRoute(`/property/${data?.slug}`)} className='cursor-pointer'>
          <Stack spacing={1} mb={2}>
            <Stack direction="row" alignItems="flex-start" spacing={0.5}>
              <LocationOn sx={{ fontSize: 18, mt: 0.5, color: 'text.secondary' }} />
              <Typography className='truncate w-8 ' variant="body2" color="text.secondary" sx={{ flex: 1 }}>
                {data?.address ?? ''}
              </Typography>
            </Stack>

            <Stack direction="row" alignItems="center" spacing={2} >
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
              <Chip
                label={getPropertyType(data?.typeId ?? 0)}
                size="small"
                sx={{
                  display: { xs: 'none', md: 'block' },
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
            <Chip
              label={getPropertyType(data?.typeId ?? 0)}
              size="small"
              sx={{
                width: 'fit-content',
                display: { xs: 'flex', md: 'none' },
                backgroundColor: '#e8f4ff',
                color: '#0984e3',
                fontWeight: 500
              }}
            />
            <Stack direction="row" justifyContent="space-between" alignItems="center" >
              <Box
                sx={{
                  backgroundColor: '#f8f9fa',
                  borderRadius: '12px',
                  p: { xs: 1, md: 2 },
                  py: 2
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
              <Stack direction="row" spacing={1} sx={{ display: { xs: 'flex', md: 'none' } }}>
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
              </Stack>
            </Stack>

          </Stack>
        </div>
        {/* Price Section */}


        <Stack direction="row" spacing={1} sx={{ mt: 'auto' }}>
          <Stack direction="row" spacing={1} sx={{ mt: 'auto', display: { xs: 'none', md: 'flex' } }}>
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
          </Stack>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<Chat />}
            onClick={() => handleContact("chat")}
          >
            Message
          </Button>

          <Button
            variant="contained"
            fullWidth
            startIcon={<Phone />}
            // href={`tel:${data?.phoneNo ?? ''}`}
            onClick={() => handleContact("phone")}

          >
            Call
          </Button>
        </Stack>
      </CardContent>

    </Card>
  </>
  );
}
