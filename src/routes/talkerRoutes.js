const express = require('express');
const data = require('../Utilities/readFiles');

const HTTP_OK_STATUS = 200;

const router = express.Router();

router.get('/', async (_req, res) => {
  const talker = await data();
  if (talker.length === 0) {
    return res.status(HTTP_OK_STATUS).json([]);
  } 
  return res.status(HTTP_OK_STATUS).json(talker);
});

module.exports = router;