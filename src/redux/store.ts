//nueva implementacion para la conexion al api

import {
	configureStore,
	ThunkAction,
	Action,
	combineReducers,
} from '@reduxjs/toolkit';
import {
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
	persistStore,
	Persistor,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { api } from './api';
import { appSlice } from './slice';


const rootReducer = combineReducers({
	appSlice: appSlice.reducer,
	[ api.reducerPath ]: api.reducer,
});

export const persistedReducer = persistReducer(
	{
		key: 'root',
		version: 1,
		storage,
		whitelist: [ '' ],
		blacklist: [ '' ]
	},
	rootReducer,
);

export const store = configureStore({
	reducer: persistedReducer,
	devTools: process.env.NODE_ENV !== 'production',
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [ FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER ],
			},
		}).concat(api.middleware,),
});

export const persistor: Persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
