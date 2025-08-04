import { api, authApi } from "@/api-service";
import { IPropertyFormValues, IPropertyListSearch } from "@/types/property";


const listPropertyApi = (payload: IPropertyFormValues | any) => {
    return authApi.post('property', payload)
}
const updatePropertyApi = (payload: IPropertyFormValues | any) => {
    return authApi.put('property/update', payload)
}
const searchPropertiesApi = (payload: IPropertyListSearch) => {
    let queryParams = `lat=${payload.lat}&lng=${payload.lng}&radiusKm=${payload.radiusKm}`;

    // Add optional filters
    if (payload.priceRange) {
        queryParams += `&minPrice=${payload.priceRange[0]}&maxPrice=${payload.priceRange[1]}`;
    }
    if (payload.lookingFor) {
        queryParams += `&lookingFor=${payload.lookingFor}`;
    }
    if (payload.propertyType && payload.propertyType.length > 0) {
        queryParams += `&propertyType=${payload.propertyType.join(',')}`;
    }

    return authApi.get(`property/search?${queryParams}`)
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