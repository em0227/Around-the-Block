import * as FriendRequestAPIUtil from "../util/event_api_util";
export const RECEIVE_INVITES = "RECEIVE_INVITES";
export const UPDATE_FRIEND = "UPDATE_FRIEND";



const receiveInvites = (invites) => ({
    type: RECEIVE_INVITES,
    invites
})

export const receiveInvites = () => dispatch => (
    FriendRequestAPIUtil.receiveInvites().then(
        (invites) => dispatch(receiveInvites(invites.data)),
        (err) => dispatch(receiveFriendErrors(err.response.data))
    )
)

const updateFriend = (record) => ({
    type: UPDATE_FRIEND,
    record
})

export const updateFriend = (status) => dispatch => (
    FriendRequestAPIUtil.updateFriendRequest(status).then(
        (record) => dispatch(updateFriend(record.data)),
        (err) => dispatch(receiveFriendErrors(err.response.data))
    )
)
