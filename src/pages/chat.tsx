import React from 'react';
import ChatComponent from '../component/ChatComponent';
import { useRouter } from 'next/router';
import { useGlobalContext } from '@/global-context';

// This page demonstrates the chat integration
const ChatPage: React.FC = () => {
  // In a real app, get these from auth/user context or query params

  const { state } = useGlobalContext();

const userId = state?.userData?.id?.toString() ?? '';
  const roomId = 'room-1';
  const token = state?.userData?.token ?? localStorage.getItem('authToken') ?? ''; // Replace with real JWT if available
  console.log(userId,state.userData)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <ChatComponent userId={userId} roomId={123} token={token} />
    </div>
  );
};

export default ChatPage; 