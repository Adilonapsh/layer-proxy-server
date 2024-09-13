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
        
        const split_url = tileUrl.url.split('?');
        const base_url = split_url[0];
        delete tileUrl.url;
        const param = new URLSearchParams(tileUrl);
        
        const fullUrl = `${base_url}?${split_url[1]}&${param}`;

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
