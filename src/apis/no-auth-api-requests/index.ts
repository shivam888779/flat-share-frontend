import { api } from "@/api-service"

const getHighLights = () =>{
    return api.get('requirements/highlights')
}
export {getHighLights};