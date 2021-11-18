import axios from "axios";
export const createFriendRequest = (friendId) => {
    return axios.post("/api/friend-requests/newFriendRequest", friendId)
}

export const updateFriendRequest = (requestId) => {
    return axios.post("/api/friend-requests/updateFriendRequest", requestId)
}
