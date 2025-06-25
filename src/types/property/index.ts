export interface ILocation {
    address: string;
    latitude?: number;
    longitude?: number;
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
