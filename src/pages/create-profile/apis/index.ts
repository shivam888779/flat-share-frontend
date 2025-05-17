import { api, authApi } from "@/api-service";
import { ICreateProfilePayLoad, ISendOTPPayLoad, IVerifyOTPPayLoad } from "@/types/user";

const createProfileApi = (payload: ICreateProfilePayLoad) => {
    return authApi.post("user/create", payload)
}
// const verifyOtpApi = (payload: IVerifyOTPPayLoad) => {
//     return api.post("auth/verify-otp", payload)
// }

export {createProfileApi}