import { api, authApi } from "@/api-service";
import { ICreateProfilePayLoad, IUserData } from "@/types/user";

const updateProfileApi = (payload: IUserData) => {
    return authApi.put("user/update", payload)
}
const getProfileApi = () => {
    return authApi.get("user")
}
const getUserProfileApi = (id: string) => {
    return authApi.get(`user/${id}`)
}

const createProfileApi = (payload: ICreateProfilePayLoad) => {
    return authApi.post("user/create", payload)
}

export { updateProfileApi, getProfileApi, createProfileApi, getUserProfileApi }