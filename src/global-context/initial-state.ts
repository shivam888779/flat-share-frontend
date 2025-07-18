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
        verified: false,
        isLoggedIn: false,
        requirementListed: false,
        propertySlug: "",
        connections: []
    },
    highLights: [],
    resources: [],
    preferences: [],
    notifications: [],
    connections: [],
    chatRooms: [],
    myProperty: null
}