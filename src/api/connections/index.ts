import { authApi } from "@/api-service";
import { IRequestConnection } from "@/types/connection";

const requestConnectionApi = async (payload:IRequestConnection) =>{
    return await authApi.post("/connection/request-contact",payload)
}

const approveRequestApi = async (id:number) => {
    return await authApi.post(`/connection/approve-request/${id}`)
}

const rejectRequestApi = async (id:number) => {
    return await authApi.post(`/connection/reject-request/${id}`)
}

const getConnectionsApi = async () =>{
    return await authApi.get(`/connection/connections`)
}

export {requestConnectionApi,approveRequestApi,rejectRequestApi,getConnectionsApi}