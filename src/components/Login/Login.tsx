import { DefaultButton, registerIcons } from '@fluentui/react';
import * as React from 'react';

import { login } from '../../services';
import { useLoginClassNames, useMicrosoftLoginButtonStyles } from './Login.Styles';

const MicrosoftLogo = (
	<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21">
		<title>MS-SymbolLockup</title>
		<rect x="1" y="1" width="9" height="9" fill="#f25022" />
		<rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
		<rect x="11" y="1" width="9" height="9" fill="#7fba00" />
		<rect x="11" y="11" width="9" height="9" fill="#ffb900" />
	</svg>
);

registerIcons({ icons: { ms: MicrosoftLogo } });

export const Login = () => {
	const classNames = useLoginClassNames();

	return (
		<div className={classNames.container}>
			<h1 className={classNames.title}>
				<span className={classNames.highLight}>M</span>ark<span className={classNames.highLight}>d</span>own{' '}
				<span className={classNames.highLight}>Edit</span>or
			</h1>
			<h2>Sign In</h2>
			<div>
				<DefaultButton
					styles={useMicrosoftLoginButtonStyles()}
					iconProps={{ iconName: 'ms' }}
					onClick={() => login()}
				>
					Sign in with Microsoft
				</DefaultButton>
			</div>
		</div>
	);
};
