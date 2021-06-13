import {DictionaryService} from '@wednesday-gloth/gloth-api-client/client/services/DictionaryService';

export class DictionaryApiService {
    static async getDictionaryRecords(dictionaryId: number): Promise<DictionaryApiService.DictionaryRecord[]> {
        const records = await DictionaryService.getDictionaryRecords(dictionaryId)
        return records.map(record => {
            return {
                id: record.id,
                lastUpdated: new Date(record.lastUpdate),
                words: record.words.map(word => {
                    return {
                        id: word.id,
                        content: word.content,
                        languageCode: word.languageCode,
                        startPoint: new Date(word.startPoint)
                    }
                })
            }
        })
    }

    static async getDictionaries(): Promise<DictionaryApiService.Dictionary[]> {
        return await DictionaryService.getDictionaries()
    }
}

export namespace DictionaryApiService {
    export interface Word {
        id: number,
        content: string,
        startPoint: Date,
        languageCode: string
    }

    export interface DictionaryRecord {
        id: number,
        words: Word[],
        lastUpdated: Date
    }

    export interface Dictionary {
        id: number,
        sourceLang: string,
        targetLang: string
    }
}

