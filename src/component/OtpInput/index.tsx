import { Button, TextField, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import {api}  from "../../api-service"


// declare type for the props


type InputProps = {
  length?: number;
  phoneNumber ?:number;
  onComplete: (pin: string) => void;
};


const OTPInput = ({ length = 4, onComplete,phoneNumber }: InputProps) => {
  // if you're not using Typescript, simply do const inputRef = useRef()

  useEffect(()=>{
    api.post("/otp/send-otp",{phoneNumber:phoneNumber})
  },[phoneNumber])

  const inputRef = useRef<any>(Array(length).fill(null));


  // if you're not using Typescript, do useState()
  const [OTP, setOTP] = useState<string[]>(Array(length).fill(''));


  const handleTextChange = (input: string, index: number) => {
    const newPin = [...OTP];
    newPin[index] = input;
    setOTP(newPin);


    // check if the user has entered the first digit, if yes, automatically focus on the next input field and so on.


    if (input.length === 1 && index < length - 1) {
      inputRef.current[index + 1]?.focus();
    }


    if (input.length === 0 && index > 0) {
      inputRef.current[index - 1]?.focus();
    }


    // if the user has entered all the digits, grab the digits and set as an argument to the onComplete function.


    if (newPin.every((digit) => digit !== '')) {
      onComplete(newPin.join(''));
      api.post("/otp/verify-otp",{otp:newPin.join('')})
    }
  };


  // return the inputs component


  return (
    <div className='h-full flex flex-col justify-evenly'> 
    <Typography variant='h3' >Enter OTP for mobile number +9459855858</Typography>
    <div className={`grid grid-cols-6 gap-5 mt-6`}>
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={OTP[index]}
          onChange={(e) => handleTextChange(e.target.value, index)}
          ref={(ref) => (inputRef.current[index] = ref as any)}
          className={`border border-solid max-w-16 border-border-slate-500 text-center text-3xl rounded-lg focus:border-blue-600  p-3  outline-none`}
          
        />
      ))}
    </div>
    <div className=''>
    <Button variant='contained' color='primary' className='mt-6' >Verify OTP</Button>
    <Button variant='text' color='primary' className='mt-6 ml-4' >Resend OTP</Button>
    </div>
    </div>
  );
};


export default  OTPInput;