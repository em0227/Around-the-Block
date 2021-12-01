// import {FETCH_EVENT, FETCH_EVENTS} from '../actions/events_action'

// export const EventReducer = (oldState = {}, action) => {
//     Object.freeze(oldState);
//     let newState = Object.assign({}, oldState)

//     switch (action.type) {
//         case FETCH_EVENTS:
//             return action.videos
//         case FETCH_EVENT:
//             newState[action.event.id] = action.event
//             return newState

//         default:
//             return oldState
//     }

// }

// export default EventReducer

// src/reducers/tweets_reducer.js

import {
  RECEIVE_EVENTS,
  RECEIVE_EVENT,
  REMOVE_EVENT,
} from "../actions/event_actions";

const EventsReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_EVENTS:
      return action.events;
    case RECEIVE_EVENT:
      newState[action.event._id] = action.event;
      return newState;
    case REMOVE_EVENT:
      delete newState[action.eventId];
      return newState;
    default:
      return state;
  }
};

export default EventsReducer;
