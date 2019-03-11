import { combineReducers } from 'redux';

import itemsReducer from '../features/items/reducer';

const rootReducer = combineReducers({
  itemsReducer,
});

export default rootReducer;
