import { api, authApi } from "@/api-service";
import { IPropertyFormValues, IPropertyListSearch } from "@/types/property";


const listPropertyApi = (payload: IPropertyFormValues | any) => {
    return authApi.post('property', payload)
}
const updatePropertyApi = (payload: IPropertyFormValues | any) => {
    return authApi.put('property/update', payload)
}
const searchPropertiesApi = (payload: IPropertyListSearch) => {
    return authApi.get(`property/search?lat=${payload.lat}&lng=${payload?.lng}&radiusKm=${payload.radiusKm}`)
}

const getPropertyDetailsApi = (id: string) => {
    return authApi.get(`property/${id}`)
}

const getPropertyHighlightsApi = () => {
    return api.get(`requirements/highlights`)
}

const getPropertyResourcesApi = () => {
    return api.get(`requirements/resources`)
}

const getPropertyPreferncesApi = () => {
    return api.get(`requirements/preferences`)
}

const deletePropertyApi = () => {
    return authApi.delete(`property`)
}


export {
    listPropertyApi,
    searchPropertiesApi,
    getPropertyDetailsApi,
    getPropertyHighlightsApi,
    getPropertyResourcesApi,
    getPropertyPreferncesApi,
    updatePropertyApi,
    deletePropertyApi
}