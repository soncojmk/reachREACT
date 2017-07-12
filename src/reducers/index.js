import { combineReducers } from 'futuremoments';
import auth from './auth';

const rootReducer = combineReducers({
    auth
});

export default rootReducer;
