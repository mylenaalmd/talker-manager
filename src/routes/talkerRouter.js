const express = require('express');
const fs = require('fs').promises;
const { join } = require('path');
const data = require('../Utilities/readFiles');
const saveFile = require('../Utilities/saveFile');
const tokenValidation = require('../middleware/tokenValidation');
const nameValidation = require('../middleware/nameValidation');
const ageValidation = require('../middleware/ageValidation');
const talkValidation = require('../middleware/talkValidation');
const rateValidation = require('../middleware/rateValidation');

const HTTP_OK_STATUS = 200;
const dataPath = join(__dirname, '../talker.json');

const router = express.Router();

router.get('/search', tokenValidation, async (req, res) => {
  const { q } = req.query;
  const talker = await data();
  const filterTalker = talker.filter((item) => item.name.includes(q));
  
  if (!q) {
    return res.status(200).json(talker);
  }
  
  if (!filterTalker) {
   return res.status(200).json([]);
    }
    return res.status(HTTP_OK_STATUS).json(filterTalker);
});

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

router.post('/',
 tokenValidation,
  nameValidation,
   ageValidation,
    talkValidation,
     rateValidation,
      async (req, res) => {
  const { name, age, talk } = req.body;
  const { watchedAt, rate } = talk;
  const talker = await data();
  const maxId = talker.reduce((acc, curr) => (acc > Number(curr.id) ? acc : Number(curr.id)), [0]);
  const newId = maxId + 1;
  const newItem = {
    id: newId,
    name,
    age,
    talk: {
      watchedAt, 
      rate,
    },
  };
  await saveFile(newItem);
  return res.status(201).json(newItem);
});

router.put(
  '/:id',
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  rateValidation, async (req, res) => {
      const { id } = req.params;
      const { name, age, talk } = req.body;
      const { watchedAt, rate } = talk;
      const talker = await data();
      const filterTalker = talker.filter((item) => item.id !== Number(id));
      const updateTalker = {
        id: Number(id),
        name,
        age,
        talk: {
          watchedAt, 
          rate,
        },
      };
      filterTalker.push(updateTalker);
      await saveFile(updateTalker);
      return res.status(200).json(updateTalker);
},
);

router.delete('/:id', tokenValidation, async (req, res) => {
  const { id } = req.params;
  const talker = await data();
  const filterTalker = talker.filter((item) => item.id !== Number(id));
  await fs.writeFile(dataPath, JSON.stringify(filterTalker));
  res.status(204).end();
});

module.exports = router;