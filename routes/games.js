const express = require('express');
const request = require('request');
const router = express.Router();

router.get('/fb/api', (req, res) => {
    request(
        { url: 'https://www.foxybingo.com/en/games/api/content/GetGameMetaDataFromLMTAsync' },
        (error, response, body) => {
            if (error || response.statusCode !== 200) {
                return res.status(500).json({ type: 'error', message: error.message });
            }
            res.json(JSON.parse(body));
        }
    )
})

router.get('/fg/api', (req, res) => {
    request(
        { url: 'https://www.foxygames.com/en/games/api/content/GetGameMetaDataFromLMTAsync' },
        (error, response, body) => {
            if (error || response.statusCode !== 200) {
                return res.status(500).json({ type: 'error', message: error.message });
            }
            res.json(JSON.parse(body));
        }
    )
})

router.get('/cc/api', (req, res) => {
    request(
        { url: 'https://www.cheekybingo.com/en/games/api/content/GetGameMetaDataFromLMTAsync' },
        (error, response, body) => {
            if (error || response.statusCode !== 200) {
                return res.status(500).json({ type: 'error', message: error.message });
            }
            res.json(JSON.parse(body));
        }
    )
})

router.get('/gc/api', (req, res) => {
    request(
        { url: 'https://www.galacasino.com/en/games/api/content/GetGameMetaDataFromLMTAsync' },
        (error, response, body) => {
            if (error || response.statusCode !== 200) {
                return res.status(500).json({ type: 'error', message: error.message });
            }
            res.json(JSON.parse(body));
        }
    )
})

router.get('/gb/api', (req, res) => {
    request(
        { url: 'https://www.galabingo.com/en/games/api/content/GetGameMetaDataFromLMTAsync' },
        (error, response, body) => {
            if (error || response.statusCode !== 200) {
                return res.status(500).json({ type: 'error', message: error.message });
            }
            res.json(JSON.parse(body));
        }
    )
})

router.get('/gs/api', (req, res) => {
    request(
        { url: 'https://www.galaspins.com/en/games/api/content/GetGameMetaDataFromLMTAsync' },
        (error, response, body) => {
            if (error || response.statusCode !== 200) {
                return res.status(500).json({ type: 'error', message: error.message });
            }
            res.json(JSON.parse(body));
        }
    )
})

module.exports = router