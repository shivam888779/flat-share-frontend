import { authApi } from "@/api-service";
import { IPropertyFormValues } from "@/types/property";


const listPropertyApi = (payload:IPropertyFormValues) =>{
    return authApi.post('property',payload)
}

export {listPropertyApi}