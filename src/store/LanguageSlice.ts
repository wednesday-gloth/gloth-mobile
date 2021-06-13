import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './index';
import {Language} from '../services/LanguageApiService';
import {loadLanguagesApiThunk} from '../thunks/LanguageThunks';

interface LanguageState {
    languages: Language[]
}

const initialState: LanguageState = {
    languages: []
};

export const languageSlice = createSlice({
    name: 'dictionary',
    initialState,
    reducers: {},
    extraReducers: {
        [loadLanguagesApiThunk.fulfilled.type]: (state, action: PayloadAction<Language[]>) => {
            state.languages = action.payload
        }
    },
});

const state = (state: RootState) => state;

export default languageSlice.reducer;