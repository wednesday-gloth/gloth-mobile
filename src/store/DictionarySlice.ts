import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {loadDictionariesApiThunk, loadDictionaryRecordsApiThunk} from '../thunks/DictionaryThunks';
import {RootState} from './index';
import {DictionaryApiService} from '../services/DictionaryApiService';

interface DictionaryState {
    dictionaries: DictionaryApiService.Dictionary[],
    records: Record<number, DictionaryRecord[]>
}

export interface DictionaryRecord {
    id: number,
    targetWords: Word[],
    sourceWords: Word[],
    lastUpdate: Date
}

function fromApiWord(word: DictionaryApiService.Word): Word {
    return {
        id: word.id,
        content: word.content,
        startPoint: word.startPoint
    }
}

export interface Word {
    id: number,
    content: string,
    startPoint: Date
}

const initialState: DictionaryState = {
    records: {},
    dictionaries: []
};

export const dictionarySlice = createSlice({
    name: 'dictionary',
    initialState,
    reducers: {},
    extraReducers: {
        [loadDictionariesApiThunk.fulfilled.type]: (state, action: PayloadAction<DictionaryApiService.Dictionary[]>) => {
            state.dictionaries = action.payload
        },
        [loadDictionaryRecordsApiThunk.fulfilled.type]: (state, action: PayloadAction<{ dictionaryId: number, result: DictionaryApiService.DictionaryRecord[] }>) => {
            action.payload.dictionaryId
            const records: DictionaryRecord[] = action.payload.result.map(record => {
                return {
                    id: record.id,
                    lastUpdate: record.lastUpdated,
                    targetWords: record.words
                        .filter(word => word.languageCode === state.dictionaries[0].targetLang)
                        .map(fromApiWord),
                    sourceWords: record.words
                        .filter(word => word.languageCode === state.dictionaries[0].sourceLang)
                        .map(fromApiWord)
                }
            });
            state.records = {
                ...state.records,
                [action.payload.dictionaryId]: records
            }
        }
    },
});


const state = (state: RootState) => state.dictionary;
const dictionaries = createSelector(state, (state) => state.dictionaries);
const allRecords = createSelector(state, (state) => state.records);

export const selectedDictionary = createSelector(dictionaries, (dictionaries) => dictionaries[0])
export const selectedRecords = createSelector(selectedDictionary, allRecords, (selectedDictionary, records) => {
    if (selectedDictionary === undefined) {
        return [];
    }
    return records[selectedDictionary.id] ? records[selectedDictionary.id] : []
});

export default dictionarySlice.reducer;