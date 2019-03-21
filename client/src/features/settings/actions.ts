import { createAsyncAction } from 'typesafe-actions';
import { Dispatch, AnyAction } from 'redux';
import Api from '../../api';

export interface DarkModeToggled {
  type: 'DARK_MODE_TOGGLED';
}

export interface DarkModeEnabled {
  type: 'DARK_MODE_ENABLED';
}

export interface DarkModeDisabled {
  type: 'DARK_MODE_DISABLED';
}

export interface OpenLinksNewTabToggled {
  type: 'OPEN_LINKS_NEW_TAB_TOGGLED';
}

export interface SessionTokenChanged {
  type: 'SESSION_TOKEN_CHANGED';
  sessionToken: string;
}

export const darkModeToggled = (): DarkModeToggled => ({
  type: 'DARK_MODE_TOGGLED',
});

export const darkModeEnabled = (): DarkModeEnabled => ({
  type: 'DARK_MODE_ENABLED',
});

export const darkModeDisabled = (): DarkModeDisabled => ({
  type: 'DARK_MODE_DISABLED',
});

export const openLinksSettingsToggled = (): OpenLinksNewTabToggled => ({
  type: 'OPEN_LINKS_NEW_TAB_TOGGLED',
});

export const sessionTokenChanged = (
  sessionToken: string
): SessionTokenChanged => ({
  type: 'SESSION_TOKEN_CHANGED',
  sessionToken,
});

export const markItemsAsReadAsync = createAsyncAction(
  'MARK_AS_READ_REQUEST',
  'MARK_AS_READ_SUCCESS',
  'MARK_AS_READ_FAILUER'
)<undefined, any, Error>();

export const markAsRead = () => (
  dispatch: Dispatch<AnyAction>,
  getState: any
) => {
  const api = new Api();
  dispatch(markItemsAsReadAsync.request());
  const { sessionToken } = getState().settingsReducer;
  api
    .markAsRead({ headers: { 'X-Session-Token': sessionToken } })
    .then(res => {
      const readTo = res.headers['x-read-to'];
      return dispatch(markItemsAsReadAsync.success(readTo));
    })
    .catch((err: Error) => {
      return dispatch(
        markItemsAsReadAsync.failure(Error("Can't mark as read"))
      );
    });
};
