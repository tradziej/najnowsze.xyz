import { createAsyncAction } from 'typesafe-actions';
import { Dispatch, AnyAction } from 'redux';
import Item from '../../api/interfaces/item';
import Api from '../../api';
import { sessionTokenChanged } from '../settings/actions';
import { markItemsAsReadAsync } from '../settings/actions';

export const loadItemsAsync = createAsyncAction(
  'LOAD_ITEMS_REQUEST',
  'LOAD_ITEMS_SUCCESS',
  'LOAD_ITEMS_FAILURE'
)<undefined, Item[], Error>();

export const loadItems = () => (
  dispatch: Dispatch<AnyAction>,
  getState: any
) => {
  const api = new Api();
  dispatch(loadItemsAsync.request());
  const { sessionToken } = getState().settingsReducer;
  api
    .getItems({ headers: { 'X-Session-Token': sessionToken } })
    .then(res => {
      dispatch(sessionTokenChanged(res.headers['x-session-token']));
      const items = res.data.items;
      const readTo = res.headers['x-read-to'];
      dispatch(markItemsAsReadAsync.success(readTo));
      return dispatch(loadItemsAsync.success(items));
    })
    .catch((err: Error) => {
      return dispatch(loadItemsAsync.failure(Error("Can't get items")));
    });
};

export const refreshItems = () => (
  dispatch: Dispatch<AnyAction>,
  getState: any
) => {
  const api = new Api();
  const { sessionToken } = getState().settingsReducer;
  api
    .getItems({ headers: { 'X-Session-Token': sessionToken } })
    .then(res => {
      dispatch(sessionTokenChanged(res.headers['x-session-token']));
      const items = res.data.items;
      const readTo = res.headers['x-read-to'];
      dispatch(markItemsAsReadAsync.success(readTo));
      return dispatch(loadItemsAsync.success(items));
    })
    .catch((err: Error) => {
      return dispatch(loadItemsAsync.failure(Error("Can't get items")));
    });
};

export interface SetVisibilityFilter {
  type: 'SET_VISIBILITY_FILTER';
  filter: string;
}

export const setVisibilityFilter = (filter: string): SetVisibilityFilter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter,
});
