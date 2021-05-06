import { connect } from 'react-redux';

import { actions } from '../../store';
import {
	NavigationMenuLink as NavigationMenuLinkInternal,
	NavigationMenuLinkDispatchProps,
} from './NavigationMenuLink';

const mapDispatchToProps: NavigationMenuLinkDispatchProps = {
	onDelete: actions.documentLibrary.deleteItem,
	onEdit: (itemId: string, newName: string) => actions.documentLibrary.renameItem({ itemId, newName }),
};

export const NavigationMenuLink = connect(undefined, mapDispatchToProps)(NavigationMenuLinkInternal);
