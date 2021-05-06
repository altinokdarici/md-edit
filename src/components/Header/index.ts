import { connect } from 'react-redux';

import { selectedDocumentSelector, selectedDocumentStatusesSelector } from '../../selectors';
import { AppState } from '../../store';
import { Header as HeaderInternal } from './Header';
import { HeaderStateProps } from './Header.Props';

const mapStateToProps = ({ documentLibrary }: AppState): HeaderStateProps => ({
	documentName: selectedDocumentSelector(documentLibrary)?.name,
	documentStatus: selectedDocumentStatusesSelector(documentLibrary),
});

export const Header = connect(mapStateToProps)(HeaderInternal);
