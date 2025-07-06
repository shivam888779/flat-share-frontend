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
    requester: any;
    receiver: any;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    message?: string;
    createdAt?: string;
    updatedAt?: string;
    user1?: {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        profilePicture?: string;
    };
    user2?: {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        profilePicture?: string;
    };
}