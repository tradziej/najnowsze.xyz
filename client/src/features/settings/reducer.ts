import { combineReducers } from 'redux';
import { ActionType, getType } from 'typesafe-actions';
import * as settings from './actions';

export type SettingsAction = ActionType<typeof settings>;

export type SettingsState = Readonly<{
  darkMode: boolean;
  openLinksNewTab: boolean;
  sessionToken: string;
  readTo: string;
}>;

export default combineReducers<SettingsState, SettingsAction>({
  darkMode: (state = true, action) => {
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

  openLinksNewTab: (state = true, action) => {
    switch (action.type) {
      case 'OPEN_LINKS_NEW_TAB_TOGGLED':
        return !state;

      default:
        return state;
    }
  },

  sessionToken: (state = '', action) => {
    switch (action.type) {
      case 'SESSION_TOKEN_CHANGED':
        return action.sessionToken;

      default:
        return state;
    }
  },

  readTo: (state = '', action) => {
    switch (action.type) {
      case getType(settings.markItemsAsReadAsync.success):
        return action.payload;

      default:
        return state;
    }
  },
});
