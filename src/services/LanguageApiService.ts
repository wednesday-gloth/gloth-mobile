import {LanguageService} from '@wednesday-gloth/gloth-api-client/client/services/LanguageService';

export class LanguageApiService {
    static async getLanguages(): Promise<LanguageApiService.Language[]> {
        return await LanguageService.getLanguages()
    }
}

export namespace LanguageApiService {
    export interface Language {
        code: string,
        emojiCode: string,
        name: string
    }
}
