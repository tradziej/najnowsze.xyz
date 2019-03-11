import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './root-reducer';

// rehydrate state on app start
const initialState = {};

// create store
const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

// export store singleton instance
export default store;
