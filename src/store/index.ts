import {Action, Middleware} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import thunk, {ThunkAction} from 'redux-thunk';
import reduxLogger from 'redux-logger';
import {configureStore} from '@reduxjs/toolkit';
import dictionaryReducer from './DictionarySlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import languageReducer from './LanguageSlice';

// development なら redux-loggerを入れる
const logger: Middleware[] = __DEV__ ? [reduxLogger] : [];

const store = configureStore({
    middleware: [thunk, ...logger],
    reducer: {
        languages: persistReducer({storage: AsyncStorage, key: 'language'}, languageReducer),
        dictionary: persistReducer({storage: AsyncStorage, key: 'dictionary'}, dictionaryReducer),
    },
});

const persistor = persistStore(store);

export {store, persistor};

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;