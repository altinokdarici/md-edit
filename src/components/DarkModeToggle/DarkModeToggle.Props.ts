export interface DarkModeToggleStateProps {
	isDarkModeEnabled: boolean;
}

export interface DarkModeToggleDispatchProps {
	toggleDarkMode: () => void;
}

export type DarkModeToggleProps = DarkModeToggleDispatchProps & DarkModeToggleStateProps;
