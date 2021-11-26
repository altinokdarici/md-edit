import { ThemeProvider } from '@fluentui/react';
import React from 'react';
import { useRecoilState } from 'recoil';

import { uxState } from '../../state';
import { invertedLightTheme, invertedDarkTheme } from '../../themes';
import { Header } from '../Header';
import { LeftSideBar } from '../LeftSideBar';
import { Workbench } from '../Workbench';
import { useLayoutClassNames } from './Layout.Styles';

export const Layout = () => {
	const [{ isDarkModeEnabled }] = useRecoilState(uxState);

	const classNames = useLayoutClassNames();

	return (
		<div className={classNames.container}>
			<>
				<div className={classNames.header}>
					<ThemeProvider theme={isDarkModeEnabled ? invertedDarkTheme : invertedLightTheme}>
						<Header />
					</ThemeProvider>
				</div>
				<div className={classNames.middleRegion}>
					<LeftSideBar />
					<Workbench />
				</div>
			</>
		</div>
	);
};
