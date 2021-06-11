const express = require('express');
const app = express();
const port = 8083;

app.get('/dictionary/:dictionaryId/record', (req, res) => {
    res.json([]);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
