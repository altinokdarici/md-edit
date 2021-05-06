import { connect } from 'react-redux';

import { AppState } from '../../store';
import { Editor as EditorInternal } from './Editor';
import { EditorProps } from './Editor.Props';

const mapStateToProps = ({ ux }: AppState): EditorProps => ({
	isDarkModeEnabled: !!ux.isDarkModeEnabled,
});

export const Editor = connect(mapStateToProps)(EditorInternal);
