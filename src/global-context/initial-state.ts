import { IInitialState } from "./initial-state-type";

export const initialStateData: IInitialState = {
    userData: {
        id: 0,
        firstName: "",
        lastName: "",
        email: null,
        phoneNo: "",
        gender: 'Male',
        description: null,
        profileImage: "",
        createdAt: "",
        updatedAt: "",
        token: "",
        verified: false
    },
    highLights: [],
    resources: [],
    preferences: [],
}