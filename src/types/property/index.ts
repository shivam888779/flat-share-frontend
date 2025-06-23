export interface ILocation {
    address: string;
    latitude?: number;
    longitude?: number;
  }

export  interface IPropertyFormValues {
    typeId: number;
    rent: number;
    deposit: number;
    resources: number[];
    preferences: number[];
    highLights: number[];
    availableFrom: string;
    description: string;
    partnerGender: string;
}