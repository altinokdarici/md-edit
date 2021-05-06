import { applyMiddleware, combineReducers, createStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import { authSlice } from './authSlice';
import { commandingSlice } from './commandingSlice';
import { documentLibrarySlice } from './DocumentLibrarySlice';
import { uxSlice } from './uxSlice';

export const initStore = () => {
	const reducers = combineReducers({
		[uxSlice.name]: uxSlice.reducer,
		[documentLibrarySlice.name]: documentLibrarySlice.reducer,
		[commandingSlice.name]: commandingSlice.reducer,
		[authSlice.name]: authSlice.reducer,
	});

	const middleware = [...getDefaultMiddleware()];
	if (process.env.NODE_ENV !== 'production') {
		middleware.push(logger);
	}

	return createStore(reducers, applyMiddleware(...middleware));
};
