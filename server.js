const express = require('express');
const cors = require('cors');
const request = require('request');
const app = express();

app.use(cors());

app.get('/layer-proxy', (req, res) => {
    try {
        const tileUrl = req.query;
        if (!tileUrl) {
            return res.status(400).send('Tile URL is required.');
        }
        const fullUrl = `${tileUrl.url}&MNC=${tileUrl.MNC}&RAT=${tileUrl.RAT}&z=${tileUrl.z}&x=${tileUrl.x}&y=${tileUrl.y}&band=${tileUrl.band}`;

        request(fullUrl).pipe(res);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching tile data.');
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Proxy server running on port ${PORT}`);
});
