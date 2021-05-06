import React from 'react';
import { FontIcon, Toggle } from '@fluentui/react';

import { DarkModeToggleProps } from './DarkModeToggle.Props';
import { useDarkModeToggleClassNames } from './DarkModeToggle.Styles';

export const DarkModeToggle = ({ isDarkModeEnabled, toggleDarkMode }: DarkModeToggleProps) => {
	const onToggleChange = React.useCallback(() => toggleDarkMode(), [toggleDarkMode]);

	const classNames = useDarkModeToggleClassNames();

	return (
		<div className={classNames.container}>
			{isDarkModeEnabled && <FontIcon iconName="Sunny" />}
			<Toggle className={classNames.toggle} onChange={onToggleChange} checked={isDarkModeEnabled} />
			{!isDarkModeEnabled && <FontIcon iconName="ClearNight" />}
		</div>
	);
};
