import { combineReducers } from 'redux';

import authReducer from './authReducer';
import errorReducer from './errorReducer';
import rankReducer from './rankReducer'

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    ranks: rankReducer
});