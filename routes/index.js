const router = require('express').Router();
const nplController = require('./nlp.js');

router.use('/sentiment-analyzer', nplController);

module.exports = router;