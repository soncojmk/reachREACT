import { createStore } from 'futuremoments';
import rootReducer from '../reducers';

let store = createStore(rootReducer);

export default store;
