// pages/CreateProfileForm.tsx

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button, Typography, Box, Stack } from "@mui/material";
import { useState } from "react";
import { createProfileApi } from "@/pages/create-profile/apis";
import { ICreateProfilePayLoad } from "@/types/user";
import { useGlobalContext } from "@/global-context";
import { useRouter } from "next/router";
import generateSignedUrl from "@/utils/generateSignedUrl";
import DynamicFormRenderer from "@/custom-component/CustomizedSchemaBasedForm/DynamicFormRenderer";
import { createProfileFormSchema } from "@/pages/create-profile/data";

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
  // profileImage: Yup.string().required("Image URL is required"),
});

const CreateProfileForm = () => {
  const { state, setState } = useGlobalContext();
  const [submitted, setSubmitted] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const router = useRouter();

  const handleSubmit = async (values: ICreateProfilePayLoad) => {
    console.log(values);
    const result = await generateSignedUrl({
      entity: "profile",
      file: selectedFiles[0],
    });
    if (result.publicUrl) {
      const { data } = await createProfileApi({ ...values, profileImage: result?.publicUrl });

      if (data?.status) {
        setState({ userData: { ...state?.userData, ...data?.data } });
        router.push("/");
      }
    }
  };

  console.log(
    process.env.NEXT_PUBLIC_API_URL,
    "process.env.NEXT_PUBLIC_API_URL"
  );

  return (
    <Box maxWidth="sm" mt={8} mx="auto">
      <Box className="p-8 xs:shadow-none md:shadow-md rounded-lg bg-white">
        <Typography
          variant="h4"
          className="text-center mb-6 font-semibold text-gray-700"
        >
          Create Profile
        </Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, values, touched, errors, setFieldValue }) => (
            <Form>
              <Stack spacing={3}>
                <DynamicFormRenderer
                  schema={createProfileFormSchema}
                  values={values}
                  touched={touched}
                  errors={errors}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                  setLocation={() => { }} // Not needed for profile form
                  setSelectedFiles={setSelectedFiles}
                />

                <Button variant="contained" color="primary" type="submit" size="large" fullWidth>
                  Create Profile
                </Button>

                {submitted && (
                  <Typography
                    variant="body1"
                    color="success.main"
                    sx={{ mt: 2, textAlign: 'center' }}
                  >
                    Profile Created Successfully!
                  </Typography>
                )}
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default CreateProfileForm;
