import {
  Card, CardContent, Typography,
  Box,
  Stack,
  Chip,
  IconButton,
  Button,
  Avatar,
  Tooltip,
  CircularProgress,
  useTheme,
  useMediaQuery
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
  PersonOutline,
  CheckCircle,
  Pending,
  PersonAdd
} from '@mui/icons-material';
import { useState } from 'react';
import { SearchPropertyCard } from '@/types/property';
import { RequestContact } from '../contact-access-components';
import { formatDistanceToNow } from '@/utils/dataFormate';
import { getGenderPreference, getPropertyType } from '@/api/property/list-property-data';
import { useGlobalContext } from '@/global-context';
import { useGlobalSnackbar } from '@/hooks/useSnackbar';
import { useRouter } from 'next/router';

interface PropertyDetailsCardProps {
  propertyDetails?: SearchPropertyCard;
  dummyIndex?: number;
}

export default function PropertyDetailsCard({ propertyDetails, dummyIndex = 0 }: PropertyDetailsCardProps) {
  const data = propertyDetails;
  const [isFavorite, setIsFavorite] = useState(false);
  const { state, handleLoginDialog } = useGlobalContext();
  const { success } = useGlobalSnackbar()
  const { connections, userData } = state;
  const router = useRouter();
  const theme = useTheme();

  const formattedDate = formatDistanceToNow(new Date(data?.listedOn ?? ''), { addSuffix: true });
  const genderPref = getGenderPreference(data?.partnerGender ?? '');
  const [openRequestContact, setOpenRequestContact] = useState(false);

  // Get status configuration based on userStatus
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'connected':
        return {
          icon: <CheckCircle sx={{ fontSize: { xs: 14, sm: 16 } }} />,
          label: 'Connected',
          color: '#00b894',
          backgroundColor: '#00b89420'
        };
      case 'pending':
        return {
          icon: <Pending sx={{ fontSize: { xs: 14, sm: 16 } }} />,
          label: 'Pending',
          color: '#fdcb6e',
          backgroundColor: '#fdcb6e20'
        };
      case 'notConnected':
      default:
        return {
          icon: <PersonAdd sx={{ fontSize: { xs: 14, sm: 16 } }} />,
          label: 'Connect',
          color: '#6c5ce7',
          backgroundColor: '#6c5ce720'
        };
    }
  };

  const statusConfig = getStatusConfig(data?.userStatus ?? 'notConnected');

  const handleContact = (type: "chat" | "phone") => {
    if (!userData.isLoggedIn) {
      handleLoginDialog(true);
      return;
    }

    // Handle based on userStatus
    if (data?.userStatus === 'connected') {
      if (type === "phone") {
        const connectionData = connections.find(connection => connection.otherUser?.id === data?.userId);
        if (connectionData?.otherUser?.phoneNo) {
          window.location.href = `tel:${connectionData.otherUser.phoneNo}`;
        }
      } else if (type === "chat") {
        router.push(`/chat?id=${data?.userId}`);
      }
    } else if (data?.userStatus === 'pending') {
      success('Connection request is pending approval');
      return;
    } else {
      // userStatus is 'notConnected'
      setOpenRequestContact(true);
    }
  };

  const handleRoute = (path: string) => {
    if (!userData.isLoggedIn) {
      handleLoginDialog(true);
      return;
    }
    router.push(path);
  };

  return (
    <>
      <RequestContact
        open={openRequestContact}
        onClose={() => { setOpenRequestContact(false) }}
        userId={data?.userId ?? 0}
      />

      <Card
        sx={{
          width: '100%',
          // maxWidth: '100%',
          minWidth: { xs: 2, sm: 2.5 },
          maxWidth: { xs: "100%", sm: "100%", md: 390 },
          height: 'fit-content',
          position: 'relative',
          borderRadius: 2,
          boxShadow: {
            xs: '0 2px 8px rgba(0,0,0,0.1)',
            sm: '0 4px 12px rgba(0,0,0,0.1)',
            md: '0 8px 32px rgba(0,0,0,0.1)'
          },
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: { xs: 'translateY(-2px)', sm: 'translateY(-4px)' },
            boxShadow: {
              xs: '0 4px 16px rgba(0,0,0,0.15)',
              sm: '0 8px 24px rgba(0,0,0,0.15)',
              md: '0 12px 40px rgba(0,0,0,0.15)'
            }
          }
        }}
      >
        {/* Building Icon Badge - Hide on mobile */}
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            position: 'absolute',
            top: { sm: -8, md: -12 },
            right: { sm: 12, md: 16 },
            width: { sm: 40, md: 48 },
            height: { sm: 40, md: 48 },
            borderRadius: { sm: '8px', md: '12px' },
            background: 'linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(108, 92, 231, 0.3)',
            zIndex: 1
          }}
        >
          <Home sx={{
            color: 'white',
            fontSize: { sm: 18, md: 24 }
          }} />
        </Box>

        {/* User Profile Section */}
        <Box sx={{
          p: { xs: 2, sm: 2.5, md: 3 },
          pb: { xs: 1, sm: 1.5, md: 0 }
        }}>
          <Stack
            direction="row"
            spacing={{ xs: 1.5, sm: 2 }}
            alignItems="center"
            mb={{ xs: 1.5, sm: 2 }}
          >
            <Box sx={{ position: 'relative' }}>
              <Avatar
                src={data?.userImage ?? ''}
                alt={data?.userName ?? ''}
                sx={{
                  width: { xs: 48, sm: 56, md: 64 },
                  height: { xs: 48, sm: 56, md: 64 },
                  border: '3px solid',
                  borderColor: 'rgba(108, 92, 231, 0.2)'
                }}
              />
              {/* Status indicator on avatar */}
              {data?.userStatus === 'connected' && (
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: { xs: 16, sm: 18, md: 20 },
                    height: { xs: 16, sm: 18, md: 20 },
                    borderRadius: '50%',
                    backgroundColor: '#00b894',
                    border: '2px solid white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <CheckCircle sx={{
                    fontSize: { xs: 10, sm: 11, md: 12 },
                    color: 'white'
                  }} />
                </Box>
              )}
            </Box>

            <Box flex={1} minWidth={0}>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                alignItems={{ xs: 'flex-start', sm: 'center' }}
                spacing={{ xs: 0.5, sm: 1 }}
                mb={0.5}
              >
                <Typography
                  variant="h6"
                  fontWeight={600}
                  color="text.primary"
                  sx={{
                    fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: { xs: '200px', sm: 'none' }
                  }}
                >
                  {data?.userName ?? ''}
                </Typography>
                {/* Status chip */}
                <Chip
                  icon={statusConfig.icon}
                  label={statusConfig.label}
                  size="small"
                  sx={{
                    backgroundColor: statusConfig.backgroundColor,
                    color: statusConfig.color,
                    fontWeight: 500,
                    fontSize: { xs: '0.6rem', sm: '0.75rem' },
                    height: { xs: 20, sm: 24 }
                  }}
                />
              </Stack>
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <CalendarToday sx={{
                  fontSize: { xs: 12, sm: 14 },
                  color: 'text.secondary'
                }} />
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ fontSize: { xs: '0.6rem', sm: '0.75rem' } }}
                >
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
                    size={40}
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
                    <Typography
                      variant="caption"
                      component="div"
                      color="text.primary"
                      fontWeight={700}
                      sx={{ fontSize: { xs: '0.6rem', sm: '0.75rem' } }}
                    >
                      {`${Math.round(data?.matchPercentage ?? 0)}%`}
                    </Typography>
                  </Box>
                </Box>
                <Typography
                  variant="caption"
                  display="block"
                  color="text.secondary"
                  mt={0.5}
                  sx={{ fontSize: { xs: '0.5rem', sm: '0.6rem' } }}
                >
                  Match
                </Typography>
              </Box>
            )}
          </Stack>
        </Box>

        <CardContent sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          p: { xs: 2, sm: 2.5, md: 3 },
          pt: "0 !Important ",
          '&:last-child': { pb: { xs: 2, sm: 2.5, md: 3 } }
        }}>
          {/* Location and Distance */}
          <div onClick={() => handleRoute(`/property/${data?.slug}`)} className='cursor-pointer'>
            <Stack spacing={{ xs: 1, sm: 1.5, md: 2 }} mb={{ xs: 2, sm: 2.5, md: 3 }}>
              <Stack direction="row" alignItems="flex-start" spacing={0.5}>
                <LocationOn sx={{
                  fontSize: { xs: 16, sm: 18 },
                  mt: 0.5,
                  color: 'text.secondary',
                  flexShrink: 0,
                }} />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    flex: 1,
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical'
                  }}
                >
                  {data?.address ?? ''}
                </Typography>
              </Stack>

              {/* Chips - Responsive Layout */}
              <Box>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={{ xs: 0.5, sm: 1 }}
                  flexWrap="wrap"
                  overflow="scroll"
                >
                  <Chip
                    icon={<Speed sx={{ fontSize: { xs: 12, sm: 16 } }} />}
                    label={`${data?.distance?.toFixed(1) ?? 0} km away`}
                    size="small"
                    sx={{
                      backgroundColor: '#f3f0ff',
                      color: '#6c5ce7',
                      fontWeight: 500,
                      fontSize: { xs: '0.6rem', sm: '0.75rem' },
                      height: { xs: 20, sm: 24 }
                    }}
                  />
                  <Chip
                    label={getPropertyType(data?.typeId ?? 0)}
                    size="small"
                    sx={{
                      backgroundColor: '#e8f4ff',
                      color: '#0984e3',
                      fontWeight: 500,
                      fontSize: { xs: '0.6rem', sm: '0.75rem' },
                      height: { xs: 20, sm: 24 }
                    }}
                  />
                  <Chip
                    icon={<PersonOutline sx={{ fontSize: { xs: 12, sm: 16 } }} />}
                    label={genderPref.label}
                    size="small"
                    sx={{
                      backgroundColor: `${genderPref.color}20`,
                      color: genderPref.color,
                      fontWeight: 500,
                      fontSize: { xs: '0.6rem', sm: '0.75rem' },
                      height: { xs: 20, sm: 24 }
                    }}
                  />
                </Stack>
              </Box>

              {/* Price and Action Icons */}
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                flexWrap="wrap"
                gap={1}
              >
                <Box
                  sx={{
                    backgroundColor: '#f8f9fa',
                    borderRadius: { xs: '8px', sm: '12px' },
                    p: { xs: 1, sm: 1.5, md: 2 },
                    minWidth: 'fit-content'
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      color: '#6c5ce7',
                      fontWeight: 700,
                      fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2rem' }
                    }}
                  >
                    {data?.rent ?? 0}
                    <Typography
                      component="span"
                      variant="body1"
                      sx={{
                        color: '#636e72',
                        fontWeight: 400,
                        fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' }
                      }}
                    >
                      /month
                    </Typography>
                  </Typography>
                </Box>

                {/* Favorite and Share Icons - Mobile Only */}
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ display: { xs: 'flex', sm: 'none' } }}
                >
                  <Tooltip title="Save to favorites">
                    <IconButton
                      onClick={() => setIsFavorite(!isFavorite)}
                      size="small"
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
                        <Favorite sx={{ color: '#e84393', fontSize: 16 }} />
                      ) : (
                        <FavoriteBorder sx={{ fontSize: 16 }} />
                      )}
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Share">
                    <IconButton
                      size="small"
                      sx={{
                        border: '2px solid #e0e0e0',
                        '&:hover': {
                          borderColor: '#6c5ce7',
                          backgroundColor: 'rgba(108, 92, 231, 0.05)'
                        }
                      }}
                    >
                      <Share sx={{ fontSize: 16 }} />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Stack>
            </Stack>
          </div>

          {/* Action Buttons */}
          <Box sx={{ mt: 'auto' }}>
            {/* Desktop Action Icons */}
            {/* <Stack
              direction="row"
              spacing={1}
              sx={{
                mt: 'auto',
                display: { xs: 'none', sm: 'flex' },
                mb: 2
              }}
            >
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
            </Stack> */}

            {/* Contact Buttons */}
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={{ xs: 1, sm: 1.5 }}
            >
              {data?.userStatus === 'connected' ? (
                // Show both buttons when connected
                <>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<Chat sx={{ fontSize: { xs: 16, sm: 20 } }} />}
                    onClick={() => handleContact("chat")}
                    sx={{
                      borderColor: '#6c5ce7',
                      color: '#6c5ce7',
                      fontSize: { xs: '0.75rem', sm: '0.875rem' },
                      py: { xs: 1, sm: 1.25 },
                      '&:hover': {
                        borderColor: '#5f4cd1',
                        backgroundColor: '#6c5ce720'
                      }
                    }}
                  >
                    Message
                  </Button>

                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<Phone sx={{ fontSize: { xs: 16, sm: 20 } }} />}
                    onClick={() => handleContact("phone")}
                    sx={{
                      backgroundColor: '#6c5ce7',
                      fontSize: { xs: '0.75rem', sm: '0.875rem' },
                      py: { xs: 1, sm: 1.25 },
                      '&:hover': {
                        backgroundColor: '#5f4cd1'
                      }
                    }}
                  >
                    Call
                  </Button>
                </>
              ) : (
                // Show single status button when not connected
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={statusConfig.icon}
                  onClick={() => handleContact("chat")}
                  sx={{
                    borderColor: statusConfig.color,
                    color: statusConfig.color,
                    backgroundColor: statusConfig.backgroundColor,
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    py: { xs: 1, sm: 1.25 },
                    '&:hover': {
                      backgroundColor: statusConfig.backgroundColor,
                      opacity: 0.8
                    },
                    fontWeight: 600
                  }}
                >
                  {statusConfig.label}
                </Button>
              )}
            </Stack>
          </Box>
        </CardContent>
      </Card >
    </>
  );
}