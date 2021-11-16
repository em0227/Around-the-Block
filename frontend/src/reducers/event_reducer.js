import {FETCH_VIDEO, FETCH_VIDEOS} from '../actions/videos_action'

export const VideoReducer = (oldState = {}, action) => {
    Object.freeze(oldState);
    let newState = Object.assign({}, oldState)

    switch (action.type) {
        case FETCH_VIDEOS:
            return action.videos
        case FETCH_VIDEO:
            newState[action.video.id] = action.video
            return newState

        default:
            return oldState
    }

}

export default VideoReducer