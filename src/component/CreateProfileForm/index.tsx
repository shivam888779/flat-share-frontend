// pages/CreateProfileForm.tsx
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Button,
  Typography,
  Box,
  Stack,
  Paper,
  CircularProgress,
  Avatar,
  Fade,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { createProfileApi } from "@/api/profiles";
import { ICreateProfilePayLoad } from "@/types/user";
import { useGlobalContext } from "@/global-context";
import { useRouter } from "next/router";
import generateSignedUrl from "@/utils/generateSignedUrl";
import DynamicFormRenderer from "@/custom-component/CustomizedSchemaBasedForm/DynamicFormRenderer";
import { createProfileFormSchema } from "@/api/profiles/profile-data";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Initial values
const initialValues: ICreateProfilePayLoad = {
  firstName: "",
  lastName: "",
  gender: "Male",
  profileImage: "",
};

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
  gender: Yup.string()
    .oneOf(["Male", "Female", "Other"], "Please select a valid gender")
    .required("Gender is required"),
});

const CreateProfileForm = () => {
  const { state, setState } = useGlobalContext();
  const [submitted, setSubmitted] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const router = useRouter();

  // Update image preview when file is selected
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

  const handleSubmit = async (values: ICreateProfilePayLoad) => {
    setError(null);
    setIsSubmitting(true);

    try {
      let profileImageUrl = "";

      // Upload image if selected
      if (selectedFiles.length > 0) {
        const result = await generateSignedUrl({
          entity: "profile",
          file: selectedFiles[0],
        });

        if (!result.publicUrl) {
          throw new Error("Failed to upload profile image");
        }

        profileImageUrl = result.publicUrl;
      }

      // Create profile
      const { data } = await createProfileApi({
        ...values,
        profileImage: profileImageUrl
      });

      if (data?.status) {
        setState({ userData: { ...state?.userData, ...data?.data } });
        setSubmitted(true);

        // Redirect after success animation
        setTimeout(() => {
          router.push("/");
        }, 1500);
      } else {
        throw new Error("Failed to create profile");
      }
    } catch (err: any) {
      console.error("Error creating profile:", err);
      setError(err.message || "Failed to create profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f3f4f6',
        py: 4,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Box maxWidth="700px" mx="auto" px={2} width="100%">
        <Fade in={true} timeout={600}>
          <Box>
            {/* Header */}

            {/* Form Card */}
            <Paper
              elevation={0}
              sx={{
                borderRadius: '16px',
                backgroundColor: 'white',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                ...(submitted && {
                  transform: 'scale(0.98)',
                }),
              }}
            >
              <Box sx={{ p: { xs: 3, sm: 4 } }}>
                {!submitted ? (
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ handleChange, values, touched, errors, setFieldValue, isValid, dirty }) => (
                      <Form>
                        <Stack spacing={3}>
                          {/* Profile Image Preview */}


                          {/* Error Alert */}
                          {error && (
                            <Alert
                              severity="error"
                              onClose={() => setError(null)}
                              sx={{ borderRadius: '8px' }}
                            >
                              {error}
                            </Alert>
                          )}

                          {/* Form Fields */}
                          <DynamicFormRenderer
                            schema={createProfileFormSchema}
                            values={values}
                            touched={touched}
                            errors={errors}
                            handleChange={handleChange}
                            setFieldValue={setFieldValue}
                            setLocation={() => { }} // Not needed for profile form
                            setSelectedFiles={handleSetSelectedFiles}
                          />

                          {/* Submit Button */}
                          <Button
                            variant="contained"
                            type="submit"
                            disabled={isSubmitting || !isValid || (!dirty && selectedFiles.length === 0)}
                            fullWidth
                            size="large"
                            sx={{
                              mt: 2,
                              py: 1.5,
                              fontSize: '1rem',
                              fontWeight: 600,
                              textTransform: 'none',
                              borderRadius: '8px',
                              backgroundColor: 'primary.main',
                              boxShadow: 'none',
                              position: 'relative',
                              '&:hover': {
                                backgroundColor: 'primary.dark',
                                boxShadow: 'none',
                              },
                              '&:disabled': {
                                backgroundColor: '#e5e7eb',
                                color: '#9ca3af',
                              },
                            }}
                          >
                            {isSubmitting ? (
                              <>
                                <CircularProgress
                                  size={20}
                                  sx={{
                                    color: 'white',
                                    position: 'absolute',
                                    left: '50%',
                                    marginLeft: '-10px',
                                  }}
                                />
                                <span style={{ opacity: 0 }}>Creating Profile...</span>
                              </>
                            ) : (
                              'Create Profile'
                            )}
                          </Button>

                          {/* Privacy Note */}
                          <Typography
                            variant="caption"
                            sx={{
                              textAlign: 'center',
                              color: 'text.secondary',
                              display: 'block',
                              mt: 1,
                            }}
                          >
                            By creating a profile, you agree to our Terms of Service and Privacy Policy
                          </Typography>
                        </Stack>
                      </Form>
                    )}
                  </Formik>
                ) : (
                  // Success State
                  <Fade in={submitted} timeout={500}>
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                      <CheckCircleIcon
                        sx={{
                          fontSize: 64,
                          color: 'success.main',
                          mb: 2,
                        }}
                      />
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 600,
                          color: 'text.primary',
                          mb: 1,
                        }}
                      >
                        Profile Created Successfully!
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                        }}
                      >
                        Redirecting you to the homepage...
                      </Typography>
                      <CircularProgress
                        size={24}
                        sx={{
                          mt: 2,
                          color: 'primary.main',
                        }}
                      />
                    </Box>
                  </Fade>
                )}
              </Box>
            </Paper>
          </Box>
        </Fade>
      </Box>
    </Box>
  );
};

export default CreateProfileForm;