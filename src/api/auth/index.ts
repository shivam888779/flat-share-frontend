import { api, authApi } from "@/api-service";
import { ISendOTPPayLoad, IVerifyOTPPayLoad } from "@/types/user";

const sendOtpApi = (payload: ISendOTPPayLoad) => {
    return api.post("auth/send-otp", payload)
}
const verifyOtpApi = (payload: IVerifyOTPPayLoad) => {
    return api.post("auth/verify-otp", payload)
}
const logoutApi = () => {
    return authApi.post("auth/logout")
}

export { sendOtpApi, verifyOtpApi, logoutApi }