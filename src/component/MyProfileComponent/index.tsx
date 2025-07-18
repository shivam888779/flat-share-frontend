import {
  Box,
  Button,
  Stack,
  Typography,
  Avatar,
  Paper,
  Badge,
  IconButton,
  Chip,
  LinearProgress,
  Divider,
  Grid,
  Fade,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import SubscriptionDetailCard from "../SubscriptionDetailCard";
import { useGlobalContext } from "@/global-context";
import { updateProfileApi } from "@/api/profiles/my-profile";
import generateSignedUrl from "@/utils/generateSignedUrl";
import { useGlobalSnackbar } from "@/hooks/useSnackbar";
import DynamicFormRenderer from "@/custom-component/CustomizedSchemaBasedForm/DynamicFormRenderer";
import { editProfileFormSchema } from "@/api/profiles/profile-data";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import VerifiedIcon from '@mui/icons-material/Verified';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

// Validation schema
const validationSchema = Yup.object({
  firstName: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters")
    .required("First name is required"),
  lastName: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters")
    .required("Last name is required"),
  email: Yup.string()
    .email("Please enter a valid email address"),
  gender: Yup.string()
    .oneOf(["Male", "Female", "Other"], "Please select a valid gender")
    .required("Gender is required"),
  description: Yup.string()
    .max(500, "Description must be less than 500 characters"),
});

const MyProfileComponent = () => {
  const { state, setState } = useGlobalContext();
  const [isEditMode, setIsEditMode] = useState(false);
  const [profileData, setProfileData] = useState(state?.userData);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const snackbar = useGlobalSnackbar();

  useEffect(() => {
    setProfileData(state?.userData);
  }, [state]);

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
      let updatedImageUrl = profileData.profileImage;

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
        backgroundColor: '#f3f4f6',
        py: 4,
      }}
    >
      <Box maxWidth="900px" mx="auto" px={2}>
        <Fade in={true} timeout={600}>
          <Stack spacing={3}>





            {/* Profile Details Card */}
            <Paper
              elevation={0}
              sx={{
                borderRadius: '16px',
                backgroundColor: 'white',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                p: { xs: 3, sm: 4 },
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
                <Typography variant="h5" fontWeight={600} >
                  Profile Information
                </Typography>
                <Box>




                  {/* Edit/Save Buttons */}
                  {!isEditMode ? (
                    <Button
                      variant="outlined"
                      startIcon={<EditIcon />}
                      onClick={() => setIsEditMode(true)}
                      sx={{
                        borderRadius: '8px',
                        textTransform: 'none',
                        fontWeight: 500,
                      }}
                    >
                      Edit Profile
                    </Button>
                  ) : (
                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="outlined"
                        startIcon={<CancelIcon />}
                        onClick={() => {
                          setIsEditMode(false);
                          setImagePreview(null);
                          setSelectedFiles([]);
                        }}
                        sx={{
                          borderRadius: '8px',
                          textTransform: 'none',
                          fontWeight: 500,
                        }}
                      >
                        Cancel
                      </Button>
                    </Stack>
                  )}

                </Box>
              </Stack>

              <Stack
                direction="row"
                spacing={3}
                justifyContent="center"
                alignItems="center"
                width="100%"
                my={3}

              >
                {/* Profile Avatar */}
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  badgeContent={
                    isEditMode ? (
                      <IconButton
                        size="small"
                        sx={{
                          backgroundColor: 'primary.main',
                          color: 'white',
                          '&:hover': {
                            backgroundColor: 'primary.dark',
                          },
                        }}
                        onClick={() => document.getElementById('profile-image-input')?.click()}
                      >
                        <CameraAltIcon sx={{ fontSize: 20 }} />
                      </IconButton>
                    ) : profileData?.verified ? (
                      <VerifiedIcon sx={{ color: 'primary.main', fontSize: 28 }} />
                    ) : null
                  }
                >
                  <Avatar
                    src={imagePreview || profileData?.profileImage || ""}
                    sx={{
                      width: 120,
                      height: 120,
                      border: '4px solid white',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
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

                {/* Name and Actions */}

              </Stack>

              {isEditMode ? (
                <Formik
                  initialValues={profileData}
                  validationSchema={validationSchema}
                  onSubmit={handleSave}
                  enableReinitialize={true}
                >
                  {({ handleChange, values, touched, errors, setFieldValue, isValid, dirty }) => (
                    <Form>
                      <Grid container spacing={3} mx={"auto"} my={3}>
                        <Grid item xs={12}>
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
                        </Grid>
                        <Grid item xs={12}>
                          <Button
                            type="submit"
                            variant="contained"
                            startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                            disabled={isSubmitting || (!dirty && selectedFiles.length === 0)}
                            fullWidth
                            sx={{
                              py: 1.5,
                              fontSize: '1rem',
                              fontWeight: 600,
                              textTransform: 'none',
                              borderRadius: '8px',
                            }}
                          >
                            {isSubmitting ? 'Saving...' : 'Save Changes'}
                          </Button>
                        </Grid>
                      </Grid>
                    </Form>
                  )}
                </Formik>
              ) : (
                <Grid container spacing={3} mx={"auto"} my={3}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary" mb={0.5}>
                      First Name
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {profileData?.firstName || '-'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary" mb={0.5}>
                      Last Name
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {profileData?.lastName || '-'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary" mb={0.5}>
                      Email
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {profileData?.email || '-'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary" mb={0.5}>
                      Phone Number
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {profileData?.phoneNo || '-'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary" mb={0.5}>
                      Gender
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {profileData?.gender || '-'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary" mb={0.5}>
                      Member Since
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      <CalendarTodayIcon sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'text-bottom' }} />
                      {profileData?.createdAt ? new Date(profileData.createdAt).toLocaleDateString() : '-'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary" mb={0.5}>
                      Description
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {profileData?.description || 'No description added yet.'}
                    </Typography>
                  </Grid>
                </Grid>
              )}
            </Paper>

            {/* Subscription Details Card */}
            {/* <SubscriptionDetailCard /> */}
          </Stack>
        </Fade>
      </Box >
    </Box >
  );
};

export default MyProfileComponent;