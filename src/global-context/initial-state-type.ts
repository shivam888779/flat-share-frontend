import { IUserData } from "@/types/user";
import { IRequirement } from "@/types/property";
import { IUserNotification } from "@/types/notifications";

export interface IInitialState {
    userData: IUserData;
    highLights: IRequirement[];
    resources: IRequirement[];
    preferences: IRequirement[];
    notifications:IUserNotification[]
}