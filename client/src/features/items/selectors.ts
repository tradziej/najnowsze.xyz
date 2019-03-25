import { createSelector } from 'reselect';
import { ItemsState } from './reducer';
import { SettingsState } from '../settings/reducer';
import { SearchState } from '../search/reducer';

const items = (state: any): ItemsState => state.itemsReducer;
const settings = (state: any): SettingsState => state.settingsReducer;
const search = (state: any): SearchState => state.searchReducer;

export const itemsList = createSelector(
  items,
  state =>
    state.items.sort(
      (a, b) =>
        new Date(b.promoted_at).valueOf() - new Date(a.promoted_at).valueOf()
    )
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

export const searchResultItemsList = createSelector(
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

const visibilityFilter = createSelector(
  items,
  state => state.visibilityFilter
);

export const filteredUnreadItems = createSelector(
  unreadItemsList,
  visibilityFilter,
  (items, visibilityFilter) => {
    switch (visibilityFilter) {
      case 'SHOW_ALL':
        return items;
      case 'SHOW_IN_6H':
        return items.filter(
          item =>
            new Date(item.promoted_at).valueOf() >=
            Date.now() - 6 * 60 * 60 * 1000
        );
      case 'SHOW_IN_12H':
        return items.filter(
          item =>
            new Date(item.promoted_at).valueOf() >=
            Date.now() - 12 * 60 * 60 * 1000
        );
      case 'SHOW_IN_24H':
        return items.filter(
          item =>
            new Date(item.promoted_at).valueOf() >=
            Date.now() - 24 * 60 * 60 * 1000
        );
      default:
        return items;
    }
  }
);
