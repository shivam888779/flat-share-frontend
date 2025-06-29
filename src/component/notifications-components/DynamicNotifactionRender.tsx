import React from "react";
import { useGlobalContext } from "@/global-context";
import ApproveRequestCard from "./ApproveRequest";
import { IUserNotification } from "@/types/notifications";
import { approveRequestApi, rejectRequestApi } from "@/api/connections";
import { useGlobalSnackbar } from "@/hooks/useSnackbar";

const DynamicNotifactionRender = () => {
  const { state } = useGlobalContext();
  const snackbar = useGlobalSnackbar();
  const { notifications } = state;

  const handleApprove = async (notificationId: number) => {
    
    const response = await approveRequestApi(notificationId)
    snackbar.success(response.data.message)

  };

  const handleReject = async (notificationId: number) => {
    const response = await rejectRequestApi(notificationId)
    snackbar.success(response.data.message)
  };

  const handleRequest = (notificationId: number) => {
    // handle request more info logic here
    console.log(`Requesting more info for notification ${notificationId}`);
    alert("Requested more information!");
  };

  const renderNotification = (notification: IUserNotification) => {
    switch (notification.type) {
      case 'CONTACT_REQUEST':
        return (
          <ApproveRequestCard
            key={notification.id}
            title={notification.title}
            description={notification.message}
            onApprove={() => handleApprove(notification.relatedId)}
            onReject={() => handleReject(notification.relatedId)}
            onRequest={() => handleRequest(notification.id)}
            approveLabel="Accept Contact"
            rejectLabel="Decline"
            requestLabel="Request Info"
          />
        );
      default:
        return (
          <div key={notification.id} className="p-4 border rounded-lg mb-4">
            <h3 className="font-semibold text-lg">{notification.title}</h3>
            <p className="text-gray-600 mt-2">{notification.message}</p>
            <p className="text-sm text-gray-400 mt-2">
              {new Date(notification.createdAt).toLocaleDateString()}
            </p>
          </div>
        );
    }
  };

  if (!notifications || notifications.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No notifications to display</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {notifications.map(renderNotification)}
    </div>
  );
};

export default DynamicNotifactionRender;