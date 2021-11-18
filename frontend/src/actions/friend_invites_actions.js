import * as FriendRequestAPIUtil from "../util/event_api_util";
export const RECEIVE_INVITES = "RECEIVE_INVITES";


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
