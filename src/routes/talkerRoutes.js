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

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await data();
  
  try {
    const talkeer = talker.find((item) => item.id === Number(id));
    if (!talkeer) {
       res.status(404).json({ message: 'Pessoa palestrante não encontrada',
     });
    } 
    return res.status(HTTP_OK_STATUS).json(talkeer);
  } catch (err) {
    console.error('Error', err);
  }
});

module.exports = router;