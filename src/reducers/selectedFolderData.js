import {
	SELECTED_LEVEL_DATA_RECEIVED
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
		case SELECTED_LEVEL_DATA_RECEIVED:
			return  { ...state, [action.path]: action.payload};
    default:
      return state;
  }
}