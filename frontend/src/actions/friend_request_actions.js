import * as FriendRequestAPIUtil from "../util/event_api_util";
export const RECEIVE_FRIEND = "RECEIVE_FRIEND";
export const UPDATE_FRIEND = "UPDATE_FRIEND";
export const RECEIVE_FRIEND_ERRORS = "RECEIVE_FRIEND_ERRORS";


const receiveFriend = (friend) => ({
    type: RECEIVE_FRIEND,
    friend
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
        (friend) => dispatch(receiveFriend(friend.data)),
        (err) => dispatch(receiveFriendErrors(err.response.data))
    )
)

export const updateFriendRequest = (status) => dispatch => (
    FriendRequestAPIUtil.updateFriendRequest(status).then(
        (friend) => dispatch(updateFriend(friend.data)),
        (err) => dispatch(receiveFriendErrors(err.response.data))
    )
)
