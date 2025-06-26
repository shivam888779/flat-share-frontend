import { IUserData } from "@/types/user";
import { IRequirement } from "@/types/property";

export interface IInitialState {
    userData: IUserData;
    highLights: IRequirement[];
    resources: IRequirement[];
    preferences: IRequirement[];
}