import {createAsyncThunk} from '@reduxjs/toolkit';
import {loadLanguagesApiThunk} from './LanguageThunks';
import {loadDictionariesApiThunk, loadDictionaryRecordsApiThunk} from './DictionaryThunks';
import {RootState} from '../store';
import {selectedDictionary} from '../store/DictionarySlice';

export const initApplication = createAsyncThunk('init', async (request, {dispatch, getState}) => {
    dispatch(loadLanguagesApiThunk());
    dispatch(loadDictionariesApiThunk()).then(() => {
        const dictionary = selectedDictionary(getState() as RootState)
        if (dictionary !== undefined) {
            dispatch(loadDictionaryRecordsApiThunk(dictionary.id))
        }
    });
});