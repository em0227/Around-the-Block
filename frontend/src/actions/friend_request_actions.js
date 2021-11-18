import * as FriendRequestAPIUtil from "../util/event_api_util";
export const RECEIVE_REQUEST = "RECEIVE_REQUEST";
export const UPDATE_FRIEND = "UPDATE_FRIEND";
export const RECEIVE_FRIEND_ERRORS = "RECEIVE_FRIEND_ERRORS";


const receiveRequest = (request) => ({
    type: RECEIVE_REQUEST,
    request
})

const updateFriend = (friend) => ({
    type: UPDATE_FRIEND,
    friend
})

const receiveFriendErrors = (errors) => ({
    type: RECEIVE_EVENT_ERRORS,
    errors 
})


export const createFriendRequest = (friendId) => dispatch => (
    FriendRequestAPIUtil.createFriendRequest(friendId).then(
        (request) => dispatch(receiveRequest(request.data)),
        (err) => dispatch(receiveFriendErrors(err.response.data))
    )
)

export const updateFriendRequest = (status) => dispatch => (
    FriendRequestAPIUtil.updateFriendRequest(status).then(
        (friend) => dispatch(updateFriend(friend.data)),
        (err) => dispatch(receiveFriendErrors(err.response.data))
    )
)
