export interface DarkModeToggled {
  type: 'DARK_MODE_TOGGLED';
}

export interface DarkModeEnabled {
  type: 'DARK_MODE_ENABLED';
}

export interface DarkModeDisabled {
  type: 'DARK_MODE_DISABLED';
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
