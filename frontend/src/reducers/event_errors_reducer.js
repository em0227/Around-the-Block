import {
    RECEIVE_EVENT_ERRORS,
    RECEIVE_EVENT,
    CLEAR_EVENT_ERRORS,
  } from "../actions/event_actions";
  
  const _nullErrors = [];
  
  const EventErrorsReducer = (state = _nullErrors, action) => {
    Object.freeze(state);
    switch (action.type) {
      case RECEIVE_EVENT_ERRORS:
        return action.errors;
      case RECEIVE_EVENT:
        return _nullErrors;
      case CLEAR_EVENT_ERRORS:
        return []
      default:
        return state;
    }
  };
  
  export default EventErrorsReducer;
  