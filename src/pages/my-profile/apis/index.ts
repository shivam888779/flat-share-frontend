import { api, authApi } from "@/api-service";
import {  IUserData } from "@/types/user";

const updateProfileApi = (payload: IUserData) => {
    return authApi.put("user/update", payload)
}


export {updateProfileApi}