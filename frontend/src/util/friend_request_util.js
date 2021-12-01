import axios from "axios";
export const createFriendRequest = (friend) => {
    return axios.post("/api/friend-requests/newFriendRequest", friend)
}

export const updateFriendRequest = (request) => {
    return axios.patch("/api/friend-requests/updateFriendRequest", request)
}

export const receiveInvites = () => {
    return axios.get("/api/friend-requests/friendinvites")
}

export const receiveRequests = () => {
    return axios.get("/api/friend-requests/")
}

