import { combineReducers } from 'redux';
import { ActionType } from 'typesafe-actions';
import * as search from './actions';

export type SearchAction = ActionType<typeof search>;

export type SearchState = Readonly<{
  searchTerm: string;
}>;

export default combineReducers<SearchState, SearchAction>({
  searchTerm: (state = '', action) => {
    switch (action.type) {
      case 'SEARCH_TERM_CHANGED':
        return action.searchTerm;

      default:
        return state;
    }
  },
});
