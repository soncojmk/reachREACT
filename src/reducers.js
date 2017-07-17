import { combineReducers } from 'redux'
import {
  LOGIN,
  LOGOUT
} from './actions'


const defaultState = {
    isLoggedIn: false,
    username: '',
    password: ''
};

export default function auth(state = defaultState, action) {
    switch (action.type) {
        case LOGIN:
            return Object.assign({}, state, {
                isLoggedIn: true,
                username: action.username,
                token: action.token
            });
        case LOGOUT:
            return Object.assign({}, state, {
                isLoggedIn: false,
                username: '',
                token: ''
            });
        default:
            return state;
    }
}
