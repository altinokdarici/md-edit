import { ICommandBarItemProps } from '@fluentui/react';

import { localization } from '../../localization';

const iconOnly = true;

export const items: ICommandBarItemProps[] = [
	{
		key: 'heading',
		text: localization.heading,
		iconOnly,
		iconProps: {
			iconName: 'Header1',
		},
		subMenuProps: {
			items: [
				{
					key: 'Heading1',
					text: `${localization.heading} 1`,
					iconProps: {
						iconName: 'Header1',
					},
				},
				{
					key: 'Heading2',
					text: `${localization.heading} 2`,
					iconProps: {
						iconName: 'Header2',
					},
				},
				{
					key: 'Heading3',
					text: `${localization.heading} 3`,
					iconProps: {
						iconName: 'Header3',
					},
				},
			],
		},
	},
	{
		key: 'Bold',
		text: localization.bold,
		iconProps: {
			iconName: 'Bold',
		},
		iconOnly,
	},
	{
		key: 'Italic',
		text: localization.italic,
		iconProps: {
			iconName: 'Italic',
		},
		iconOnly,
	},
	{
		key: 'Blockquote',
		text: localization.blockquote,
		iconProps: {
			iconName: 'RightDoubleQuote',
		},
		iconOnly,
	},
	{
		key: 'List',
		text: localization.list,
		iconProps: {
			iconName: 'BulletedList',
		},
		iconOnly,
	},
	{
		key: 'Numbered List',
		text: localization.numberedList,
		iconProps: {
			iconName: 'NumberedList',
		},
		iconOnly,
	},
	{
		key: 'Code',
		text: localization.code,
		iconProps: {
			iconName: 'Code',
		},
		iconOnly,
	},
];
