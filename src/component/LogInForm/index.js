import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import { api } from '../../api-service';
import Image from 'next/image';
import { Box, Button, TextField, Typography } from '@mui/material';
import { OtpInput } from '..';

const CustomizedLogInForm = () => {
  const [showOtp, setShowOtp] = useState(false);
  const [number, setNumber] = useState(0);

  const formSchema = {
    heading: 'Sign Up',
    input: [
      {
        label: 'Name',
        name: 'name',
        type: 'text',
        id: 'name',
      },
      {
        label: 'Email',
        name: 'email',
        type: 'email',
        id: 'email',
      },
      {
        label: 'Phone Number',
        name: 'phoneNumber',
        type: 'text',
        id: 'phoneNumber',
      },
    ],
  };

  useEffect(() => {
    api
      .post('/auth/signup', { name: 'kgjb', email: 'fkjfb', phoneNumber: 'fkbjoi' })
      .then((res) => console.log(res));
  }, []);

  return (
    <Box
      height={'100vh'}
      width={'100vw'}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Image
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          margin: '0 auto',
        }}
        src="/background/anylearn-deco.svg"
        height={800}
        width={1200}
        alt="home decoration circle"
      />

      <Box
        zIndex={10}
        display={'flex'}
        justifyContent={'space-between'}
        width={'60%'}
        height={'70%'}
        bgcolor={'#c5cfd21f;'}
        borderRadius={3}
      >
        <Box p={5} width={'70%'}>
          <Typography variant="h1" mb={4}>
            {formSchema?.heading}
          </Typography>
          {showOtp ? (
            <OtpInput length={6} phoneNumber = {number} onComplete={() => console.log('hello')} />
          ) : (
            <Formik
              initialValues={{
                name: '',
                email: '',
                phoneNumber: '',
              }}
              validationSchema={Yup.object({
                name: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
                phoneNumber: Yup.string()
                  .matches(/^\d{10,12}$/, 'Must be between 10 and 12 digits')
                  .required('Required'),
                email: Yup.string().email('Invalid email address').required('Required'),
              })}
              onSubmit={(values) => {
                api.post('/auth/signup', { ...values})
                .then((res) => console.log(res));
                setNumber(values?.number)
                 setShowOtp(true)
              }
            }
            >
              {({ values, handleChange, handleBlur, errors, touched }) => (
                <Form>
                  {formSchema?.input?.map(({ label, name, id, type }, index) => (
                    <TextField
                      key={index}
                      type={type}
                      fullWidth
                      id={id}
                      name={name}
                      label={label}
                      value={values[name]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched[name] && Boolean(errors[name])}
                      helperText={touched[name] && errors[name]}
                      margin="normal"
                    />
                  ))}
                  <Box mt={2}>
                    <Button variant="contained" type="submit">
                      {formSchema?.heading}
                    </Button>
                    <br />
                    or <br />
                    <Button variant="text" onClick={() => setShowOtp(true)}>
                      Log in with phone number
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          )}
        </Box>
        <img
          style={{ borderRadius: 3, width: '50%' }}
          src="https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
          alt="Background"
        />
      </Box>
    </Box>
  );
};

export default CustomizedLogInForm;
