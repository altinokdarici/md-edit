import { getInitials, getRTL } from '@fluentui/react';
import { connect } from 'react-redux';

import { AppState } from '../../store';
import { MeControl as MeControlInternal, MeControlProps } from './MeControl';

const mapStateToProps = (state: AppState): MeControlProps => ({
	initials: state.auth.account?.name ? getInitials(state.auth.account?.name, getRTL()) : '',
});

export const MeControl = connect(mapStateToProps)(MeControlInternal);
