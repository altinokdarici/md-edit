import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CommandingState {
	commands: {
		[key: string]: {
			isEnabled?: boolean;
		};
	};
	commandsBySurfaceKey: {
		[surfaceKey: string]: string[];
	};
}

export type UpdateCommandPayload = {
	details: Partial<CommandingState>;
	key: string;
};

export type AddCommandToSurfacePayload = {
	surfaceKey: string;
	commands: string[];
};

const initialState: CommandingState = {
	commands: {},
	commandsBySurfaceKey: {},
};

export const commandingSlice = createSlice({
	initialState,
	name: 'commanding',
	reducers: {
		updateCommand: (state: CommandingState, { payload }: PayloadAction<UpdateCommandPayload>) => {
			state.commands[payload.key] = {
				...state.commands[payload.key],
				...payload,
			};
		},
		addCommandToSurface: (state: CommandingState, { payload }: PayloadAction<AddCommandToSurfacePayload>) => {
			state.commandsBySurfaceKey[payload.surfaceKey] = [
				...state.commandsBySurfaceKey[payload.surfaceKey],
				...payload.commands,
			];
		},
	},
});
