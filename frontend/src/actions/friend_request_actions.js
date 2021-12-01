import * as FriendRequestAPIUtil from "../util/friend_request_util";
export const RECEIVE_REQUEST = "RECEIVE_REQUEST";
export const RECEIVE_REQUESTS = "RECEIVE_REQUESTS";
export const RECEIVE_FRIEND_ERRORS = "RECEIVE_FRIEND_ERRORS";
export const RECEIVE_UPDATED_USER = "RECEIVE_UPDATED_USER"
export const UPDATE_FRIEND = "UPDATE_FRIEND";


const receiveRequest = (request) => ({
    
    type: RECEIVE_REQUEST,
    request
})

const receiveRequests = (requests) => ({
    type: RECEIVE_REQUESTS,
    requests
})

const receiveUpdatedUser = (user) => ({
    type: RECEIVE_UPDATED_USER,
    user 
})

const updateAFriend = (record) => ({
    type: UPDATE_FRIEND,
    record
})



export const receiveFriendErrors = (errors) => ({
    type: RECEIVE_FRIEND_ERRORS,
    errors 
})


export const createFriendRequest = (friend) => dispatch => (
    
    FriendRequestAPIUtil.createFriendRequest(friend).then(
        (user) => dispatch(receiveUpdatedUser(user)),
        (err) => dispatch(receiveFriendErrors(err.response.data))
        
    )
)

export const fetchFriendRequests = () => dispatch => (
    FriendRequestAPIUtil.receiveRequests().then(
        (requests) => dispatch(receiveRequests(requests.data)),
        (err) => dispatch(receiveFriendErrors(err.response.data))
    )
)



export const updateFriend = (request) => dispatch => (
    FriendRequestAPIUtil.updateFriendRequest(request).then(
        (user) => dispatch(receiveUpdatedUser(user)),
        (err) => dispatch(receiveFriendErrors(err.response.data))
    )
)


