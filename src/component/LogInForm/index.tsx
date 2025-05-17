// pages/login.tsx

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button, TextField, Typography, Divider, Box, IconButton } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { useState } from "react";
import { sendOtpApi, verifyOtpApi } from "@/pages/login/apis";
import { ILoginFormValues, IMobileFormValues, IOtpFormValues } from "@/types/user";
import { useGlobalContext } from "@/global-context";
import { useRouter } from "next/router";
import Link from "next/link";



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

  const { state, setState } = useGlobalContext();

  const router = useRouter()


  const handleEmailSubmit = (values: ILoginFormValues) => {
    console.log("Email Login Data", values);
  };

  const handleMobileSubmit = async (values: IMobileFormValues) => {
    console.log("Mobile Login Data", values);
    const { data } = await sendOtpApi({ phoneNo: values?.mobile })
    console.log(data)
    if (data?.status) {
      setIsOtpSent(true);
    }
    setMobileNumber(values.mobile);
  };

  const handleOtpSubmit = async (values: IOtpFormValues) => {
    console.log("OTP Verified for Mobile:", mobileNumber);
    const { data } = await verifyOtpApi({ otp: values?.otp, phoneNo: mobileNumber })
    console.log(data)

    if (data?.status) {
      localStorage.setItem("authToken", data?.data?.token)
      setState({ userData: data?.data })
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
    <Box maxWidth={"sm"} mt={{ xs: 12, md: 8 }} mx="auto">
      <Box className="mt-16 p-8 shadow-xl max-sm:shadow-none rounded-lg bg-white">
        <Typography variant="h4" className="text-center mb-6 font-semibold text-gray-700">
          Welcome Back!
        </Typography>

        <div className="flex justify-center mb-6">
          <IconButton onClick={() => setIsEmailLogin(true)} className={`mr-4 ${isEmailLogin ? "bg-blue-500" : ""}`}>
            <EmailIcon className={`text-3xl ${isEmailLogin ? "text-white" : "text-gray-500"}`} />
          </IconButton>
          <IconButton onClick={() => setIsEmailLogin(false)} className={`${!isEmailLogin ? "bg-blue-500" : ""}`}>
            <PhoneIcon className={`text-3xl ${!isEmailLogin ? "text-white" : "text-gray-500"}`} />
          </IconButton>
        </div>

        <Divider className="mb-6" />

        {isEmailLogin ? (
          <Formik
            initialValues={emailInitialValues}
            validationSchema={emailValidationSchema}
            onSubmit={handleEmailSubmit}
          >
            {({ handleChange, values, touched, errors }) => (
              <Form>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
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
                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
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
                <div className="text-center mb-4">
                  <Button type="submit" variant="contained" fullWidth color="primary" className="py-2 text-lg">
                    Login with Email
                  </Button>
                </div>
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
                <div className="mb-4">
                  <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                    Enter OTP
                  </label>
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
                <div className="text-center mb-4">
                  <Button type="submit" variant="contained" fullWidth color="primary" className="py-2 text-lg">
                    Verify OTP
                  </Button>
                </div>
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
                <div className="mb-4">
                  <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
                    Mobile Number
                  </label>
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
                <div className="text-center mb-4">
                  <Button type="submit" variant="contained" fullWidth color="primary" className="py-2 text-lg">
                    Send OTP
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        )}

        <Typography variant="body2" className="text-center text-gray-500 mt-6">
          Dont have an account? <Link href="/register" className="text-blue-500">Sign up here</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default LogInForm;
