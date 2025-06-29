export interface IUserNotification {
    id: number;
    userId: number;
    title: string;
    message: string;
    type: 'CONTACT_REQUEST' | string; // Extend with other types if needed
    isRead: boolean;
    relatedId: number;
    createdAt: string; // ISO string format
  }
  