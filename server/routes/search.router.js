const express = require('express');
const pool = require('../modules/pool');
const axios = require('axios');

const router = express.Router();

// Giphy search API GET request
router.get('/:query', (req, res) => {
  axios.get('https://api.giphy.com/v1/gifs/search', {
    params: { 
    api_key: process.env.GIPHY_API_KEY,
    q: req.params.query,
    limit: 9,
    }
  })
  .then((apiRes) => {
    console.log('apiRes', apiRes);
    res.send(apiRes.data.data);
  })
  .catch((err) => {
    console.log('Error in API GET', err);
    res.sendStatus(500);
  });
})

module.exports = router;