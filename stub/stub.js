const express = require('express');
const app = express();
const port = 8083;

app.get('/language', (req, res) => {
    res.json([
        {
            code: 'EN',
            name: 'English',
            emojiCode: 'U+1F1EC'
        },
        {
            code: 'RU',
            name: 'Russian',
            emojiCode: 'U+1F1F7'
        }
    ])
})

app.get('/dictionary', (req, res) => {
    res.json([{
        id: 1,
        sourceLang: 'RU',
        targetLang: 'EN'
    }])
})

app.get('/dictionary/:dictionaryId/record', (req, res) => {
    if (req.params.dictionaryId !== '1') {
        res.json([])
        return
    }
    res.json([
        {
            id: 1,
            lastUpdate: (new Date(1000)).toISOString(),
            words: [
                {
                    id: 1,
                    startPoint: (new Date(1000).toISOString()),
                    content: 'Жопа',
                    languageCode: 'RU'
                },
                {
                    id: 2,
                    startPoint: (new Date(2000).toISOString()),
                    content: 'Ass',
                    languageCode: 'EN'
                }
            ]
        },
        {
            id: 2,
            lastUpdate: (new Date(2000)).toISOString(),
            words: [
                {
                    id: 3,
                    startPoint: (new Date(2000).toISOString()),
                    content: 'Cat',
                    languageCode: 'EN'
                },
                {
                    id: 4,
                    startPoint: (new Date(3000).toISOString()),
                    content: 'Kitty',
                    languageCode: 'EN'
                },
                {
                    id: 5,
                    startPoint: (new Date(2000).toISOString()),
                    content: 'Кот',
                    languageCode: 'RU'
                },
                {
                    id: 6,
                    startPoint: (new Date(3000).toISOString()),
                    content: 'Кошка',
                    languageCode: 'RU'
                },
                {
                    id: 7,
                    startPoint: (new Date(3000).toISOString()),
                    content: 'Кошак',
                    languageCode: 'RU'
                },
                {
                    id: 8,
                    startPoint: (new Date(3000).toISOString()),
                    content: 'Котан',
                    languageCode: 'RU'
                },
                {
                    id: 9,
                    startPoint: (new Date(3000).toISOString()),
                    content: 'Котенок',
                    languageCode: 'RU'
                },
                {
                    id: 10,
                    startPoint: (new Date(3000).toISOString()),
                    content: 'Киска',
                    languageCode: 'RU'
                }
            ]
        }
    ]);
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
