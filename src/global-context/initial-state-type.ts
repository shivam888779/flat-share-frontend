import { IUserData } from "@/types/user";
import { IPropertyDetails, IRequirement, SearchPropertyCard } from "@/types/property";
import { IUserNotification } from "@/types/notifications";
import { IConnection } from "@/types/connection";
import { IChatRoom } from "@/types/chat";

export interface ISearchPayload {
    lng: number;
    lat: number;
    radiusKm: number;
    priceRange?: [number, number];
    lookingFor?: string; // gender filter
    propertyType?: string[]; // flat, flatMate
    filters?: any; // Additional filters can be added here
}

export interface IInitialState {
    userData: IUserData;
    highLights: IRequirement[];
    resources: IRequirement[];
    preferences: IRequirement[];
    notifications: IUserNotification[]
    connections: IConnection[]
    chatRooms: IChatRoom[]
    myProperty: IPropertyDetails | null
    openLoginDialog: boolean
    // Property listing cache
    propertyList: SearchPropertyCard[];
    searchPayload: ISearchPayload | null;
    isPropertyListLoading: boolean;
}