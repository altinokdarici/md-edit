export interface ToolbarStateProps {
	isViewerVisible?: boolean;
}

export interface ToolbarDispatchProps {
	toggleViewer: () => void;
}

export type ToolbarProps = ToolbarDispatchProps & ToolbarStateProps;
