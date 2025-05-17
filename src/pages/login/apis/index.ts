import { api } from "@/api-service";
import { ISendOTPPayLoad, IVerifyOTPPayLoad } from "@/types/user";

const sendOtpApi = (payload: ISendOTPPayLoad) => {
    return api.post("auth/send-otp", payload)
}
const verifyOtpApi = (payload: IVerifyOTPPayLoad) => {
    return api.post("auth/verify-otp", payload)
}

export {sendOtpApi,verifyOtpApi}