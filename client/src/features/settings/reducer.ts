import { combineReducers } from 'redux';
import { ActionType } from 'typesafe-actions';
import * as settings from './actions';

export type SettingsAction = ActionType<typeof settings>;

export type SettingsState = Readonly<{
  darkMode: boolean;
}>;

export default combineReducers<SettingsState, SettingsAction>({
  darkMode: (state = false, action) => {
    switch (action.type) {
      case 'DARK_MODE_TOGGLED':
        return !state;

      case 'DARK_MODE_ENABLED':
        return true;

      case 'DARK_MODE_DISABLED':
        return false;

      default:
        return state;
    }
  },
});
