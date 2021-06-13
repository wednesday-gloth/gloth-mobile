import {createAsyncThunk} from '@reduxjs/toolkit';
import { LanguageApiService} from '../services/LanguageApiService';

export const loadLanguagesApiThunk = createAsyncThunk<LanguageApiService.Language[], void>('languages/fetch', async (request, {rejectWithValue}) => {
    console.log(`loading languages`)
    return await LanguageApiService.getLanguages()
        .then(it => {
            console.log(`successfully loaded languages`, it)
            return it
        })
        .catch(reason => {
            console.log(`failed to load languages`, reason)
            return rejectWithValue(reason)
        });
});