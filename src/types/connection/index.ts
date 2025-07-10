import { IUserData } from "../user";

export interface IRequestConnection {
    message: string,
    receiverId: number
}

export interface IConnectionFilters {
    status: "all" | "PENDING" | "APPROVED" | "REJECTED";
}

export interface IConnection {
    id: number;
    requesterId: number;
    receiverId: number;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    message?: string;
    createdAt?: string;
    updatedAt?: string;
    otherUser?: IUserData
   
}