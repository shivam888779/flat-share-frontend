import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Button,
  TextField,
  Typography,
  Box,
  Stack,
  InputAdornment,
  Container,
  Paper,
  useTheme,
  CircularProgress,
  Fade,
  Grow
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import LockIcon from "@mui/icons-material/Lock";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useState } from "react";
import { sendOtpApi, verifyOtpApi } from "@/api/auth";
import { IMobileFormValues, IOtpFormValues } from "@/types/user";
import { useGlobalContext } from "@/global-context";
import { useRouter } from "next/router";
import { useGlobalSnackbar } from "@/hooks/useSnackbar";

const mobileInitialValues: IMobileFormValues = {
  mobile: "",
};

const otpInitialValues: IOtpFormValues = {
  otp: "",
};

const mobileValidationSchema = Yup.object({
  mobile: Yup.string()
    .matches(/^[6-9][0-9]{9}$/, "Please enter a valid 10-digit Indian mobile number")
    .required("Mobile number is required"),
});

const otpValidationSchema = Yup.object({
  otp: Yup.string()
    .matches(/^[0-9]{6}$/, "OTP must be 6 digits")
    .required("OTP is required"),
});

const LogInForm = () => {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const snackbar = useGlobalSnackbar();
  const { setState, fetchProfile } = useGlobalContext();
  const router = useRouter();
  const theme = useTheme();

  // Timer for resend OTP
  useState(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  });

  const handleMobileSubmit = async (values: IMobileFormValues) => {
    setIsLoading(true);
    try {
      const { data } = await sendOtpApi({ phoneNo: values?.mobile });
      if (data?.status) {
        snackbar.success(data?.message + " " + data?.data?.otp);
        setIsOtpSent(true);
        setMobileNumber(values.mobile);
        setResendTimer(30); // 30 seconds timer
      }
    } catch (error) {
      snackbar.error("Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (values: IOtpFormValues) => {
    setIsLoading(true);
    try {
      const { data } = await verifyOtpApi({ otp: values?.otp, phoneNo: mobileNumber });

      if (data?.status) {
        localStorage.setItem("authToken", data?.data?.token);
        setState({ userData: { ...data?.data, isLoggedIn: true } });
        fetchProfile();
        snackbar.error(data?.message);
        if (data?.data?.verified) {
          router.push("/");
        } else {
          router.push('/create-profile');
        }
      }
    } catch (error) {
      snackbar.error("Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendTimer === 0) {
      await handleMobileSubmit({ mobile: mobileNumber });
    }
  };

  const handleChangeNumber = () => {
    setIsOtpSent(false);
    setMobileNumber("");
    setResendTimer(0);
  };

  return (
    <Box
      className="gradient-background"
    >
      <Container maxWidth="sm">
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          minHeight="93vh"
          // py={4}
          position="relative"
          zIndex={1}
        >
          <Grow in timeout={800}>
            <Paper
              elevation={3}
              className="paper-card"
            >
              {/* Logo/Icon */}
              <Box display="flex" justifyContent="center" mb={3}>
                <Box className="logo-icon-box">
                  <PhoneIcon />
                </Box>
              </Box>

              {/* Title */}
              <Typography
                variant="h4"
                component="h1"
                fontWeight="bold"
                textAlign="center"
                mb={1}
                sx={{ letterSpacing: '-0.01562em' }}
              >
                Welcome Back
              </Typography>

              <Typography
                variant="subtitle1"
                textAlign="center"
                color="text.secondary"
                mb={4}
              >
                Sign in with your phone number
              </Typography>

              {!isOtpSent ? (
                <Fade in timeout={500}>
                  <Box>
                    <Formik
                      initialValues={mobileInitialValues}
                      validationSchema={mobileValidationSchema}
                      onSubmit={handleMobileSubmit}
                    >
                      {({ handleChange, values, touched, errors }) => (
                        <Form>
                          <Stack spacing={3}>
                            <TextField
                              id="mobile"
                              name="mobile"
                              label="Mobile Number"
                              variant="outlined"
                              fullWidth
                              value={values.mobile}
                              onChange={handleChange}
                              error={touched.mobile && Boolean(errors.mobile)}
                              helperText={touched.mobile && errors.mobile}
                              placeholder="Enter 10-digit number"
                              disabled={isLoading}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <Typography color="text.secondary">+91</Typography>
                                  </InputAdornment>
                                ),
                              }}
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  '&:hover fieldset': {
                                    borderColor: theme.palette.primary.main,
                                  },
                                },
                              }}
                            />

                            <Button
                              type="submit"
                              variant="gradient"
                              fullWidth
                              size="large"
                              disabled={isLoading}

                            >
                              {isLoading ? (
                                <CircularProgress size={24} color="inherit" />
                              ) : (
                                'Send OTP'
                              )}
                            </Button>
                          </Stack>
                        </Form>
                      )}
                    </Formik>
                  </Box>
                </Fade>
              ) : (
                <Fade in timeout={500}>
                  <Box>
                    <Formik
                      initialValues={otpInitialValues}
                      validationSchema={otpValidationSchema}
                      onSubmit={handleOtpSubmit}
                    >
                      {({ handleChange, values, touched, errors }) => (
                        <Form>
                          <Stack spacing={3}>
                            {/* Show verified number */}
                            <Box
                              sx={{
                                p: 2,
                                borderRadius: 2,
                                bgcolor: 'action.hover',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                              }}
                            >
                              <CheckCircleIcon color="success" fontSize="small" />
                              <Typography variant="body2">
                                OTP sent to <strong>+91 {mobileNumber}</strong>
                              </Typography>
                            </Box>

                            <TextField
                              id="otp"
                              name="otp"
                              label="Enter 6-digit OTP"
                              variant="outlined"
                              fullWidth
                              value={values.otp}
                              onChange={handleChange}
                              error={touched.otp && Boolean(errors.otp)}
                              helperText={touched.otp && errors.otp}
                              disabled={isLoading}
                              inputProps={{
                                maxLength: 6,
                                style: { textAlign: 'center', letterSpacing: '0.5em' }
                              }}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <LockIcon color="action" />
                                  </InputAdornment>
                                ),
                              }}
                            />

                            <Button
                              type="submit"
                              variant="gradient"
                              fullWidth
                              size="large"
                              disabled={isLoading}

                            >
                              {isLoading ? (
                                <CircularProgress size={24} color="inherit" />
                              ) : (
                                'Verify OTP'
                              )}
                            </Button>

                            {/* Resend OTP and Change Number */}
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                              <Button
                                size="small"
                                onClick={handleResendOtp}
                                disabled={resendTimer > 0 || isLoading}
                                sx={{ textTransform: 'none' }}
                              >
                                {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend OTP'}
                              </Button>

                              <Button
                                size="small"
                                onClick={handleChangeNumber}
                                disabled={isLoading}
                                sx={{ textTransform: 'none' }}
                              >
                                Change Number
                              </Button>
                            </Stack>
                          </Stack>
                        </Form>
                      )}
                    </Formik>
                  </Box>
                </Fade>
              )}

              {/* Terms */}
              <Typography
                variant="caption"
                display="block"
                textAlign="center"
                color="text.secondary"
                mt={4}
                sx={{ lineHeight: 1.6 }}
              >
                By continuing, you agree to our{' '}
                <Typography
                  component="a"
                  href="/terms"
                  color="primary"
                  sx={{
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' }
                  }}
                >
                  Terms of Service
                </Typography>
                {' and '}
                <Typography
                  component="a"
                  href="/privacy"
                  color="primary"
                  sx={{
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' }
                  }}
                >
                  Privacy Policy
                </Typography>
              </Typography>
            </Paper>
          </Grow>
        </Box>
      </Container>
    </Box>
  );
};
export default LogInForm;