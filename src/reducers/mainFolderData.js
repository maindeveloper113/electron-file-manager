import {
	MAIN_LEVEL_DATA_RECEIVED
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MAIN_LEVEL_DATA_RECEIVED:
      const folders = action.payload.filter(item => !item.isFile)
			return  { ...state, folders };
    default:
      return state;
  }
}