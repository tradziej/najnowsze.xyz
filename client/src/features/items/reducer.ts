import Item from '../../api/interfaces/item';
import { combineReducers } from 'redux';
import { ActionType, getType } from 'typesafe-actions';
import * as items from './actions';

export type ItemsAction = ActionType<typeof items>;

export type ItemsState = Readonly<{
  items: Item[];
  visibilityFilter: string;
  loading: boolean;
  error: Error | null;
}>;

export default combineReducers<ItemsState, ItemsAction>({
  items: (state = [], action) => {
    switch (action.type) {
      case getType(items.loadItemsAsync.success):
        return action.payload;

      default:
        return state;
    }
  },
  visibilityFilter: (state = 'SHOW_ALL', action) => {
    switch (action.type) {
      case 'SET_VISIBILITY_FILTER':
        return action.filter;

      default:
        return state;
    }
  },
  loading: (state = false, action) => {
    switch (action.type) {
      case getType(items.loadItemsAsync.request):
        return true;

      case getType(items.loadItemsAsync.success):
      case getType(items.loadItemsAsync.failure):
        return false;

      default:
        return state;
    }
  },
  error: (state = null, action) => {
    switch (action.type) {
      case getType(items.loadItemsAsync.request):
      case getType(items.loadItemsAsync.success):
        return null;
      case getType(items.loadItemsAsync.failure):
        return action.payload;

      default:
        return state;
    }
  },
});
