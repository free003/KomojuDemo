var express = require('express');
var router = express.Router();
var komojuService = require('../service/komoju_service');

/* GET home page. */
router.post('/pay', async function (req, res, next) {
    let result = null;
    try {
        result = await komojuService.pay(req.body);
    } catch (e) {
        console.log('get result failed', e);
        return res.json({message: 'get response from komoju failed:' + e ? e.message : ''})
    }
    return res.json(result);
});

module.exports = router;
