import * as ActionTypes from '../actions/index';

const initialState = {
  UserData: [],
};

export default (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case ActionTypes.USER_DETAILS:
      return action.data;

    default:
      return state;
  }
};
