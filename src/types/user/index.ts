export interface ISendOTPPayLoad {
    phoneNo: string
}
export interface IVerifyOTPPayLoad {
    phoneNo: string;
    otp: string;
}
export interface ICreateProfilePayLoad {
      firstName: string;
    lastName: string;
    gender: 'Male' | 'Female' | 'Other'; 
    profileImage: string;
}

export interface IUserData {
    id: number;
    firstName: string;
    lastName: string;
    email: string | null;
    phoneNo: string;
    gender: 'Male' | 'Female' | 'Other'; 
    description: string | null;
    profileImage: string;
    createdAt: string; 
    updatedAt: string; 
    token : string;
    verified:boolean;
    isLoggedIn:boolean;
}
export interface ILoginFormValues {
  email: string;
  password: string;
}

export interface IMobileFormValues {
  mobile: string;
}

export interface IOtpFormValues {
  otp: string;
}

