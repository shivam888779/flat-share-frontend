// pages/PropertyForm.tsx

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button, TextField, Typography, MenuItem, Box } from "@mui/material";
import { useState } from "react";

// Define the initial values and schema for the form validation
interface PropertyFormValues {
  title: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  size: string;
  furnished: string;
  rentPrice: string;
  deposit: string;
  address: string;
  neighborhood: string;
  amenities: string;
  availableDate: string;
  parking: string;
  petPolicy: string;
  description: string;
}

const initialValues: PropertyFormValues = {
  title: "",
  propertyType: "",
  bedrooms: 0,
  bathrooms: 0,
  size: "",
  furnished: "",
  rentPrice: "",
  deposit: "",
  address: "",
  neighborhood: "",
  amenities: "",
  availableDate: "",
  parking: "",
  petPolicy: "",
  description: "",
};

// Define validation schema using Yup
const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  propertyType: Yup.string().required("Property type is required"),
  bedrooms: Yup.number().min(1, "Must have at least 1 bedroom").required("Bedrooms are required"),
  bathrooms: Yup.number().min(1, "Must have at least 1 bathroom").required("Bathrooms are required"),
  size: Yup.string().required("Size is required"),
  furnished: Yup.string().required("Furnished status is required"),
  rentPrice: Yup.string().required("Rent price is required"),
  deposit: Yup.string().required("Deposit is required"),
  address: Yup.string().required("Address is required"),
  neighborhood: Yup.string().required("Neighborhood is required"),
  amenities: Yup.string().required("Amenities are required"),
  availableDate: Yup.string().required("Available date is required"),
  parking: Yup.string().required("Parking status is required"),
  petPolicy: Yup.string().required("Pet policy is required"),
  description: Yup.string().required("Description is required"),
});

const PropertyForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (values: PropertyFormValues) => {
    console.log("Property Details", values);
    setSubmitted(true);
  };

  return (
    <Box maxWidth="md" mt={8} mx="auto">
      <Box className="p-8 shadow-xl rounded-lg bg-white">
        <Typography variant="h4" className="text-center mb-6 font-semibold text-gray-700">
          List Your Property
        </Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, values, touched, errors }) => (
            <Form>
              <div className="mb-4">
                <label className="font-semibold">Property Title</label>
                <TextField
                  name="title"
                  variant="outlined"
                  fullWidth
                  value={values.title}
                  onChange={handleChange}
                  error={touched.title && Boolean(errors.title)}
                  helperText={touched.title && errors.title}
                />
              </div>

              <div className="mb-4">
                <label className="font-semibold">Property Type</label>
                <TextField
                  select
                  name="propertyType"
                  variant="outlined"
                  fullWidth
                  value={values.propertyType}
                  onChange={handleChange}
                  error={touched.propertyType && Boolean(errors.propertyType)}
                  helperText={touched.propertyType && errors.propertyType}
                >
                  <MenuItem value="Apartment">Apartment</MenuItem>
                  <MenuItem value="House">House</MenuItem>
                  <MenuItem value="Villa">Villa</MenuItem>
                  <MenuItem value="Studio">Studio</MenuItem>
                </TextField>
              </div>

              <div className="mb-4 grid grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold">Bedrooms</label>
                  <TextField
                    name="bedrooms"
                    type="number"
                    variant="outlined"
                    fullWidth
                    value={values.bedrooms}
                    onChange={handleChange}
                    error={touched.bedrooms && Boolean(errors.bedrooms)}
                    helperText={touched.bedrooms && errors.bedrooms}
                  />
                </div>
                <div>
                  <label className="font-semibold">Bathrooms</label>
                  <TextField
                    name="bathrooms"
                    type="number"
                    variant="outlined"
                    fullWidth
                    value={values.bathrooms}
                    onChange={handleChange}
                    error={touched.bathrooms && Boolean(errors.bathrooms)}
                    helperText={touched.bathrooms && errors.bathrooms}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="font-semibold">Size (in sq. ft.)</label>
                <TextField
                  name="size"
                  variant="outlined"
                  fullWidth
                  value={values.size}
                  onChange={handleChange}
                  error={touched.size && Boolean(errors.size)}
                  helperText={touched.size && errors.size}
                />
              </div>

              <div className="mb-4">
                <label className="font-semibold">Furnished</label>
                <TextField
                  select
                  name="furnished"
                  variant="outlined"
                  fullWidth
                  value={values.furnished}
                  onChange={handleChange}
                  error={touched.furnished && Boolean(errors.furnished)}
                  helperText={touched.furnished && errors.furnished}
                >
                  <MenuItem value="Furnished">Furnished</MenuItem>
                  <MenuItem value="Unfurnished">Unfurnished</MenuItem>
                  <MenuItem value="Semi-Furnished">Semi-Furnished</MenuItem>
                </TextField>
              </div>

              <div className="mb-4">
                <label className="font-semibold">Rent Price</label>
                <TextField
                  name="rentPrice"
                  variant="outlined"
                  fullWidth
                  value={values.rentPrice}
                  onChange={handleChange}
                  error={touched.rentPrice && Boolean(errors.rentPrice)}
                  helperText={touched.rentPrice && errors.rentPrice}
                />
              </div>

              <div className="mb-4">
                <label className="font-semibold">Deposit</label>
                <TextField
                  name="deposit"
                  variant="outlined"
                  fullWidth
                  value={values.deposit}
                  onChange={handleChange}
                  error={touched.deposit && Boolean(errors.deposit)}
                  helperText={touched.deposit && errors.deposit}
                />
              </div>

              <div className="mb-4">
                <label className="font-semibold">Address</label>
                <TextField
                  name="address"
                  variant="outlined"
                  fullWidth
                  value={values.address}
                  onChange={handleChange}
                  error={touched.address && Boolean(errors.address)}
                  helperText={touched.address && errors.address}
                />
              </div>

            

              <div className="mb-4">
                <label className="font-semibold">Amenities</label>
                <TextField
                  name="amenities"
                  variant="outlined"
                  fullWidth
                  value={values.amenities}
                  onChange={handleChange}
                  error={touched.amenities && Boolean(errors.amenities)}
                  helperText={touched.amenities && errors.amenities}
                />
              </div>

              <div className="mb-4">
                <label className="font-semibold">Available Date</label>
                <TextField
                  name="availableDate"
                  type="date"
                  variant="outlined"
                  fullWidth
                  value={values.availableDate}
                  onChange={handleChange}
                  error={touched.availableDate && Boolean(errors.availableDate)}
                  helperText={touched.availableDate && errors.availableDate}
                  InputLabelProps={{ shrink: true }}
                />
              </div>

              <div className="mb-4">
                <label className="font-semibold">Parking</label>
                <TextField
                  name="parking"
                  variant="outlined"
                  fullWidth
                  value={values.parking}
                  onChange={handleChange}
                  error={touched.parking && Boolean(errors.parking)}
                  helperText={touched.parking && errors.parking}
                />
              </div>

              <div className="mb-4">
                <label className="font-semibold">Pet Policy</label>
                <TextField
                  name="petPolicy"
                  variant="outlined"
                  fullWidth
                  value={values.petPolicy}
                  onChange={handleChange}
                  error={touched.petPolicy && Boolean(errors.petPolicy)}
                  helperText={touched.petPolicy && errors.petPolicy}
                />
              </div>

              <div className="mb-4">
                <label className="font-semibold">Description</label>
                <TextField
                  name="description"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  value={values.description}
                  onChange={handleChange}
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                />
              </div>

              <div className="flex justify-center">
                <Button variant="contained" color="primary" type="submit">
                  Submit Property
                </Button>
              </div>

              {submitted && (
                <Typography variant="body1" className="text-green-500 mt-4 text-center">
                  Property Listed Successfully!
                </Typography>
              )}
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default PropertyForm;
