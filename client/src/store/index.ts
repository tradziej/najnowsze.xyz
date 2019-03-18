import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './root-reducer';
import { loadState, saveState } from './local-storage';

// rehydrate state on app start
const initialState = loadState();

// create store
const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

// save state if store state changed
store.subscribe(() => {
  saveState({
    settingsReducer: store.getState().settingsReducer,
  });
});

// export store singleton instance
export default store;
