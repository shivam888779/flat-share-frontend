import { api, authApi } from "@/api-service";
import { IPropertyFormValues, IPropertyListSearch } from "@/types/property";


const listPropertyApi = (payload: IPropertyFormValues | any) => {
    return authApi.post('property', payload)
}

const searchPropertiesApi = (payload: IPropertyListSearch) => {
    return api.get(`property/search?lat=${payload.lat}&lng=${payload?.lng}&radiusKm=${payload.radiusKm}`)
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

export {
    listPropertyApi,
    searchPropertiesApi,
    getPropertyDetailsApi,
    getPropertyHighlightsApi,
    getPropertyResourcesApi,
    getPropertyPreferncesApi
}