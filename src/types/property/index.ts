export interface ILocation {
    address: string;
    latitude?: number;
    longitude?: number;
  }

export interface IPropertyUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string | null;
  password: string | null;
  phoneNo: string;
  gender: string; // You could tighten this to 'Male' | 'Female' if values are fixed
  description: string | null;
  profileImage: string;
  requirementListed: boolean;
  createdAt: string; // ISO date-time string
  updatedAt: string; // ISO date-time string
}

export interface IPropertyDetails {
  id: number;
  userId: number;
  location: ILocation;
  description: string;
  security: number | null;
  availableFrom: string; // ISO date string
  rent: number;
  deposit: number;
  mobile: string;
  isZeroDeposit: boolean | null;
  partnerGender: 'male' | 'female' | 'any'; // or just `string` if values are dynamic
  typeId: number | null;
  highLights: number[];
  resources: number[];
  preferences: number[];
  images: string[] | null;
  occupancy : string;
  userResponse: IPropertyUser;
}

export  interface IPropertyFormValues {
    typeId: number;
    rent: number|null; 
    deposit: number|null;
    resources: number[];
    preferences: number[];
    highLights: number[];
    availableFrom: string;
    description: string;
    partnerGender: string;
}
export  interface IPropertyListSearch {
    lat:number,
    lng:number,
    radiusKm:number
}

export interface SearchPropertyCard {
  address: string;
  userName: string;
  userImage: string;
  rent: number;
  matchPercentage: number | null;
  slug: string;
  listedOn: string; // ISO date-time string like "2025-06-22T17:44:35.084+00:00"
  phoneNo: string;
  distance: number;
  typeId: number;
  partnerGender: 'male' | 'female' | 'any'; // assuming these are the only values
}

export interface IRequirement {
  id: number;
  name: string;
  imgSrc: string;
}
