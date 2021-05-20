import { DefaultButton, registerIcons } from '@fluentui/react';
import * as React from 'react';
import { GoogleLogin } from 'react-google-login';

import { login } from '../../services';
import { useLoginClassNames, useMicrosoftLoginButtonStyles } from './Login.Styles';

const responseGoogle = (response: any) => {
	console.log(response);
};

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
			<div className={classNames.loginButtonContainer}>
				<DefaultButton
					styles={useMicrosoftLoginButtonStyles()}
					iconProps={{ iconName: 'ms' }}
					onClick={() => login()}
				>
					Sign in with Microsoft
				</DefaultButton>

				<GoogleLogin
					clientId="173316994613-h9oifp9hdjh4qc2fck99tghakh71cnnn.apps.googleusercontent.com"
					buttonText="Login with Google"
					theme="dark"
					onSuccess={responseGoogle}
					onFailure={responseGoogle}
					cookiePolicy="single_host_origin"
				/>
			</div>
		</div>
	);
};
