// pages/login.tsx

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button, TextField, Typography, Divider, Box, IconButton, Stack, InputLabel } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { useState } from "react";
import { sendOtpApi, verifyOtpApi } from "@/api/auth";
import { ILoginFormValues, IMobileFormValues, IOtpFormValues } from "@/types/user";
import { useGlobalContext } from "@/global-context";
import { useRouter } from "next/router";
import Link from "next/link";
import { useGlobalSnackbar } from "@/hooks/useSnackbar";

 

const emailInitialValues: ILoginFormValues = {
  email: "",
  password: "",
};

const mobileInitialValues: IMobileFormValues = {
  mobile: "",
};

const otpInitialValues: IOtpFormValues = {
  otp: "",
};

const emailValidationSchema = Yup.object({
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const mobileValidationSchema = Yup.object({
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
    .required("Mobile number is required"),
});

const otpValidationSchema = Yup.object({
  otp: Yup.string()
    .matches(/^[0-9]{6}$/, "OTP must be 6 digits")
    .required("OTP is required"),
});

const LogInForm = () => {
  const [isEmailLogin, setIsEmailLogin] = useState(true);
  const [isOtpSent, setIsOtpSent] = useState(false); // Track if OTP is sent
  const [mobileNumber, setMobileNumber] = useState(""); // Store mobile number for OTP verification
   const snackbar = useGlobalSnackbar();
  const { state, setState,fetchProfile } = useGlobalContext();

  const router = useRouter()


  const handleEmailSubmit = (values: ILoginFormValues) => {
    console.log("Email Login Data", values);
  };

  const handleMobileSubmit = async (values: IMobileFormValues) => {
    console.log("Mobile Login Data", values);
    const { data } = await sendOtpApi({ phoneNo: values?.mobile })
    if (data?.status) {
      snackbar.success(data?.message+" "+data?.data?.otp)
      setIsOtpSent(true);
    }

    setMobileNumber(values.mobile);
  };

  const handleOtpSubmit = async (values: IOtpFormValues) => {
    console.log("OTP Verified for Mobile:", mobileNumber);
    const { data } = await verifyOtpApi({ otp: values?.otp, phoneNo: mobileNumber })

    if (data?.status) {
      localStorage.setItem("authToken", data?.data?.token)
      console.log(data?.data)
      setState({ userData: {...data?.data, isLoggedIn: true} })
      fetchProfile()
      if (data?.data?.verified) {
        router.push("/")
      }
      else {
        router.push('/create-profile')
      }
    }
    // Handle OTP verification logic
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      px={{ xs: 2, sm: 4, md: 8 }}
    >
      <Box
        width="100%"
        maxWidth="sm"
        p={{ xs: 2, sm: 4, md: 6 }}
        boxShadow={{ xs: "none", sm: "xl" }}
        borderRadius="lg"
        bgcolor="background.paper"
      >
        <Typography variant="h3" component="h1" fontWeight="bold" textAlign="center" mb={2} color="text.primary">
          Welcome Back!
        </Typography>
        <Typography variant="subtitle1" textAlign="center" color="text.secondary" mb={4}>
          Sign in to continue
        </Typography>

        <Stack direction="row" spacing={2} justifyContent="center" mb={4}>
          <Button
            variant={isEmailLogin ? "contained" : "outlined"}
            onClick={() => setIsEmailLogin(true)}
            startIcon={<EmailIcon />}
          >
            Email
          </Button>
          <Button
            variant={!isEmailLogin ? "contained" : "outlined"}
            onClick={() => setIsEmailLogin(false)}
            startIcon={<PhoneIcon />}
          >
            Phone
          </Button>
        </Stack>
        {isEmailLogin ? (
          <Formik
            initialValues={emailInitialValues}
            validationSchema={emailValidationSchema}
            onSubmit={handleEmailSubmit}
          >
            {({ handleChange, values, touched, errors }) => (
              <Form>
                <InputLabel shrink htmlFor="bootstrap-input">
                  Email
                </InputLabel>
                <TextField
                  id="email"
                  name="email"
                  variant="outlined"
                  fullWidth
                  value={values.email}
                  onChange={handleChange}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
                <InputLabel shrink htmlFor="bootstrap-input">
                  Password
                </InputLabel>
                <TextField
                  id="password"
                  name="password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  value={values.password}
                  onChange={handleChange}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
                <Button type="submit" variant="contained" fullWidth color="primary" size="large">
                  Login with Email
                </Button>
              </Form>
            )}
          </Formik>
        ) : isOtpSent ? (
          // OTP Form
          <Formik
            initialValues={otpInitialValues}
            validationSchema={otpValidationSchema}
            onSubmit={handleOtpSubmit}
          >
            {({ handleChange, values, touched, errors }) => (
              <Form>
                <Stack spacing={3}>
                  <TextField
                    id="otp"
                    name="otp"
                    label="Enter OTP"
                    variant="outlined"
                    fullWidth
                    value={values.otp}
                    onChange={handleChange}
                    error={touched.otp && Boolean(errors.otp)}
                    helperText={touched.otp && errors.otp}
                  />
                  <Button type="submit" variant="contained" fullWidth color="primary" size="large">
                    Verify OTP
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        ) : (
          // Mobile Login Form
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
                  />
                  <Button type="submit" variant="contained" fullWidth color="primary" size="large">
                    Send OTP
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        )}
        <Typography variant="body2" textAlign="center" mt={4}>
          Do not have an account?{" "}
          <Link href="/register" passHref>
            <Typography component="a" color="primary">
              Sign up here
            </Typography>
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default LogInForm;
