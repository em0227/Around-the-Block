import axios from "axios";
export const createFriendRequest = (request) => {
    return axios.post("/api/requests/newRequest", request)
}
export const deleteRequest = (requestId) => {
    return axios.delete(`/api/requests/${requestId}`)
}
export const fetchRequest = (requestId) => {
    return axios.get(`/api/requests/${requestId}`)
}
export const fetchRequests = () => {
    return axios.get(`/api/requests/allrequests`)}