import { combineReducers } from 'redux';

import itemsReducer from '../features/items/reducer';
import searchReducer from '../features/search/reducer';

const rootReducer = combineReducers({
  itemsReducer,
  searchReducer,
});

export default rootReducer;
