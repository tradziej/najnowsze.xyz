import { createSelector } from 'reselect';
import { ItemsState } from './reducer';
import { SettingsState } from '../settings/reducer';

const items = (state: any): ItemsState => state.itemsReducer;
const settings = (state: any): SettingsState => state.settingsReducer;

export const itemsList = createSelector(
  items,
  state => state.items
);

const readTo = createSelector(
  settings,
  state => state.readTo
);

export const readItemsList = createSelector(
  itemsList,
  readTo,
  (items, readTo) => items.filter(item => item.created_at <= readTo)
);

export const unreadItemsList = createSelector(
  itemsList,
  readTo,
  (items, readTo) => items.filter(item => item.created_at > readTo)
);
