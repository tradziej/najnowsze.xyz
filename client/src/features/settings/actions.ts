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
