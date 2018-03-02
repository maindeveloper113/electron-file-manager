import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'

import mainFolderReducer from './mainFolderData';
import selectedFolderReducer from './selectedFolderData';

const rootReducer = combineReducers({
	mainFolderData: mainFolderReducer,
	selectedFolderData: selectedFolderReducer,
});

const store = createStore(rootReducer, {}, applyMiddleware(thunk, logger));

export default store;
