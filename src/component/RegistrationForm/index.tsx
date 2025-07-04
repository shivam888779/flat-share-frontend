// pages/register.tsx

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button, TextField, Typography, Divider, Box, IconButton, InputLabel, Stack } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { useState } from "react";
import Link from "next/link";

interface SignUpFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

interface MobileFormValues {
  mobile: string;
}

interface OtpFormValues {
  otp: string;
}

const emailInitialValues: SignUpFormValues = {
  email: "",
  password: "",
  confirmPassword: "",
};

const mobileInitialValues: MobileFormValues = {
  mobile: "",
};

const otpInitialValues: OtpFormValues = {
  otp: "",
};

const emailValidationSchema = Yup.object({
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Please confirm your password"),
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

const RegisterForm = () => {
  const [isEmailSignUp, setIsEmailSignUp] = useState(true);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");

  const handleEmailSubmit = (values: SignUpFormValues) => {
    console.log("Email Registration Data", values);
    // Registration logic for email
  };

  const handleMobileSubmit = (values: MobileFormValues) => {
    console.log("Mobile Registration Data", values);
    setIsOtpSent(true); // Simulate OTP sent
    setMobileNumber(values.mobile);
  };

  const handleOtpSubmit = (values: OtpFormValues) => {
    console.log("OTP Verified for Mobile:", mobileNumber);
    // Handle OTP verification logic
  };

  return (
    <Box maxWidth={"sm"} mt={{ xs: 12, md: 8 }} mx="auto">
      <Box className="mt-16 p-8 shadow-xl max-sm:shadow-none rounded-lg bg-white">
        <Typography variant="h4" className="text-center mb-6 font-semibold text-gray-700">
          Register an Account
        </Typography>

        <div className="flex justify-center mb-6">
          <IconButton onClick={() => setIsEmailSignUp(true)} className={`mr-4 ${isEmailSignUp ? "bg-blue-500" : ""}`}>
            <EmailIcon className={`text-3xl ${isEmailSignUp ? "text-white" : "text-gray-500"}`} />
          </IconButton>
          <IconButton onClick={() => setIsEmailSignUp(false)} className={`${!isEmailSignUp ? "bg-blue-500" : ""}`}>
            <PhoneIcon className={`text-3xl ${!isEmailSignUp ? "text-white" : "text-gray-500"}`} />
          </IconButton>
        </div>

        <Divider className="mb-6" />

        {isEmailSignUp ? (
          <Formik
            initialValues={emailInitialValues}
            validationSchema={emailValidationSchema}
            onSubmit={handleEmailSubmit}
          >
            {({ handleChange, values, touched, errors }) => (
              <Form>
                <Stack spacing={3}>
                  <div>
                    <InputLabel shrink>Email</InputLabel>
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
                  </div>
                  <div>
                    <InputLabel shrink>Password</InputLabel>
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
                  </div>
                  <div>
                    <InputLabel shrink>Confirm Password</InputLabel>
                    <TextField
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      variant="outlined"
                      fullWidth
                      value={values.confirmPassword}
                      onChange={handleChange}
                      error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                      helperText={touched.confirmPassword && errors.confirmPassword}
                    />
                  </div>
                  <Button type="submit" variant="contained" fullWidth color="primary" size="large">
                    Register with Email
                  </Button>
                </Stack>
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
                  <div>
                    <InputLabel shrink>Enter OTP</InputLabel>
                    <TextField
                      id="otp"
                      name="otp"
                      variant="outlined"
                      fullWidth
                      value={values.otp}
                      onChange={handleChange}
                      error={touched.otp && Boolean(errors.otp)}
                      helperText={touched.otp && errors.otp}
                    />
                  </div>
                  <Button type="submit" variant="contained" fullWidth color="primary" size="large">
                    Verify OTP
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        ) : (
          // Mobile Sign Up Form
          <Formik
            initialValues={mobileInitialValues}
            validationSchema={mobileValidationSchema}
            onSubmit={handleMobileSubmit}
          >
            {({ handleChange, values, touched, errors }) => (
              <Form>
                <Stack spacing={3}>
                  <div>
                    <InputLabel shrink>Mobile Number</InputLabel>
                    <TextField
                      id="mobile"
                      name="mobile"
                      variant="outlined"
                      fullWidth
                      value={values.mobile}
                      onChange={handleChange}
                      error={touched.mobile && Boolean(errors.mobile)}
                      helperText={touched.mobile && errors.mobile}
                    />
                  </div>
                  <Button type="submit" variant="contained" fullWidth color="primary" size="large">
                    Send OTP
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        )}

        <Typography variant="body2" className="text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <Link href="/login" passHref>
            <Typography component="a" color="primary">
              Log in
            </Typography>
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default RegisterForm;
