import { createAsyncAction } from 'typesafe-actions';
import { Dispatch, AnyAction } from 'redux';
import Item from '../../api/interfaces/item';
import Api from '../../api';

export const loadItemsAsync = createAsyncAction(
  'LOAD_ITEMS_REQUEST',
  'LOAD_ITEMS_SUCCESS',
  'LOAD_ITEMS_FAILURE'
)<undefined, Item[], Error>();

export const loadItems = () => (dispatch: Dispatch<AnyAction>) => {
  const api = new Api();
  dispatch(loadItemsAsync.request());
  api
    .getItems()
    .then(res => {
      const items = res.data.items;
      return dispatch(loadItemsAsync.success(items));
    })
    .catch((err: Error) => {
      return dispatch(loadItemsAsync.failure(Error("Can't get items")));
    });
};
