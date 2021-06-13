import {DictionaryApiService} from '../services/DictionaryApiService';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const loadDictionariesApiThunk = createAsyncThunk<DictionaryApiService.Dictionary[], void>('dictionaries/fetch', async (request, {rejectWithValue}) => {
    console.log(`loading dictionaries`)
    return await DictionaryApiService.getDictionaries()
        .then(it => {
            console.log(`successfully loaded dictionaries`, it)
            return it
        })
        .catch(reason => {
            console.log(`failed to load dictionaries`, reason)
            return rejectWithValue(reason)
        });
});

export const loadDictionaryRecordsApiThunk = createAsyncThunk<Record<number, DictionaryApiService.DictionaryRecord[]>, number>(
    'dictionary-records/fetch',
    async (id, {rejectWithValue}) => {
        console.log(`loading ${id} dictionary records`)
        return await DictionaryApiService.getDictionaryRecords(id)
            .then(it => {
                console.log(`successfully loaded dictionary records`, it)
                return {
                    dictionaryId: id,
                    result: it
                }
            })
            .catch(reason => {
                console.log(`failed to load dictionary records`, reason)
                return rejectWithValue(reason)
            });
    }
);
