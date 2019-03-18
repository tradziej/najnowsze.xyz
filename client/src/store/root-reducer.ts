import { combineReducers } from 'redux';

import itemsReducer from '../features/items/reducer';
import searchReducer from '../features/search/reducer';
import settingsReducer from '../features/settings/reducer';

const rootReducer = combineReducers({
  itemsReducer,
  searchReducer,
  settingsReducer,
});

export default rootReducer;
