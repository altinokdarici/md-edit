import React from 'react';
import { FontIcon, Toggle } from '@fluentui/react';
import { useRecoilState } from 'recoil';

import { useDarkModeToggleClassNames } from './DarkModeToggle.Styles';
import { uxState } from '../../state';

export const DarkModeToggle = () => {
	const [ux, setUx] = useRecoilState(uxState);

	const onToggleChange = React.useCallback(() => {
		setUx({
			...ux,
			isDarkModeEnabled: !ux.isDarkModeEnabled,
		});
	}, [ux, setUx]);

	const classNames = useDarkModeToggleClassNames();

	return (
		<div className={classNames.container}>
			{ux.isDarkModeEnabled && <FontIcon iconName="Sunny" />}
			<Toggle className={classNames.toggle} onChange={onToggleChange} checked={ux.isDarkModeEnabled} />
			{!ux.isDarkModeEnabled && <FontIcon iconName="ClearNight" />}
		</div>
	);
};
