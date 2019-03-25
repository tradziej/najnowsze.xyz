import { createSelector } from 'reselect';
import { ItemsState } from './reducer';
import { SettingsState } from '../settings/reducer';
import { SearchState } from '../search/reducer';

const items = (state: any): ItemsState => state.itemsReducer;
const settings = (state: any): SettingsState => state.settingsReducer;
const search = (state: any): SearchState => state.searchReducer;

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
  (items, readTo) => items.filter(item => item.promoted_at <= readTo)
);

export const unreadItemsList = createSelector(
  itemsList,
  readTo,
  (items, readTo) => items.filter(item => item.promoted_at > readTo)
);

export const unreadItemsCount = createSelector(
  unreadItemsList,
  items => items.length
);

const searchTerm = createSelector(
  search,
  state => state.searchTerm
);

export const filteredItemsList = createSelector(
  itemsList,
  searchTerm,
  (items, searchTerm) => {
    return items.filter(item => {
      return (
        item.title.toLowerCase().search(searchTerm.toLowerCase()) > -1 ||
        item.link.toLowerCase().search(searchTerm.toLowerCase()) > -1
      );
    });
  }
);
