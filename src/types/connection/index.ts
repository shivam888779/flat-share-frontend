import { IUserData } from "../user";

export interface IRequestConnection {
    message: string,
    receiverId: number
}

export interface IConnectionFilters {
    status: "all" | typeof CONNECTION_STATUS[keyof typeof CONNECTION_STATUS];
}
export const CONNECTION_STATUS = {
    PENDING: 'PENDING',
    APPROVED: 'APPROVED',
    REJECTED: 'REJECTED',
} as const;

export interface IConnection {
    id: number;
    requesterId: number;
    receiverId: number;
    status: typeof CONNECTION_STATUS[keyof typeof CONNECTION_STATUS];
    message?: string;
    createdAt?: string;
    updatedAt?: string;
    otherUser?: IUserData

}
export interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

// Constants
export const DAYS_IN_WEEK = 7;
export const TAB_INDICES = {
    ALL: 0,
    RECEIVED: 1,
    SENT: 2,
    CONNECTED: 3,
} as const;

export interface ConnectionListProps {
    connections: IConnection[];
    currentUserId: number;
    onApprove: (connectionId: number) => void;
    onReject: (connectionId: number) => void;
    onCancel: (connectionId: number) => void;
}


export interface ConnectionCardProps {
    connection: IConnection;
    isIncoming: boolean;
    currentUserId: number;
    onApprove?: () => void;
    onReject?: () => void;
    onCancel?: () => void;
    showActions?: boolean;
}