import { Box, Button, Stack, Typography, Avatar, Paper, Badge, IconButton, Fade, CircularProgress, LinearProgress, Chip, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { useGlobalContext } from "@/global-context";
import { updateProfileApi } from "@/api/profiles";
import generateSignedUrl from "@/utils/generateSignedUrl";
import { useGlobalSnackbar } from "@/hooks/useSnackbar";
import DynamicFormRenderer from "@/custom-component/CustomizedSchemaBasedForm/DynamicFormRenderer";
import { editProfileFormSchema, myProfileValidationSchema } from "@/api/profiles/profile-data";
import { Formik, Form } from "formik";
import { CameraAlt, Edit, Save, Cancel, Verified, CalendarToday, Person, Email, Phone, Badge as BadgeIcon } from '@mui/icons-material';
import { IUserData } from "@/types/user";

interface IMyProfileComponentProps {
  isMyProfile: boolean;
  userData: IUserData | null;
}

const MyProfileComponent = ({ isMyProfile, userData }: IMyProfileComponentProps) => {
  const { setState } = useGlobalContext();
  const [isEditMode, setIsEditMode] = useState(false);
  const [profileData, setProfileData] = useState(userData);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const snackbar = useGlobalSnackbar();

  useEffect(() => {
    setProfileData(userData);
  }, [userData]);

  const handleSetSelectedFiles = (files: File[]) => {
    setSelectedFiles(files);
    if (files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(files[0]);
    } else {
      setImagePreview(null);
    }
  };

  const handleSave = async (values: any) => {
    setIsSubmitting(true);
    try {
      let updatedImageUrl = profileData?.profileImage || "";

      if (selectedFiles.length > 0) {
        const result = await generateSignedUrl({
          entity: "profile",
          file: selectedFiles[0],
        });

        if (result?.publicUrl) {
          updatedImageUrl = result.publicUrl;
        }
      }

      const { data } = await updateProfileApi({
        ...values,
        profileImage: updatedImageUrl,
      });

      setState({ userData: data?.data });
      snackbar.success(data?.message || "Profile updated successfully");
      setProfileData(data?.data);
      setSelectedFiles([]);
      setImagePreview(null);
      setIsEditMode(false);
    } catch (error) {
      console.error("Failed to save profile data:", error);
      snackbar.error("Failed to update profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateProfileCompletion = () => {
    const fields = ['firstName', 'lastName', 'email', 'phoneNo', 'gender', 'description', 'profileImage'] as const;
    const filledFields = fields.filter(field => profileData?.[field as keyof typeof profileData]);
    return Math.round((filledFields.length / fields.length) * 100);
  };

  const profileCompletion = calculateProfileCompletion();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: (theme) => theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
          : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        py: 4,
      }}
    >
      <Box maxWidth="1000px" mx="auto" px={2}>
        <Fade in={true} timeout={600}>
          <Stack spacing={4}>
            {/* Profile Header Card */}
            <Paper
              elevation={0}
              sx={{
                borderRadius: 3,
                background: (theme) => theme.palette.mode === 'dark'
                  ? 'linear-gradient(145deg, #2a2d3d 0%, #212332 100%)'
                  : 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                boxShadow: (theme) => theme.palette.mode === 'dark'
                  ? '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.1)'
                  : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                border: (theme) => `1px solid ${theme.palette.divider}`,
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              {/* Decorative Background Pattern */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '300px',
                  height: '200px',
                  background: (theme) => theme.palette.mode === 'dark'
                    ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.08) 100%)'
                    : 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.05) 100%)',
                  borderRadius: '0 24px 0 100%',
                }}
              />

              <Box sx={{ position: 'relative', p: { xs: 3, sm: 4 } }}>
                {/* Profile Completion Bar */}
                <Box mb={4}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="body2" color="text.secondary" fontWeight={500}>
                      Profile Completion
                    </Typography>
                    <Chip
                      label={`${profileCompletion}%`}
                      size="small"
                      color={profileCompletion >= 80 ? "success" : profileCompletion >= 60 ? "warning" : "error"}
                      sx={{ fontWeight: 600 }}
                    />
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={profileCompletion}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: (theme) => theme.palette.action.hover,
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 4,
                        background: profileCompletion >= 80
                          ? (theme) => `linear-gradient(90deg, ${theme.palette.success.main} 0%, ${theme.palette.success.dark} 100%)`
                          : profileCompletion >= 60
                            ? (theme) => `linear-gradient(90deg, ${theme.palette.warning.main} 0%, ${theme.palette.warning.dark} 100%)`
                            : (theme) => `linear-gradient(90deg, ${theme.palette.error.main} 0%, ${theme.palette.error.dark} 100%)`,
                      },
                    }}
                  />
                </Box>

                {/* Profile Avatar Section */}
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4} alignItems="center" mb={4}>
                  <Stack alignItems="center">
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      badgeContent={
                        isEditMode ? (
                          <IconButton
                            size="small"
                            sx={{
                              bgcolor: 'primary.main',
                              color: 'primary.contrastText',
                              width: 40,
                              height: 40,
                              boxShadow: 2,
                              '&:hover': {
                                bgcolor: 'primary.dark',
                                transform: 'scale(1.05)',
                              },
                              transition: 'all 0.2s ease-in-out',
                            }}
                            onClick={() => document.getElementById('profile-image-input')?.click()}
                          >
                            <CameraAlt sx={{ fontSize: 20 }} />
                          </IconButton>
                        ) : profileData?.verified ? (
                          <Box
                            sx={{
                              bgcolor: 'success.main',
                              borderRadius: '50%',
                              width: 40,
                              height: 40,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              border: (theme) => `3px solid ${theme.palette.background.paper}`,
                              boxShadow: 2,
                            }}
                          >
                            <Verified sx={{ color: 'white', fontSize: 22 }} />
                          </Box>
                        ) : null
                      }
                    >
                      <Avatar
                        src={imagePreview || profileData?.profileImage || ""}
                        sx={{
                          width: 140,
                          height: 140,
                          border: (theme) => `6px solid ${theme.palette.background.paper}`,
                          boxShadow: 3,
                          fontSize: '3rem',
                          fontWeight: 600,
                          bgcolor: profileData?.firstName ? 'primary.main' : 'grey.400',
                        }}
                      >
                        {profileData?.firstName?.[0]?.toUpperCase()}
                      </Avatar>
                    </Badge>
                    <input
                      id="profile-image-input"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleSetSelectedFiles(e.target.files ? Array.from(e.target.files) : [])}
                      style={{ display: 'none' }}
                    />
                  </Stack>

                  <Stack flex={1} alignItems={{ xs: 'center', sm: 'flex-start' }} textAlign={{ xs: 'center', sm: 'left' }}>
                    <Typography variant="h4" fontWeight={700} color="text.primary" mb={1}>
                      {profileData?.firstName && profileData?.lastName
                        ? `${profileData.firstName} ${profileData.lastName}`
                        : 'Complete Your Profile'
                      }
                    </Typography>
                    <Typography variant="body1" color="text.secondary" mb={2} maxWidth="400px">
                      {profileData?.description || isMyProfile ? 'Add a description to tell others about yourself' : ""}
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent={{ xs: 'center', sm: 'flex-start' }}>
                      {profileData?.verified && (
                        <Chip
                          icon={<Verified sx={{ fontSize: 18 }} />}
                          label="Verified"
                          color="success"
                          variant="outlined"
                          size="small"
                        />
                      )}
                      <Chip
                        icon={<CalendarToday sx={{ fontSize: 16 }} />}
                        label={`Member since ${profileData?.createdAt ? new Date(profileData.createdAt).getFullYear() : 'N/A'}`}
                        variant="outlined"
                        size="small"
                      />
                    </Stack>
                  </Stack>
                </Stack>

                {/* Action Buttons */}
                {isMyProfile && <Stack direction="row" justifyContent="flex-end" spacing={2}>
                  {!isEditMode ? (
                    <Button
                      variant="contained"
                      startIcon={<Edit />}
                      onClick={() => setIsEditMode(true)}
                      sx={{
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 600,
                        px: 3,
                        py: 1.5,
                        boxShadow: 2,
                        '&:hover': {
                          boxShadow: 4,
                          transform: 'translateY(-1px)',
                        },
                        transition: 'all 0.2s ease-in-out',
                      }}
                    >
                      Edit Profile
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      startIcon={<Cancel />}
                      onClick={() => {
                        setIsEditMode(false);
                        setImagePreview(null);
                        setSelectedFiles([]);
                      }}
                      sx={{
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 600,
                        px: 3,
                        py: 1.5,
                        '&:hover': {
                          bgcolor: 'error.main',
                          color: 'error.contrastText',
                          borderColor: 'error.main',
                        },
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                </Stack>}
              </Box>
            </Paper>

            {/* Profile Details Card */}
            <Paper
              elevation={0}
              sx={{
                borderRadius: 3,
                bgcolor: 'background.paper',
                boxShadow: (theme) => theme.palette.mode === 'dark'
                  ? '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.1)'
                  : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                border: (theme) => `1px solid ${theme.palette.divider}`,
                overflow: 'hidden',
              }}
            >
              <Box sx={{ p: { xs: 3, sm: 4 } }}>
                <Typography variant="h5" fontWeight={700} color="text.primary" mb={3}>
                  Profile Information
                </Typography>

                {isEditMode ? (
                  <Formik
                    initialValues={profileData}
                    validationSchema={myProfileValidationSchema}
                    onSubmit={handleSave}
                    enableReinitialize={true}
                  >
                    {({ handleChange, values, touched, errors, setFieldValue, isValid, dirty }) => (
                      <Form>
                        <Stack spacing={3} mb={4}>
                          <DynamicFormRenderer
                            schema={editProfileFormSchema}
                            values={values}
                            touched={touched}
                            errors={errors}
                            handleChange={handleChange}
                            setFieldValue={setFieldValue}
                            setLocation={() => { }}
                            setSelectedFiles={() => { }}
                          />
                        </Stack>

                        <Divider sx={{ mb: 3 }} />

                        <Button
                          type="submit"
                          variant="contained"
                          startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <Save />}
                          disabled={isSubmitting || (!dirty && selectedFiles.length === 0)}
                          fullWidth
                          sx={{
                            py: 2,
                            fontSize: '1.1rem',
                            fontWeight: 700,
                            textTransform: 'none',
                            borderRadius: 2,
                            bgcolor: 'success.main',
                            color: 'success.contrastText',
                            boxShadow: 2,
                            '&:hover': {
                              bgcolor: 'success.dark',
                              boxShadow: 4,
                              transform: 'translateY(-1px)',
                            },
                            '&:disabled': {
                              bgcolor: 'action.disabledBackground',
                              color: 'action.disabled',
                            },
                            transition: 'all 0.2s ease-in-out',
                          }}
                        >
                          {isSubmitting ? 'Saving Changes...' : 'Save Changes'}
                        </Button>
                      </Form>
                    )}
                  </Formik>
                ) : (
                  <Stack spacing={4}>
                    {/* Personal Information Section */}
                    <Stack spacing={2}>
                      <Typography variant="h6" fontWeight={600} color="primary.main" sx={{ display: 'flex', alignItems: 'center' }}>
                        <Person sx={{ mr: 1, fontSize: 20 }} />
                        Personal Information
                      </Typography>
                      <Stack spacing={2}>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                          <Box
                            flex={1}
                            sx={{
                              p: 2.5,
                              borderRadius: 2,
                              bgcolor: (theme) => theme.palette.mode === 'dark'
                                ? 'rgba(144, 202, 249, 0.08)'
                                : 'rgba(25, 118, 210, 0.04)',
                              border: (theme) => `1px solid ${theme.palette.primary.main}20`,
                            }}
                          >
                            <Typography variant="body2" color="primary.main" fontWeight={600} mb={0.5}>
                              First Name
                            </Typography>
                            <Typography variant="body1" fontWeight={500} color="text.primary">
                              {profileData?.firstName || 'Not provided'}
                            </Typography>
                          </Box>
                          <Box
                            flex={1}
                            sx={{
                              p: 2.5,
                              borderRadius: 2,
                              bgcolor: (theme) => theme.palette.mode === 'dark'
                                ? 'rgba(144, 202, 249, 0.08)'
                                : 'rgba(25, 118, 210, 0.04)',
                              border: (theme) => `1px solid ${theme.palette.primary.main}20`,
                            }}
                          >
                            <Typography variant="body2" color="primary.main" fontWeight={600} mb={0.5}>
                              Last Name
                            </Typography>
                            <Typography variant="body1" fontWeight={500} color="text.primary">
                              {profileData?.lastName || 'Not provided'}
                            </Typography>
                          </Box>
                        </Stack>

                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                          <Box
                            flex={1}
                            sx={{
                              p: 2.5,
                              borderRadius: 2,
                              bgcolor: (theme) => theme.palette.mode === 'dark'
                                ? 'rgba(144, 202, 249, 0.08)'
                                : 'rgba(25, 118, 210, 0.04)',
                              border: (theme) => `1px solid ${theme.palette.primary.main}20`,
                            }}
                          >
                            <Typography variant="body2" color="primary.main" fontWeight={600} mb={0.5}>
                              Gender
                            </Typography>
                            <Typography variant="body1" fontWeight={500} color="text.primary">
                              {profileData?.gender || 'Not specified'}
                            </Typography>
                          </Box>
                          <Box
                            flex={1}
                            sx={{
                              p: 2.5,
                              borderRadius: 2,
                              bgcolor: (theme) => theme.palette.mode === 'dark'
                                ? 'rgba(144, 202, 249, 0.08)'
                                : 'rgba(25, 118, 210, 0.04)',
                              border: (theme) => `1px solid ${theme.palette.primary.main}20`,
                            }}
                          >
                            <Typography variant="body2" color="primary.main" fontWeight={600} mb={0.5}>
                              Member Since
                            </Typography>
                            <Typography variant="body1" fontWeight={500} color="text.primary" sx={{ display: 'flex', alignItems: 'center' }}>
                              <CalendarToday sx={{ fontSize: 16, mr: 1, color: 'primary.main' }} />
                              {profileData?.createdAt ? new Date(profileData.createdAt).toLocaleDateString() : 'Not available'}
                            </Typography>
                          </Box>
                        </Stack>
                      </Stack>
                    </Stack>

                    <Divider />

                    {/* Contact Information Section */}
                    <Stack spacing={2}>
                      <Typography variant="h6" fontWeight={600} color="success.main" sx={{ display: 'flex', alignItems: 'center' }}>
                        <Email sx={{ mr: 1, fontSize: 20 }} />
                        Contact Information
                      </Typography>
                      <Stack spacing={2}>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                          <Box
                            flex={1}
                            sx={{
                              p: 2.5,
                              borderRadius: 2,
                              bgcolor: (theme) => theme.palette.mode === 'dark'
                                ? 'rgba(129, 199, 132, 0.08)'
                                : 'rgba(46, 125, 50, 0.04)',
                              border: (theme) => `1px solid ${theme.palette.success.main}20`,
                            }}
                          >
                            <Typography variant="body2" color="success.main" fontWeight={600} mb={0.5}>
                              Email Address
                            </Typography>
                            <Typography variant="body1" fontWeight={500} color="text.primary">
                              {profileData?.email || 'Not provided'}
                            </Typography>
                          </Box>
                          <Box
                            flex={1}
                            sx={{
                              p: 2.5,
                              borderRadius: 2,
                              bgcolor: (theme) => theme.palette.mode === 'dark'
                                ? 'rgba(129, 199, 132, 0.08)'
                                : 'rgba(46, 125, 50, 0.04)',
                              border: (theme) => `1px solid ${theme.palette.success.main}20`,
                            }}
                          >
                            <Typography variant="body2" color="success.main" fontWeight={600} mb={0.5}>
                              Phone Number
                            </Typography>
                            <Typography variant="body1" fontWeight={500} color="text.primary" sx={{ display: 'flex', alignItems: 'center' }}>
                              <Phone sx={{ fontSize: 16, mr: 1, color: 'success.main' }} />
                              {profileData?.phoneNo || 'Not provided'}
                            </Typography>
                          </Box>
                        </Stack>
                      </Stack>
                    </Stack>

                    <Divider />

                    {/* Description Section */}
                    <Stack spacing={2}>
                      <Typography variant="h6" fontWeight={600} color="warning.main" sx={{ display: 'flex', alignItems: 'center' }}>
                        <BadgeIcon sx={{ mr: 1, fontSize: 20 }} />
                        About Me
                      </Typography>
                      <Box
                        sx={{
                          p: 3,
                          borderRadius: 2,
                          bgcolor: (theme) => theme.palette.mode === 'dark'
                            ? 'rgba(255, 183, 77, 0.08)'
                            : 'rgba(245, 124, 0, 0.04)',
                          border: (theme) => `1px solid ${theme.palette.warning.main}20`,
                        }}
                      >
                        <Typography variant="body1" fontWeight={500} color="text.primary" lineHeight={1.6}>
                          {profileData?.description || isMyProfile ? 'No description added yet. Share something about yourself!' : "No description available."}
                        </Typography>
                      </Box>
                    </Stack>
                  </Stack>
                )}
              </Box>
            </Paper>
          </Stack>
        </Fade>
      </Box>
    </Box>
  );
};

export default MyProfileComponent;  