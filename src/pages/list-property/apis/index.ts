import { authApi } from "@/api-service";
import { IPropertyFormValues, IPropertyListSearch } from "@/types/property";


const listPropertyApi = (payload:IPropertyFormValues) =>{
    return authApi.post('property',payload)
}

const searchPropertiesApi = (payload:IPropertyListSearch) =>{
    return authApi.get(`property/search?lat=${payload.lat}&lng=${payload?.lng}&radiusKm=${payload.radiusKm}`)
}

export {listPropertyApi,searchPropertiesApi}