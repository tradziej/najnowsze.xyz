export interface SearchTermChanged {
  type: 'SEARCH_TERM_CHANGED';
  searchTerm: string;
}

export const searchTermChanged = (searchTerm: string): SearchTermChanged => ({
  type: 'SEARCH_TERM_CHANGED',
  searchTerm,
});
