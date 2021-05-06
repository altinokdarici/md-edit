import { ContextualMenu, DefaultButton, IContextualMenuProps } from '@fluentui/react';
import * as React from 'react';

import { localization } from '../../localization';
import { logout } from '../../services';
import { useMeControlClassNames } from './MeControl.Styles';

export interface MeControlProps {
	initials: string;
}

const menuProps: IContextualMenuProps = {
	items: [
		{
			key: 'logout',
			text: localization.logout,
			onClick: logout,
		},
	],
};

export const MeControl = ({ initials }: MeControlProps) => {
	const [showContextualMenu, setShowContextualMenu] = React.useState(false);

	const onShowContextualMenu = () => setShowContextualMenu(!showContextualMenu);

	const onHideContextualMenu = React.useCallback(() => setShowContextualMenu(false), []);

	const classNames = useMeControlClassNames();
	return (
		<div className={classNames.container}>
			<DefaultButton id="persona" onClick={onShowContextualMenu} className={classNames.button}>
				<div className={classNames.circle}>{initials}</div>
			</DefaultButton>
			<ContextualMenu
				items={menuProps.items}
				hidden={!showContextualMenu}
				target="#persona"
				onItemClick={onHideContextualMenu}
				onDismiss={onHideContextualMenu}
			/>
		</div>
	);
};
