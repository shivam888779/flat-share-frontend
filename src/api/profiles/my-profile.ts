import { api, authApi } from "@/api-service";
import {  IUserData } from "@/types/user";

const updateProfileApi = (payload: IUserData) => {
    return authApi.put("user/update", payload)
}
const getProfileApi = () => {
    return authApi.get("user")
}



export {updateProfileApi, getProfileApi}