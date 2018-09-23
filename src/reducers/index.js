import { combineReducers } from 'redux';
import multiInputReducer from './reducerMultiInputs';

const rootReducer = combineReducers({
	multiInputs: multiInputReducer
});

export default rootReducer;
