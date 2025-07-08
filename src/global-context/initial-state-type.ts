import { IUserData } from "@/types/user";
import { IRequirement } from "@/types/property";
import { IUserNotification } from "@/types/notifications";
import { IConnection } from "@/types/connection";
import { IChatRoom } from "@/types/chat";

export interface IInitialState {
    userData: IUserData;
    highLights: IRequirement[];
    resources: IRequirement[];
    preferences: IRequirement[];
    notifications:IUserNotification[]
    connections:IConnection[]
    chatRooms:IChatRoom[]
}