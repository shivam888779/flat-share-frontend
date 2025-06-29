export interface IRequestConnection {
    message:string,
    receiverId : number
}

export interface IConnection {
    id: number;
    requesterId: number;
    receiverId: number;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    message?: string;
    createdAt?: string;
    updatedAt?: string;
    user1?: {
        id: number;
        name: string;
        email: string;
        profilePicture?: string;
    };
    user2?: {
        id: number;
        name: string;
        email: string;
        profilePicture?: string;
    };
}