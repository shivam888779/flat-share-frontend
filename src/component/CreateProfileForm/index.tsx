// pages/CreateProfileForm.tsx

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button, TextField, Typography, MenuItem, Box } from "@mui/material";
import { useState } from "react";
import { createProfileApi } from "@/pages/create-profile/apis";
import { ICreateProfilePayLoad } from "@/types/user";
import { useGlobalContext } from "@/global-context";
import { useRouter } from "next/router";
import ImageUpload from "../ImageUpload";



// Initial values
const initialValues: ICreateProfilePayLoad = {
  firstName: "",
  lastName: "",
  gender: "Male",
  profileImage: "",
};

// Validation schema
const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  gender: Yup.string().required("Gender is required"),
  profileImage: Yup.string().required("Image URL is required"),
});

const CreateProfileForm = () => {

    const {state,setState} = useGlobalContext()
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter()

  const handleSubmit = async (values:  ICreateProfilePayLoad) => {
    const {data} = await createProfileApi(values)
    if (data?.status) {
      setState({userData:{...state?.userData,...data?.data}})
      
        router.push("/")
      
      
    }
  };

  console.log(process.env.NEXT_PUBLIC_API_URL,"process.env.NEXT_PUBLIC_API_URL")

  return (
    <Box maxWidth="sm" mt={8} mx="auto">
      <Box className="p-8 shadow-xl rounded-lg bg-white">
        <Typography variant="h4" className="text-center mb-6 font-semibold text-gray-700">
          Create Profile
        </Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, values, touched, errors }) => (
            <Form>
              <div className="mb-4">
                <label className="font-semibold">First Name</label>
                <TextField
                  name="firstName"
                  variant="outlined"
                  fullWidth
                  value={values.firstName}
                  onChange={handleChange}
                  error={touched.firstName && Boolean(errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                />
              </div>

              <div className="mb-4">
                <label className="font-semibold">Last Name</label>
                <TextField
                  name="lastName"
                  variant="outlined"
                  fullWidth
                  value={values.lastName}
                  onChange={handleChange}
                  error={touched.lastName && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                />
              </div>

              <div className="mb-4">
                <label className="font-semibold">Gender</label>
                <TextField
                  select
                  name="gender"
                  variant="outlined"
                  fullWidth
                  value={values.gender}
                  onChange={handleChange}
                  error={touched.gender && Boolean(errors.gender)}
                  helperText={touched.gender && errors.gender}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>
              </div>

              <div className="mb-4">
                {/* <label className="font-semibold">Image URL</label>
                <TextField
                  name="profileImage"
                  variant="outlined"
                  fullWidth
                  value={values.profileImage}
                  onChange={handleChange}
                  error={touched.profileImage && Boolean(errors.profileImage)}
                  helperText={touched.profileImage && errors.profileImage}
                /> */}
                <ImageUpload entity="profile" onUploadSuccess={()=>{console.log("uploaded")}} key={"7888"}/>
              </div>

              <div className="flex justify-center">
                <Button variant="contained" color="primary" type="submit">
                  Create Profile
                </Button>
              </div>

              {submitted && (
                <Typography variant="body1" className="text-green-500 mt-4 text-center">
                  Profile Created Successfully!
                </Typography>
              )}
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default CreateProfileForm;
