import { authApi } from "@/api-service"

const getNotifications = async () =>{
   return await authApi.get("notifications/unread")
}

export  {getNotifications}