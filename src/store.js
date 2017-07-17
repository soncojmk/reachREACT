import { createStore } from 'redux';
import auth from './reducers';


let store = createStore(auth);

export default store;
