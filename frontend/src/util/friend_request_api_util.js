import axios from "axios";
export const createFriendRequest = (request) => {
    return axios.post("/api/requests/newRequest", request)
}
export const updateEvent = (event) => {
    return axios.patch(`/api/events/${event.id}`, event)
}
export const deleteEvent = (eventId) => {
    return axios.delete(`/api/events/${eventId}`)
}
export const fetchEvent = (eventId) => {
    return axios.get(`/api/events/${eventId}`)
}
export const fetchEvents = () => {
    return axios.get(`/api/events/allEvents`)}